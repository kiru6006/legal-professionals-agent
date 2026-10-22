# Frontend Architecture & UI/UX Specifications

## 1. UI Design Principles & Design System

The frontend is implemented with **React 18, TypeScript, Tailwind CSS, and shadcn/ui**. It prioritizes trust, professional credibility, and cognitive clarity. 

### Key Visual Tokens:
- **Typography**: Inter / Outfit for modern, crisp readability across both English and Tamil legal terminology.
- **Color Palette**:
  - `Brand Primary`: Deep Trust Navy (`#0A192F`, HSL: `217, 65%, 11%`)
  - `Accent / Intelligence`: Rich Cyan / Sapphire (`#0EA5E9`, `#2563EB`)
  - `Verification / Success`: Emerald Green (`#10B981`)
  - `Warning / Information Gap`: Warm Amber (`#F59E0B`)
  - `Background`: Clean Slate Light (`#F8FAFC`) with full Dark Mode (`#020817`).
- **AI Affordance Principle**: Every AI-generated output is visually distinct with a subtle glowing accent border, an **"AI-Assisted"** badge, and full explainability accordions.

---

## 2. Core Application Screens

### Screen 1: Welcome & Landing (`/welcome`)
- **Purpose**: Welcomes visitors, communicates network credibility, distinguishes the platform from generic directories.
- **Key Elements**:
  - Hero headline: *"AI-Powered Legal Professional Network for Advocates and Legal Counsel"*.
  - Call to Action: `[ Find a Professional ]` and `[ Claim Your Profile / Join ]`.
  - Live trust stats: *"Over 30,000 Verified Advocate Records across Tamil Nadu"*.
  - Provenance disclaimer: Clearly indicates Bar Council seed record status.

---

### Screen 2: AI Professional Search (`/search`)
- **Purpose**: Replaces clunky multi-select database forms with an intelligent natural language input while preserving structured filter drawers.
- **Key Elements**:
  - **Dynamic Natural Language Input**:
    ```text
    ┌────────────────────────────────────────────────────────┐
    │ 🔍 Describe what you are looking for...               │
    │ "I need a criminal appeal lawyer in Salem who can      │
    │  appear before the Principal Sessions Court."          │
    │                                     [ Find Advocates ] │
    └────────────────────────────────────────────────────────┘
    ```
  - **Structured Filter Drawers** (Collapsible):
    - District dropdown (Chennai, Coimbatore, Madurai, Salem, etc.)
    - Court selector (High Court, District Courts, Sessions Courts, Tribunals)
    - Practice Area multi-select (Criminal, Corporate, Tax, Civil, Constitutional)
    - Services required (Court Appearance, Local Counsel, Legal Research)
    - Minimum experience slider (0 to 35+ years).

---

### Screen 3: AI Search Results (`/search/results`)
- **Purpose**: Presents candidates ranked by relevance with **explicit grounding reasons**.
- **Card Layout**:
  ```text
  ┌────────────────────────────────────────────────────────────────────────┐
  │ [Avatar]  Adv. S. Ramanathan                  [ Verified Bar Member ✓ ]│
  │           Advocate • 14 Years Exp • Salem                              │
  │                                                                        │
  │ Primary Courts: Principal Sessions Court, Salem | Madras High Court    │
  │ Services: Court Appearance, Local Counsel, Legal Research              │
  │                                                                        │
  │ ✦ WHY RECOMMENDED BY AI:                                               │
  │   ✓ Criminal Law listed on verified profile                            │
  │   ✓ Regular appearance before Principal Sessions Court                 │
  │   ✓ Located within Salem district jurisdiction                         │
  │   ✓ Local appearance service actively offered                          │
  │                                                                        │
  │ [Confidence: HIGH]        [Information Gap: Availability Not Declared] │
  │                                                                        │
  │ [ View Full Profile ]      [ Connect ]               [ Request Service]│
  └────────────────────────────────────────────────────────────────────────┘
  ```

---

### Screen 4: Professional Profile (`/profiles/:id`)
- **Purpose**: The verified professional portfolio.
- **Sections**:
  1. **Header**: Name, official Bar Enrollment Number (`MS/XXXX/XXXX`), Bar Association badge, location, verified checkmark.
  2. **Practice & Courts**: Visual pill tags of practice areas and courts.
  3. **Services Offered**: Grid of services with description of assistance terms.
  4. **AI Profile Insights**: Summary of declared focus and practice strengths.
  5. **Bio & Experience**: Comprehensive history.
  6. **Privacy-Gated Contact**: Phone/email masked with `[ Connect to Exchange Contact ]` CTA.

---

### Screen 5: Claim Profile Modal / Workflow (`/claim/:directoryId`)
- **Purpose**: Deterministic onboarding workflow for existing seed directory advocates.
- **Workflow Steps**:
  1. **Locate Record**: User finds their name/enrollment number in directory.
  2. **Identity Affirmation**: User confirms: *"I am Adv. [Name], enrolled under Bar Council of Tamil Nadu"*.
  3. **Verification Document Upload**: Upload scanned copy of official Bar Council Identity Card or Certificate of Practice.
  4. **Review Status Tracker**: Real-time status badge (`VERIFICATION_PENDING` $\to$ `VERIFIED`).

---

### Screen 6: AI-Assisted Profile Completion (`/profile/edit/ai-assist`)
- **Purpose**: Drastically cuts profile setup time by allowing lawyers to paste raw bios or resumes.
- **Interaction**:
  - Left pane: Raw text input area for CV or bio.
  - Middle: Trigger button `[ Extract Profile Details via AI ]`.
  - Right pane: **Interactive Approval Card**:
    - Extracted Practice Areas (Checkboxes with option to add/remove)
    - Extracted Courts (Selectable list)
    - Extracted Services (Toggle switches)
  - Bottom CTA: `[ Confirm and Publish Profile ]`.

---

### Screen 7: Home / AI Workspace (`/dashboard`)
- **Purpose**: Primary authenticated dashboard.
- **Sections**:
  - Greeting: *"Good Afternoon, Adv. Kumar"*
  - **Global AI Action Bar**: *"What do you need help with today?"*
  - **Quick AI Triggers**:
    - `[ Find Local Counsel ]`
    - `[ Find Arbitrator ]`
    - `[ Refer a Matter ]`
    - `[ Ask Network Question ]`
  - **Feed Grid**:
    - Network updates & connection requests
    - Trending discussions from Tamil Nadu Bar members
    - Recommended colleagues practicing in matching jurisdictions.

---

### Screen 8: Network (`/network`)
- **Purpose**: Manage professional peers, following list, and discover AI-recommended connections.
- **AI Recommendation Engine**:
  - Suggests peers based on shared bar associations, common court appearances, or complementary practice areas.
  - Transparent reason displayed: *"Practices Civil Appeals in your frequent court (Madras HC)"*.

---

### Screen 9: Services Hub (`/services`)
- **Two Distinct Tabs**:
  - **Tab 1: I Can Help With**: Advocate toggles services they offer to colleagues (e.g. "Court Appearance in Salem Sessions Court").
  - **Tab 2: I Need Help With**: Advocate describes a requirement. AI structures it into a private dispatch to matching local verified counsel.

---

### Screen 10: Community Knowledge Hub (`/community`)
- **Purpose**: Professional peer discussion forum.
- **Features**:
  - Topic filters: Criminal, Civil, Corporate, Arbitration, IPR, Tax.
  - **AI Thread Summaries**: For long discussion threads (15+ replies), an AI summary block highlights consensus, statutory references, and practical trial tips.

---

### Screen 11: "Ask the Network" Omnibox (`/ask`)
- **Purpose**: The central agentic routing console.
- **Behavior**:
  - Takes natural language inputs and automatically classifies whether to:
    - Route to **Discovery Agent**
    - Create a **Service Request**
    - Post to **Community**
    - Route to **Referral Agent**.

---

## 3. Component Hierarchy (React)

```text
src/
├── components/
│   ├── ui/                    # shadcn/ui primitives (Button, Card, Dialog, Badge)
│   ├── ai/
│   │   ├── GroundedBadge.tsx  # Confidence & Evidence checkmark renderer
│   │   ├── AIWorkspaceBar.tsx # Dynamic omnibox prompt input
│   │   └── MissingInfoAlert.tsx
│   ├── profile/
│   │   ├── ProfileHeader.tsx
│   │   ├── VerificationBadge.tsx
│   │   └── PracticeAreaList.tsx
│   └── search/
│       ├── SearchFilterDrawer.tsx
│       └── CandidateResultCard.tsx
├── features/
│   ├── auth/
│   ├── directory/
│   ├── search/
│   └── services/
└── layouts/
    ├── AppLayout.tsx          # Authenticated topbar & sidebar
    └── PublicLayout.tsx       # Welcome & public directory layout
```
