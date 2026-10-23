"""
LLM Provider Abstraction Layer.

Provides a single interface for calling text generation across multiple backends:
- Google Gemini
- OpenAI
- Anthropic Claude
- Ollama (local)

Agents ALWAYS use this abstraction. Zero provider-specific logic in domain code.
"""

import json
from typing import Optional, AsyncIterator
from app.core.config import settings
import structlog

logger = structlog.get_logger()


class LLMResponse:
    def __init__(self, content: str, model: str, finish_reason: str = "stop"):
        self.content = content
        self.model = model
        self.finish_reason = finish_reason


class BaseLLMProvider:
    async def complete(self, prompt: str, system: Optional[str] = None, temperature: float = 0.1) -> LLMResponse:
        raise NotImplementedError

    async def complete_json(self, prompt: str, system: Optional[str] = None) -> dict:
        """Calls complete() and parses the JSON response."""
        response = await self.complete(prompt, system, temperature=0.0)
        content = response.content.strip()
        # Strip markdown code blocks if present
        if content.startswith("```json"):
            content = content[7:]
        if content.startswith("```"):
            content = content[3:]
        if content.endswith("```"):
            content = content[:-3]
        try:
            return json.loads(content.strip())
        except json.JSONDecodeError as e:
            logger.error("llm_json_parse_error", content=content[:200], error=str(e))
            raise ValueError(f"LLM returned invalid JSON: {e}")


class GeminiProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    async def complete(self, prompt: str, system: Optional[str] = None, temperature: float = 0.1) -> LLMResponse:
        import asyncio
        full_prompt = f"{system}\n\n{prompt}" if system else prompt
        response = await asyncio.to_thread(
            self.model.generate_content,
            full_prompt,
            generation_config={"temperature": temperature}
        )
        return LLMResponse(content=response.text, model="gemini-1.5-flash")


class OpenAIProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        from openai import AsyncOpenAI
        self.client = AsyncOpenAI(api_key=api_key)

    async def complete(self, prompt: str, system: Optional[str] = None, temperature: float = 0.1) -> LLMResponse:
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})

        response = await self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=temperature,
        )
        return LLMResponse(
            content=response.choices[0].message.content,
            model=response.model,
            finish_reason=response.choices[0].finish_reason,
        )


class AnthropicProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        import anthropic
        self.client = anthropic.AsyncAnthropic(api_key=api_key)

    async def complete(self, prompt: str, system: Optional[str] = None, temperature: float = 0.1) -> LLMResponse:
        kwargs = {"model": "claude-3-haiku-20240307", "max_tokens": 2048, "messages": [{"role": "user", "content": prompt}]}
        if system:
            kwargs["system"] = system
        response = await self.client.messages.create(**kwargs)
        return LLMResponse(content=response.content[0].text, model=response.model)


class OllamaProvider(BaseLLMProvider):
    def __init__(self, base_url: str):
        import httpx
        self.client = httpx.AsyncClient(base_url=base_url, timeout=60.0)

    async def complete(self, prompt: str, system: Optional[str] = None, temperature: float = 0.1) -> LLMResponse:
        payload = {"model": "llama3.2", "prompt": prompt, "stream": False, "options": {"temperature": temperature}}
        if system:
            payload["system"] = system
        response = await self.client.post("/api/generate", json=payload)
        response.raise_for_status()
        data = response.json()
        return LLMResponse(content=data["response"], model="llama3.2")


def get_llm_provider() -> BaseLLMProvider:
    """Factory: returns the configured LLM provider."""
    provider = settings.DEFAULT_LLM_PROVIDER.lower()

    if provider == "gemini" and settings.GEMINI_API_KEY:
        return GeminiProvider(settings.GEMINI_API_KEY)
    elif provider == "anthropic" and settings.ANTHROPIC_API_KEY:
        return AnthropicProvider(settings.ANTHROPIC_API_KEY)
    elif provider == "ollama":
        return OllamaProvider(settings.OLLAMA_BASE_URL)
    elif settings.OPENAI_API_KEY:
        return OpenAIProvider(settings.OPENAI_API_KEY)
    else:
        logger.warning("no_llm_provider_configured_using_mock")
        return _MockProvider()


class _MockProvider(BaseLLMProvider):
    """Fallback mock for development without API keys."""
    async def complete(self, prompt: str, system: Optional[str] = None, temperature: float = 0.1) -> LLMResponse:
        if "intent" in prompt.lower():
            return LLMResponse(
                content='{"intent": "PROFESSIONAL_DISCOVERY", "confidence": 0.85, "location": null, "practice_area": null, "court": null, "service_required": null, "languages": [], "min_experience_years": null}',
                model="mock",
            )
        return LLMResponse(
            content='{"result": "mock_response"}',
            model="mock",
        )
