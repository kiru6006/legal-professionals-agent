# API Contracts & Interface Specifications

## 1. API Architecture Overview

The backend exposes a **RESTful JSON API** coupled with a **WebSocket endpoint** for streaming AI agent outputs. All contracts are defined using **Pydantic v2** models, ensuring strict runtime validation and automatic OpenAPI 3.1 documentation generation.

- **Base URL**: `/api/v1`
- **Authentication**: `Authorization: Bearer <JWT_ACCESS_TOKEN>`
- **Error Standard**: RFC 7807 Problem Details for HTTP APIs

---

## 2. Authentication & Verification Endpoints

### 2.1 Login
- **Endpoint**: `POST /api/v1/auth/login`
- **Request**:
  ```json
  {
    "email": "advocate.kumar@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "token_type": "bearer",
    "expires_in": 900,
    "user": {
      "id": "usr_9481a172",
      "email": "advocate.kumar@example.com",
      "role": "ADVOCATE_VERIFIED",
      "is_verified": true,
      "profile_id": "prof_3812a"
    }
  }
  ```

---

### 2.2 Profile Claim Submission
- **Endpoint**: `POST /api/v1/directory/{directory_id}/claim`
- **Description**: Submits proof of identity to claim an existing seed Directory Record.
- **Request** (Multipart Form or JSON):
  ```json
  {
    "enrollment_number": "MS/1842/2015",
    "bar_council_id_url": "s3://proofs/usr_9481a172/bar_id.pdf",
    "declaration_accepted": true
  }
  ```
- **Response** (`202 Accepted`):
  ```json
  {
    "claim_id": "clm_83910f",
    "directory_id": "dir_003819",
    "status": "VERIFICATION_PENDING",
    "estimated_review_time": "24-48 hours",
    "submitted_at": "2026-10-22T20:50:00Z"
  }
  ```

---

## 3. AI Agent & Search Endpoints

### 3.1 AI Intent Orchestration Hub ("Ask the Network")
- **Endpoint**: `POST /api/v1/ai/ask`
- **Description**: Top-level entry point where natural language is classified, routed, and answered with grounded recommendations.
- **Request**:
  ```json
  {
    "prompt": "I need a criminal appeal lawyer in Salem who can appear before the Principal Sessions Court next week."
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "intent_detected": "PROFESSIONAL_DISCOVERY",
    "confidence": 0.96,
    "parsed_parameters": {
      "location": "Salem",
      "practice_area": "Criminal Law",
      "court": "Principal Sessions Court",
      "service_required": "Court Appearance",
      "urgency": "NEXT_WEEK"
    },
    "recommendations": [
      {
        "profile_id": "prof_1029",
        "full_name": "Adv. S. Ramanathan",
        "designation": "Advocate",
        "district": "Salem",
        "primary_court": "Principal Sessions Court, Salem",
        "years_experience": 14,
        "is_verified": true,
        "avatar_url": "https://assets.legalnet.in/avatars/1029.jpg",
        "match_reasons": [
          "Criminal Law listed on verified profile",
          "Regular appearance at Principal Sessions Court, Salem",
          "Court Appearance service enabled",
          "Located in Salem district"
        ],
        "confidence": "HIGH",
        "missing_information": [
          "Exact calendar availability for next week not published"
        ],
        "action_endpoints": {
          "view_profile": "/api/v1/profiles/prof_1029",
          "connect": "/api/v1/connections/request"
        }
      }
    ],
    "alternative_suggestions": [
      "View all 24 verified criminal advocates in Salem",
      "Post a private Service Request to the Salem Bar network"
    ]
  }
  ```

---

### 3.2 AI Profile Intelligence (Resume / Bio Extraction)
- **Endpoint**: `POST /api/v1/profiles/me/ai-extract`
- **Description**: Parses unstructured resume or text biography into structured draft profile fields.
- **Request**:
  ```json
  {
    "raw_text": "Practicing criminal and constitutional lawyer in Chennai with 12 years of experience. Regularly arguing matters before the Madras High Court and City Civil Court. Fluent in English and Tamil. Also acting as arbitrator in commercial disputes."
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "extracted_draft": {
      "years_of_experience": 12,
      "practice_areas": ["Criminal Law", "Constitutional Law", "Arbitration"],
      "courts": ["Madras High Court", "City Civil Court, Chennai"],
      "services_offered": ["Court Appearance", "Arbitration", "Legal Opinion"],
      "languages": ["English", "Tamil"]
    },
    "needs_user_confirmation": true,
    "unmatched_terms": []
  }
  ```

---

## 4. Professional Profile & Directory Endpoints

### 4.1 Get Profile by ID
- **Endpoint**: `GET /api/v1/profiles/{profile_id}`
- **Security**: Public can view basic info; verified users view practice details; only mutual connections view phone/email.
- **Response** (`200 OK`):
  ```json
  {
    "id": "prof_1029",
    "full_name": "Adv. S. Ramanathan",
    "designation": "Advocate",
    "enrollment_number": "MS/1102/2010",
    "is_verified": true,
    "bar_association": "Salem Bar Association",
    "district": "Salem",
    "headline": "Specialist in Criminal Appellate Law & Bail Matters",
    "bio": "Over 14 years of rigorous trial and appellate practice across Tamil Nadu...",
    "practice_areas": [
      {"id": "pa_crim", "name": "Criminal Law", "is_primary": true},
      {"id": "pa_civ", "name": "Civil Litigation", "is_primary": false}
    ],
    "courts": [
      {"id": "crt_salem_sess", "name": "Principal Sessions Court, Salem"},
      {"id": "crt_madras_hc", "name": "Madras High Court"}
    ],
    "services": [
      {"id": "svc_app", "title": "Court Appearance"},
      {"id": "svc_lc", "title": "Local Counsel"}
    ],
    "contact_info": {
      "phone": "+91 98****1234",
      "email": "s.ram****@law.in",
      "is_masked": true,
      "unmask_instructions": "Connect with Adv. Ramanathan to exchange verified contact details."
    },
    "ai_profile_insights": {
      "summary": "Specialist in criminal trials with frequent sessions court appearances and high responsiveness to local appearance requests."
    }
  }
  ```

---

## 5. Connections & Service Requests

### 5.1 Send Connection Request
- **Endpoint**: `POST /api/v1/connections/request`
- **Request**:
  ```json
  {
    "target_profile_id": "prof_1029",
    "note": "Looking to collaborate on Salem sessions court matters."
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "connection_id": "conn_49102",
    "status": "PENDING",
    "created_at": "2026-10-22T20:55:00Z"
  }
  ```

---

## 6. WebSocket Protocol for Streaming Agent Reasoning

- **URL**: `wss://api.legalnet.in/api/v1/ai/stream`
- **Handshake**: Bearer token via subprotocol or initial auth payload.
- **Client Frame**:
  ```json
  {
    "action": "QUERY",
    "query": "Find senior arbitration counsel in Chennai"
  }
  ```
- **Server Stream Frames**:
  ```json
  {"type": "STEP", "content": "Parsing intent: Looking for Arbitration specialists in Chennai..."}
  {"type": "STEP", "content": "Filtering for Senior Advocates with High Court experience..."}
  {"type": "RESULT", "data": { ... }}
  {"type": "DONE"}
  ```
