# AI-NATIVE LEGAL PROFESSIONAL NETWORK
## Complete UX Design System & Wireframes

---

## 1. PRODUCT UX THESIS

**Core Problem:** Lawyers solve problems through networks, but existing solutions force linear search (database → filter → list → profile). Expertise discovery is manual and inefficient.

**Thesis:** Integrated AI agents operate as an intelligent intermediary between a lawyer's natural-language requirement and a structured professional graph. The system feels like a knowledgeable colleague saying "here's who can help, here's why, here's how to reach them"—not a directory with a chatbot bolted on.

**Design Imperative:** AI must be contextually integrated (not centralized), explainable (not opaque), and always subordinate to human decision-making. The product is a **professional network layer augmented by AI agents**, not an AI product that happens to have lawyers.

---

## 2. INFORMATION ARCHITECTURE

```
PRIMARY NAVIGATION (Desktop Top)
├── DISCOVER
│   ├── AI Search (contextual discovery)
│   ├── Network (professional graph)
│   └── Services (request/offer interface)
├── COMMUNITY
│   ├── Discussions (practice areas)
│   ├── Ask Network (AI-mediated Q&A)
│   └── Resources (shared knowledge)
├── MESSAGES
│   ├── Active Conversations
│   ├── Service Requests
│   └── Referral Threads
├── ACTIVITY
│   ├── Notifications
│   └── AI Activity Log (transparency)
└── PROFILE
    ├── My Profile
    ├── My Services
    ├── My Network
    ├── Preferences
    └── Account

RATIONALE:
- Removed generic "Home" → replaced with action-oriented DISCOVER
- COMMUNITY separated (not a feed, distinct intent)
- MESSAGES elevated (critical for legal work)
- ACTIVITY for transparency (required for AI-native product)
- Flattened hierarchy (lawyers need speed, not nested menus)
```

---

## 3. PRIMARY USER JOURNEYS

### Journey A: First-Time Professional
```
Welcome → Signup → Find Existing Profile → Claim/Verify →
AI-Assisted Profile Setup → AI Home → Explore Network →
Connect with Peers
```

### Journey B: Search-Driven
```
AI Home → Describe Requirement → AI Interprets →
Search Results → Explainable Match → Connect/Request Service
```

### Journey C: Referral-Driven
```
AI Home → "I need to refer X" → AI Recommendation →
Confirm Match → Service Request
```

### Journey D: Community-Driven
```
Community → Find Discussion → Contribute → Discover Relevant Professionals →
Connect/Message
```

---

## 4. DESIGN SYSTEM

### Typography

| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Display | Inter/Segoe | 32px | 700 | Page titles, hero sections |
| Heading 1 | Inter/Segoe | 24px | 700 | Section headers |
| Heading 2 | Inter/Segoe | 20px | 600 | Subsection headers |
| Heading 3 | Inter/Segoe | 16px | 600 | Card titles, labels |
| Body | Inter/Segoe | 14px | 400 | Main text, descriptions |
| Body Small | Inter/Segoe | 13px | 400 | Metadata, secondary text |
| Label | Inter/Segoe | 12px | 500 | Tags, badges, UI labels |
| Caption | Inter/Segoe | 11px | 400 | Hints, timestamps |

**Principles:**
- Maximum 2 type sizes per section (avoid visual noise)
- High contrast on white/light backgrounds (minimum WCAG AA)
- Generous line-height for dense legal information (1.6x)

### Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| Primary Action | #0D47A1 | Buttons, links, primary CTAs |
| Secondary Action | #546E7A | Secondary buttons, neutral actions |
| Success | #2E7D32 | Verification, completion, positive states |
| Warning | #F57C00 | Pending actions, caution states |
| Error | #C62828 | Errors, risk states |
| AI Accent | #1565C0 | AI elements, insights, agent indicators |
| Background | #FAFAFA | Default surface |
| Surface | #FFFFFF | Cards, modals, elevated surfaces |
| Border | #E0E0E0 | Dividers, field borders |
| Text Primary | #212121 | Body text, high contrast |
| Text Secondary | #666666 | Secondary text, metadata |
| Text Disabled | #BDBDBD | Disabled states |
| Verification Badge | #2E7D32 | Trust indicator |

**Principles:**
- Minimal color palette (8 colors + neutrals)
- AI features use distinct but professional accent (#1565C0)
- No gradients, shadows used for elevation only
- High contrast text (not soft grays)

### Components

#### Button Variants
```
PRIMARY
┌─────────────────────┐
│   Find Professionals  │ (Background: #0D47A1, White text)
└─────────────────────┘

SECONDARY
┌─────────────────────┐
│   Cancel / Edit       │ (Border: #546E7A, #546E7A text)
└─────────────────────┘

TERTIARY
┌─────────────────────┐
│   Learn More         │ (No background, blue text)
└─────────────────────┘

DANGER
┌─────────────────────┐
│   Remove             │ (Background: #C62828, White text)
└─────────────────────┘

AI ACTION (contextual)
┌─────────────────────┐
│ ⚡ Ask AI             │ (Background: #1565C0, White text)
└─────────────────────┘
```

#### Professional Card
```
┌──────────────────────────────────┐
│ ADV. NAME                   ✓    │ ← Name + Verification
│ Senior Advocate                  │
│                                  │
│ Criminal Law • Arbitration       │ ← Practice areas
│ Salem, Tamil Nadu                │ ← Location
│                                  │
│ 15 years experience              │ ← Credential
│ High Court, Supreme Court        │ ← Courts
│                                  │
│ [ View Profile ]  [ Connect ]    │ ← Actions
└──────────────────────────────────┘
```

#### AI Insight Component
```
┌──────────────────────────────────┐
│ ⚡ AI MATCH REASONING             │
├──────────────────────────────────┤
│ ✓ Criminal Law (your search)     │
│ ✓ Salem (your location)          │ ← Explainable match
│ ✓ Sessions Court jurisdiction    │
│ ✗ Current availability unknown   │ ← Data gaps
│                                  │
│ Match Strength: Highly Relevant  │
└──────────────────────────────────┘
```

#### Verification Badge
```
Verified    (Green checkmark + green background)
Unverified  (Gray checkmark)
Pending     (Hourglass icon + orange)
```

---

## SCREEN 1: WELCOME

**Purpose:** First impression. Establish product identity and primary value proposition.

**Primary User:** Unregistered professional discovering the platform.

**Primary Action:** Sign Up or Sign In.

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                     ⚖ LEGAL NETWORK                           │
│                                                                │
│            Professional Network for Legal Professionals        │
│                                                                │
│                                                                │
│                                                                │
│        Find the right legal professional.                      │
│        Build your professional network.                        │
│        Exchange expertise. Refer with confidence.              │
│                                                                │
│                                                                │
│                                                                │
│                  [ JOIN THE NETWORK ]                          │
│                                                                │
│                      [ SIGN IN ]                               │
│                                                                │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  • 500+ verified legal professionals                           │
│  • Dedicated to Tamil Nadu and India                           │
│  • Professional verification built-in                          │
│  • AI-powered discovery                                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:** None. This is a static welcome screen.

**User Actions:**
- [JOIN THE NETWORK] → Screen 2 (Signup)
- [SIGN IN] → Login modal
- No email collection on this screen

**Important UX Notes:**
- Do NOT lead with "AI-powered" in main headline
- Keep positioning vague enough to not oversell
- No illustrations, no gradients, clean typography
- Trust signals (verified professionals) matter more than features at this stage

---

## SCREEN 2: SIGNUP

**Purpose:** Collect minimum viable professional identity.

**Primary User:** Lawyer registering for the first time.

**Primary Action:** Complete signup and proceed to profile discovery.

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                    CREATE YOUR ACCOUNT                         │
│                                                                │
│                                                                │
│  BASIC INFORMATION                                             │
│                                                                │
│  Full Name                                                    │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ [                                                    ]    │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  Email                                                        │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ [                                                    ]    │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  Mobile Number                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ +91 [                                                ]   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│                                                                │
│  PROFESSIONAL IDENTITY                                         │
│                                                                │
│  What is your professional role?                              │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ ☐ Advocate / Lawyer                                      │ │
│  │ ☐ Senior Advocate                                        │ │
│  │ ☐ Legal Consultant                                       │ │
│  │ ☐ In-house Counsel                                       │ │
│  │ ☐ Legal Researcher                                       │ │
│  │ ☐ Law Firm (Organization)                                │ │
│  │ ☐ Arbitrator / Mediator                                  │ │
│  │ ☐ Other                                                  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  Primary Location                                             │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ [Select State/District                              ▼]  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│                                                                │
│                   [ NEXT: FIND YOUR PROFILE ]                 │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:** None at this stage. Progressive form only.

**User Actions:**
- Fill form
- [NEXT: FIND YOUR PROFILE] → Screen 3

**Important UX Notes:**
- 5 fields maximum (name, email, mobile, role, location)
- No passwords collected yet (handled by email verification)
- Role selection is critical—do NOT ask for practice areas here
- Geographic selection is multi-level (State → District if needed)
- Mobile-friendly number input (international format)

---

## SCREEN 3: FIND EXISTING PROFESSIONAL PROFILE

**Purpose:** Connect user identity to existing directory records (enrollment database).

**Primary User:** Registered professional claiming identity.

**Primary Action:** Locate existing directory entry.

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│              FIND YOUR PROFESSIONAL RECORD                     │
│                                                                │
│  We've verified your name and location in official directories.│
│  Please confirm your record below.                             │
│                                                                │
│                                                                │
│  SEARCH OPTIONS                                                │
│                                                                │
│  ☑ By Name (Recommended)                                       │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Kirubakaran Srinivasan                                 │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│                                                                │
│  ☐ By Enrollment Number                                       │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ [                                                    ]   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│                                                                │
│  ☐ By Bar Association                                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ [Select Bar Association                            ▼]  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│                                                                │
│              [ SEARCH DIRECTORY ]                              │
│                                                                │
│                                                                │
│  ──────────────────────────────────────────────────────────   │
│                                                                │
│  MATCHING RECORDS FOUND                                        │
│                                                                │
│  1. KIRUBAKARAN SRINIVASAN                                     │
│     ├─ Bar Association: Tamil Nadu Bar Council                │
│     ├─ Enrollment: TN/2015/12345                               │
│     ├─ Location: Chennai                                       │
│     └─ Status: Directory Record                                │
│                                                                │
│  2. K. SRINIVASAN (JUNIOR)                                     │
│     ├─ Bar Association: Tamil Nadu Bar Council                │
│     ├─ Enrollment: TN/2022/54321                               │
│     ├─ Location: Salem                                         │
│     └─ Status: Directory Record                                │
│                                                                │
│                                                                │
│  Is the first record yours?                                    │
│                                                                │
│              [ YES, CLAIM THIS PROFILE ]                       │
│                    [ NO, TRY AGAIN ]                           │
│                                                                │
│  Can't find your record?                                       │
│              [ REQUEST MANUAL VERIFICATION ]                   │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:** 
- AI does fuzzy matching against enrollment databases
- Shows match confidence (not shown here, implicit in ordering)
- Suggests closest matches

**User Actions:**
- Search by name/enrollment/bar association
- Select matching record → Screen 4 (Claim Profile)
- Request manual verification if record not found

**Important UX Notes:**
- CRITICAL: Distinguish between "Directory Record" (raw enrollment data) and "Verified Platform User" (claimed and verified)
- Show multiple matches if similar names exist
- Clearly indicate which fields came from the directory (name, enrollment, bar association)
- Do NOT auto-claim profiles—explicit user action required
- If no match found, allow manual verification request (escalates to admin)

---

## SCREEN 4: CLAIM PROFILE

**Purpose:** User confirms identity and claims their directory record on the platform.

**Primary User:** Professional who found their record.

**Primary Action:** Claim and proceed to verification.

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│              CONFIRM YOUR PROFESSIONAL RECORD                  │
│                                                                │
│  This information comes from official bar association records. │
│                                                                │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                                                        │   │
│  │  KIRUBAKARAN SRINIVASAN                               │   │
│  │                                                        │   │
│  │  Bar Association        Tamil Nadu Bar Council         │   │
│  │  Enrollment Number      TN/2015/12345                  │   │
│  │  Location               Chennai, Tamil Nadu            │   │
│  │  Enrollment Year        2015                           │   │
│  │  Status                 Active                         │   │
│  │                                                        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                │
│                                                                │
│  Is this your record?                                         │
│                                                                │
│  ☑  Yes, this is me                                            │
│  ☐  No, this is not my record                                  │
│                                                                │
│                                                                │
│  VERIFICATION NEXT STEP                                        │
│                                                                │
│  Once you claim, we'll verify your record:                    │
│  • Confirm enrollment with bar council (24-48 hours)          │
│  • Your profile will be marked "Pending Verification"         │
│  • Other professionals can see unverified profiles             │
│  • Full visibility unlocks after verification                 │
│                                                                │
│                                                                │
│              [ CLAIM THIS PROFILE ]                            │
│                    [ GO BACK ]                                 │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:** None.

**User Actions:**
- Confirm record ownership
- [CLAIM THIS PROFILE] → Screen 5 (AI-Assisted Profile Creation)
- [GO BACK] → Return to Screen 3

**Important UX Notes:**
- Show exactly what verification means (does not block visibility, but limits features)
- Make timeline clear (24-48 hours, not vague "pending")
- Unverified profiles still appear in search results but marked as "Pending Verification"
- Do NOT create false urgency around verification

---

## SCREEN 5: AI-ASSISTED PROFILE CREATION

**Purpose:** Convert natural language professional description into structured profile data using AI.

**Primary User:** Professional creating their detailed profile.

**Primary Action:** Describe practice naturally; AI extracts data.

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                  COMPLETE YOUR PROFILE                         │
│                                                                │
│  Tell us about your professional practice. The more specific,  │
│  the better other lawyers can understand your expertise.       │
│                                                                │
│                                                                │
│  DESCRIBE YOUR PRACTICE                                        │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ I specialise in criminal law and constitutional law,    │ │
│  │ with 14 years of practice in Salem and Chennai. I       │ │
│  │ regularly appear before the High Court, Sessions Court, │ │
│  │ and Magistrate Courts. I handle criminal trials,        │ │
│  │ appeals, and also provide legal consulting on police   │ │
│  │ investigation procedures.                               │ │
│  │                                                          │ │
│  │                                                          │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  Minimum 50 characters. Be specific about courts, practice    │
│  areas, and experience.                                        │
│                                                                │
│                [ ⚡ AI EXTRACT PROFILE ]                        │
│                                                                │
│                                                                │
│  ──────────────────────────────────────────────────────────   │
│                                                                │
│  AI EXTRACTED PROFILE                                          │
│                                                                │
│  PRACTICE AREAS (auto-identified)                              │
│  ✓ Criminal Law                                                │
│  ✓ Constitutional Law                                          │
│  ✓ Criminal Procedure                                          │
│                                                                │
│  EXPERIENCE                                                    │
│  ✓ 14 years                                                    │
│                                                                │
│  LOCATIONS                                                     │
│  ✓ Salem                                                       │
│  ✓ Chennai                                                     │
│                                                                │
│  COURTS                                                        │
│  ✓ High Court (Madras)                                         │
│  ✓ Sessions Court                                              │
│  ✓ Magistrate Courts                                           │
│                                                                │
│  SERVICES OFFERED                                              │
│  ✓ Court Appearance                                            │
│  ✓ Legal Consulting                                            │
│                                                                │
│                                                                │
│              [ ✓ ACCEPT ALL ]   [ EDIT ]                       │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- AI parses natural language description
- Identifies: practice areas, experience years, locations, courts, services
- Maps to standardized taxonomy (controlled vocabulary)
- Shows extracted data with confidence (implicit in what's shown)
- User retains full control—no auto-saving

**User Actions:**
- Type practice description
- [⚡ AI EXTRACT PROFILE] → AI processes and displays extracted data
- [✓ ACCEPT ALL] → Proceed to Screen 6
- [EDIT] → Inline editing of extracted fields

**Important UX Notes:**
- AI extraction happens on-demand, not auto-triggered
- CRITICAL: Show extracted data in user-readable form, not raw tokens
- User can edit any field before accepting
- If AI confidence is low on any field, show "Needs review" indicator
- No auto-save; explicit user confirmation required
- This is the first true "AI-native" moment—must feel magical, not creepy

---

## SCREEN 6: PROFESSIONAL PROFILE

**Purpose:** Display comprehensive professional profile (both as creator sees it and as others see it).

**Primary User:** Lawyer viewing their own profile OR viewing another lawyer's profile.

**Primary Action:** Connect / Message / Request Service (for viewing others' profiles).

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ┌─────────────┐                                               │
│ │             │  ADV. KIRUBAKARAN SRINIVASAN                  │
│ │   [Photo]   │  Senior Advocate                              │
│ │             │  ✓ Verified (Pending full verification)       │
│ │             │                                                │
│ └─────────────┘  Tamil Nadu Bar Council                        │
│                  TN/2015/12345                                 │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  EXPERTISE                                                     │
│                                                                │
│  PRIMARY PRACTICE AREAS                                        │
│  • Criminal Law                                                │
│  • Constitutional Law                                          │
│  • Criminal Procedure                                          │
│                                                                │
│  COURTS & JURISDICTION                                         │
│  • High Court (Madras)                                         │
│  • Sessions Court                                              │
│  • Magistrate Courts                                           │
│  • District Courts (Multiple states)                           │
│                                                                │
│  EXPERIENCE                                                    │
│  14 years in practice                                          │
│  Primarily: Criminal litigation, Appeals                       │
│                                                                │
│  LOCATIONS                                                     │
│  Salem, Tamil Nadu (primary)                                   │
│  Chennai, Tamil Nadu (secondary)                               │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  PROFESSIONAL BIO                                              │
│                                                                │
│  Specialist in criminal law with expertise in constitutional   │
│  matters. Regular appearances before High Court and Sessions   │
│  Court. Provides legal consulting on criminal procedure and    │
│  investigation protocols.                                      │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  SERVICES OFFERED                                              │
│                                                                │
│  ☐ Court Appearance      ☐ Legal Opinion                       │
│  ☐ Local Counsel         ☐ Consultation                        │
│  ☐ Legal Research        ☐ Mediation                           │
│  ☐ Legal Drafting        ☐ Arbitration                         │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  AI PROFILE INSIGHTS                                           │
│                                                                │
│  Based on information provided by the professional:            │
│                                                                │
│  PRIMARY EXPERTISE: Criminal Litigation                        │
│                                                                │
│  RELEVANT SERVICES FOR YOUR NEEDS (if viewing):                │
│  ✓ Court Appearance — Primary service                          │
│  ✓ Legal Consulting — Secondary service                        │
│  ○ Arbitration — Mentioned but not core                        │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  PROFESSIONAL NETWORK                                          │
│                                                                │
│  Connections: 47                                               │
│  Followers: 123                                                │
│  Profile Views (30 days): 34                                   │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  [ ✓ CONNECT ]  [ ✉ MESSAGE ]  [ REQUEST SERVICE ]            │
│      [ REFER ]          [ FOLLOW ]                             │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- AI generates "Profile Insights" section from structured profile data
- Shows relevant services for matched requests
- Never invents or hallucinate insights
- Clearly labeled as AI-generated summary

**User Actions:**
- [✓ CONNECT] → Send connection request
- [✉ MESSAGE] → Open messaging interface
- [REQUEST SERVICE] → Service request modal (Screen 12)
- [REFER] → Referral modal
- [FOLLOW] → Follow professional for updates
- (Own profile: [EDIT] instead of action buttons)

**Important UX Notes:**
- Profile structure: Identity → Expertise → Bio → Services → AI Insights → Network → Actions
- Verification badge shows status clearly (not binary, shows "pending" state)
- AI insights section is clearly separated and labeled
- AI never rates or scores professionals
- Services are shown as offered, not as endorsements
- No fake engagement metrics; only factual numbers
- Profile photo is optional but recommended

---

## SCREEN 7: AI HOME

**Purpose:** Primary interface. User expresses need naturally; AI assists discovery.

**Primary User:** Any professional seeking help or exploring network.

**Primary Action:** Describe requirement, discover professionals or request service.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                   Welcome, Kirubakaran                         │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  WHAT DO YOU NEED HELP WITH?                                   │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ E.g., "Find a criminal lawyer in Salem for my client"  │ │
│  │ Or, "I need to refer a property dispute to someone"    │ │
│  │ Or, "Find arbitration specialists in Bangalore"        │ │
│  │                                                          │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ [Type your requirement here...                    ]  │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  │                                                          │ │
│  │                   [ ⚡ SEARCH ]                           │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│                                                                │
│  OR USE QUICK ACTIONS                                          │
│                                                                │
│  [ Find Professional ]  [ Find Service ]  [ Ask Network ]      │
│  [ Find Referral ]      [ Explore Courts ]                    │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  RECOMMENDED FOR YOU                                           │
│                                                                │
│  Based on your network and saved preferences:                  │
│                                                                │
│  ADV. RAMESH KUMAR                                             │
│  ├─ Corporate Law • Arbitration                                │
│  ├─ Chennai                                                    │
│  ├─ Why: Shared connections (3 mutual referrals)              │
│  └─ [ View Profile ]  [ Connect ]                              │
│                                                                │
│  ADV. PRIYA SHARMA                                             │
│  ├─ Family Law • Property Law                                 │
│  ├─ Bangalore                                                  │
│  ├─ Why: Court jurisdiction overlap (High Court)              │
│  └─ [ View Profile ]  [ Connect ]                              │
│                                                                │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  RELEVANT COMMUNITY DISCUSSIONS                                │
│                                                                │
│  Criminal Law: Electronic Evidence in Cross-Examination        │
│  └─ 23 professionals participating • Updated 2 hours ago       │
│  [ View Discussion ]                                           │
│                                                                │
│  Corporate Law: Recent Amendments to DIA Act                  │
│  └─ 15 professionals participating • Updated 1 day ago         │
│  [ View Discussion ]                                           │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  YOUR RECENT ACTIVITY                                          │
│                                                                │
│  • Connected with Adv. Veera (3 days ago)                      │
│  • Participated in "Bail Bond Calculation" discussion (1 wk)   │
│  • Received referral request from Adv. Sanjay (5 days ago)     │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- Parses natural language requirement (without searching yet)
- Provides quick actions to shortcut intent detection
- Shows recommendations based on: network, past searches, professional profile match
- Community discussions surfaced by relevance to user's practice area
- Recent activity summary (no algorithmic feed)

**User Actions:**
- Type requirement → [⚡ SEARCH] → Goto Screen 8 (AI Search interpretation)
- Use quick actions → Route to relevant screens
- Click on recommendations → Screen 6 (Professional Profile)
- Click on community discussions → Screen 14 (Community)

**Important UX Notes:**
- This is NOT a social feed (no likes, shares, trending)
- Recommendations are explicit, not algorithmic
- Search input is the hero element
- Quick actions prevent users from feeling lost
- Recent activity is factual, not gamified
- AI recommendations show reasoning (why recommend this person)

---

## SCREEN 8: AI SEARCH INTERPRETATION

**Purpose:** Show how AI understood the user's natural language requirement and allow refinement before searching.

**Primary User:** Professional who entered a requirement.

**Primary Action:** Confirm AI interpretation or edit filters.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  AI SEARCH INTERPRETATION                                      │
│                                                                │
│  Your requirement:                                             │
│  "Find a criminal lawyer in Salem with appellate experience"  │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  AI UNDERSTOOD                                                 │
│                                                                │
│  PRACTICE AREA                                                 │
│  ✓ Criminal Law                                                │ ← Editable
│                                                                │
│  LOCATION                                                      │
│  ✓ Salem, Tamil Nadu                                           │ ← Editable
│                                                                │
│  ADDITIONAL EXPERTISE                                          │
│  ✓ Appellate Practice                                          │ ← Editable
│  ○ High Court Specialization (inferred)                        │
│                                                                │
│  SERVICE TYPE                                                  │
│  ○ Court Appearance (inferred)                                 │
│  ○ Legal Consulting (optional)                                │
│                                                                │
│  EXPERIENCE LEVEL (optional)                                   │
│  ○ Any experience                                              │
│  ○ 5+ years                                                    │
│  ○ 10+ years                                                   │
│  ○ 15+ years                                                   │
│                                                                │
│  NETWORK PREFERENCE                                            │
│  ☐ Only my connections                                         │
│  ☐ Verified professionals only                                 │
│  ☐ Include all professionals                                   │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│            [ ✓ SEARCH NOW ]    [ EDIT FILTERS ]               │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- Parses natural language requirement
- Identifies: practice areas, locations, expertise, services, experience level
- Shows what AI "understood" in plain language
- Allows user to refine before actual search executes
- No search results shown yet

**User Actions:**
- [✓ SEARCH NOW] → Execute search → Screen 9 (Search Results)
- [EDIT FILTERS] → Allow inline editing of interpreted fields
- Click on any field → Edit specific filter

**Important UX Notes:**
- This screen prevents AI "hallucination" by showing what was understood
- User always has control before search runs
- Inferred fields are marked as optional or low-confidence
- Network filters (verified only, connections only) are user choice
- This design respects user agency—AI doesn't auto-search

---

## SCREEN 9: AI SEARCH RESULTS

**Purpose:** Display professionals matching the requirement with explainable AI reasoning.

**Primary User:** Professional reviewing search results.

**Primary Action:** View profile, connect, or request service.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  SEARCH RESULTS                                                │
│                                                                │
│  Your search: Criminal Law • Salem • Appellate Experience      │
│                                                                │
│  Matches found: 7                                              │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  1. ADV. VIJAY KUMAR                                           │
│     ├─ Senior Advocate, Criminal Law                           │
│     ├─ Salem, Tamil Nadu                                       │
│     └─ Verification: ✓ Verified                                │
│                                                                │
│     WHY THIS MATCH                                             │
│     ✓ Criminal Law (primary practice)                          │
│     ✓ Appellate Practice (15+ years)                           │
│     ✓ High Court (Madras) experience                           │
│     ✓ Salem jurisdiction                                       │
│     ○ Court appearance (verified service)                      │
│                                                                │
│     RELEVANCE: Highly Relevant                                 │
│                                                                │
│     [ VIEW PROFILE ]  [ CONNECT ]  [ REQUEST SERVICE ]         │
│                                                                │
│                                                                │
│  2. ADV. MEENA IYER                                            │
│     ├─ Advocate, Criminal & Constitutional Law                 │
│     ├─ Salem, Tamil Nadu                                       │
│     └─ Verification: ✓ Verified                                │
│                                                                │
│     WHY THIS MATCH                                             │
│     ✓ Criminal Law (primary practice)                          │
│     ✓ Salem jurisdiction                                       │
│     ○ Appellate practice (8 years, some appeals)               │
│     ✓ Sessions & High Court experience                         │
│     ? Current availability not provided                        │
│                                                                │
│     RELEVANCE: Relevant                                        │
│                                                                │
│     [ VIEW PROFILE ]  [ CONNECT ]  [ REQUEST SERVICE ]         │
│                                                                │
│                                                                │
│  3. ADV. SURESH RAJ                                            │
│     ├─ Advocate, Criminal Law                                  │
│     ├─ Chennai (travels to Salem)                              │
│     └─ Verification: Pending Verification                      │
│                                                                │
│     WHY THIS MATCH                                             │
│     ✓ Criminal Law (primary practice)                          │
│     ✓ Appellate experience (12 years)                          │
│     ✓ High Court experience                                    │
│     ○ Chennai-based, but serves Salem region                   │
│     ? Profile not yet verified                                 │
│                                                                │
│     RELEVANCE: Potential Match                                 │
│                                                                │
│     [ VIEW PROFILE ]  [ CONNECT ]  [ REQUEST SERVICE ]         │
│                                                                │
│                                                                │
│  [ REFINE SEARCH ]    [ SHOW MORE ]                            │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- Searches professional graph against interpreted requirement
- Returns ranked results (Highly Relevant → Relevant → Potential Match)
- Shows explicit "WHY THIS MATCH" reasoning
- Identifies data gaps (availability unknown, not verified)
- No fake ratings or confidence scores

**User Actions:**
- [VIEW PROFILE] → Screen 6 (Professional Profile)
- [CONNECT] → Send connection request
- [REQUEST SERVICE] → Service request modal (Screen 12)
- [REFINE SEARCH] → Return to Screen 8 to adjust filters
- [SHOW MORE] → Load additional results

**Important UX Notes:**
- CRITICAL: Never show star ratings or fake metrics
- Relevance indicators are qualitative (Highly Relevant, Relevant, Potential)
- Every match must show reasoning, not opaque ranking
- Data gaps are honest (availability unknown, not verified, etc.)
- Results ranked by explicit relevance, not algorithm
- User can refine or expand search easily

---

## SCREEN 10: PROFESSIONAL NETWORK

**Purpose:** Display user's professional graph and suggestions.

**Primary User:** Professional managing their network.

**Primary Action:** Explore connections, follow professionals, discover suggestions.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  MY PROFESSIONAL NETWORK                                       │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  MY CONNECTIONS: 47                                            │
│                                                                │
│  ┌──────────────────────────┬──────────────────────────────┐  │
│  │ ADV. RAMESH KUMAR        │ ADV. PRIYA SHARMA            │  │
│  │ Corporate Law            │ Family Law                   │  │
│  │ Chennai                  │ Bangalore                    │  │
│  │ [ UNCONNECT ]            │ [ UNCONNECT ]                │  │
│  └──────────────────────────┴──────────────────────────────┘  │
│                                                                │
│  ┌──────────────────────────┬──────────────────────────────┐  │
│  │ ADV. ANAND REDDY         │ ADV. SUNITA MISHRA           │  │
│  │ IP Law                   │ Labour Law                   │  │
│  │ Hyderabad                │ Delhi                        │  │
│  │ [ UNCONNECT ]            │ [ UNCONNECT ]                │  │
│  └──────────────────────────┴──────────────────────────────┘  │
│                                                                │
│  [ SHOW ALL CONNECTIONS ]                                     │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  FOLLOWING: 23                                                │
│                                                                │
│  (Professionals you follow for updates, not direct peers)      │
│                                                                │
│  [ MANAGE FOLLOWING ]                                         │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  SUGGESTED PROFESSIONALS (AI-RECOMMENDED)                      │
│                                                                │
│  1. ADV. VIKRAM PATEL                                          │
│     ├─ Criminal & Constitutional Law                          │
│     ├─ Bangalore                                               │
│     ├─ Suggested because:                                      │
│     │  • Same Bar Association (practice area overlap)         │
│     │  • 3 mutual connections (Adv. Ramesh, Adv. Sunita, ...) │
│     │  • Shared court jurisdictions                            │
│     └─ [ VIEW PROFILE ]  [ CONNECT ]                           │
│                                                                │
│  2. ADV. DEEPA KHOSLA                                          │
│     ├─ Commercial Law & Arbitration                            │
│     ├─ Mumbai                                                  │
│     ├─ Suggested because:                                      │
│     │  • Complementary practice area (arbitration)            │
│     │  • Common professional interests                         │
│     │  • Relevant court jurisdictions                          │
│     └─ [ VIEW PROFILE ]  [ CONNECT ]                           │
│                                                                │
│  3. ADV. HARSH MITTAL                                          │
│     ├─ Tax Law & Corporate Restructuring                       │
│     ├─ Pune                                                    │
│     ├─ Suggested because:                                      │
│     │  • Bar Association overlap                               │
│     │  • Emerging expertise area in network                    │
│     └─ [ VIEW PROFILE ]  [ CONNECT ]                           │
│                                                                │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  PROFESSIONALS YOU MAY KNOW                                    │
│                                                                │
│  (Co-appeared in courts, common bar association, etc.)         │
│                                                                │
│  [ EXPLORE ]                                                  │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- AI suggests professionals based on: shared connections, practice area complementarity, court jurisdiction overlap, bar association affinity
- Every suggestion shows reasoning
- No opaque algorithm; user understands why suggested

**User Actions:**
- [VIEW PROFILE] → Screen 6 (Professional Profile)
- [CONNECT] → Send connection request
- [UNCONNECT] → Remove connection
- [SHOW ALL CONNECTIONS] → View full connection list
- [MANAGE FOLLOWING] → Manage following list

**Important UX Notes:**
- Connections ≠ followers (distinct concepts)
- Suggestions are transparent—show reasoning
- No "People You May Know" without explanation
- No engagement metrics or popularity indicators
- Network section is for relationship management, not social feeds

---

## SCREEN 11: SERVICES

**Purpose:** Interface for requesting or offering professional services.

**Primary User:** Professional seeking specific assistance OR offering services.

**Primary Action:** Browse services, request help, or manage service offerings.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  PROFESSIONAL SERVICES                                         │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  I NEED HELP WITH:                                             │
│                                                                │
│  [ Court Appearance ]  [ Local Counsel ]  [ Legal Research ]   │
│  [ Legal Drafting ]    [ Legal Opinion ]  [ Consultation ]     │
│  [ Arbitration ]       [ Mediation ]      [ Other ]            │
│                                                                │
│  Or describe your need naturally:                              │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ E.g., "I need someone to appear for my client in Salem"│ │
│  │                                                          │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ [                                                ]   │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  │                                                          │ │
│  │                [ ⚡ FIND PROFESSIONALS ]                  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  I CAN OFFER:                                                  │
│                                                                │
│  Manage the services you offer in your professional profile:   │
│                                                                │
│  Your Current Services:                                        │
│  ✓ Court Appearance                                            │
│  ✓ Legal Consulting                                            │
│  ○ Arbitration (not currently offered)                         │
│  ○ Mediation (not currently offered)                           │
│                                                                │
│  [ EDIT MY SERVICES ]                                          │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  SERVICE AVAILABILITY                                          │
│                                                                │
│  Update your availability to help other professionals:         │
│                                                                │
│  Status:  ☑ Available to assist                                │
│  Response Time:  2-3 business days                             │
│                                                                │
│  [ EDIT AVAILABILITY ]                                        │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  YOUR SERVICE REQUESTS                                         │
│                                                                │
│  Recent requests from other professionals:                     │
│                                                                │
│  1. Adv. Sanjay Kumar                                          │
│     Service: Court Appearance                                  │
│     Details: Criminal matter in Salem Sessions Court           │
│     Date: Monday, 15 December                                  │
│     Status: ⏳ Awaiting your response                           │
│     [ VIEW DETAILS ]  [ ACCEPT ]  [ DECLINE ]                  │
│                                                                │
│  2. Adv. Priya Sharma (referred by Adv. Ramesh)               │
│     Service: Legal Research                                    │
│     Details: Constitutional law precedents on X               │
│     Deadline: 5 days                                           │
│     Status: ⏳ Awaiting your response                           │
│     [ VIEW DETAILS ]  [ ACCEPT ]  [ DECLINE ]                  │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- AI interprets natural language service requests and routes to relevant professionals
- Services taxonomy is standardized (Court Appearance, Legal Research, etc.)
- No auto-acceptance or auto-matching; user explicitly accepts requests

**User Actions:**
- Select service type OR describe need → Route to Screen 12 (Service Matching)
- [EDIT MY SERVICES] → Update offered services
- [EDIT AVAILABILITY] → Set status and response time
- [ACCEPT] / [DECLINE] → Respond to service requests
- [VIEW DETAILS] → See full service request details

**Important UX Notes:**
- Services are transactional, not subscription-based
- Availability is clear (available/unavailable, response time)
- Service requests are explicit—no automatic acceptance
- Service history tracked for reliability
- Complementary to messaging (formal request ≠ casual chat)

---

## SCREEN 12: AI SERVICE MATCHING

**Purpose:** AI matches service request to relevant professionals; user reviews and requests.

**Primary User:** Professional who described a service need.

**Primary Action:** Request assistance from matched professional.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  SERVICE REQUEST MATCH                                         │
│                                                                │
│  Your requirement:                                             │
│  "I need someone to appear for me in Coimbatore next Monday   │
│   for a Sessions Court hearing in a criminal matter."          │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  AI UNDERSTOOD                                                 │
│                                                                │
│  SERVICE:         Court Appearance                             │
│  LOCATION:        Coimbatore                                   │
│  COURT:           Sessions Court                               │
│  DATE:            Monday (approx. date)                        │
│  PRACTICE AREA:   Criminal Law                                 │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  MATCHED PROFESSIONALS                                         │
│                                                                │
│  2 highly relevant professionals found                          │
│                                                                │
│  1. ADV. ANAND RAO                                             │
│     ├─ Criminal Law Specialist                                 │
│     ├─ Coimbatore (primary location)                           │
│     ├─ Status: ✓ Available                                     │
│     ├─ Response time: 1-2 business days                        │
│     │                                                          │
│     ├─ WHY THIS MATCH                                          │
│     │  ✓ Criminal law (your matter)                            │
│     │  ✓ Coimbatore jurisdiction (primary base)                │
│     │  ✓ Sessions Court experience (10+ years)                 │
│     │  ✓ Court appearance (core service)                       │
│     │  ✓ Your connection (via Adv. Ramesh)                     │
│     │                                                          │
│     └─ [ VIEW PROFILE ]  [ REQUEST ASSISTANCE ]                │
│                                                                │
│                                                                │
│  2. ADV. MEERA KRISHNAN                                        │
│     ├─ Criminal & Constitutional Law                           │
│     ├─ Bangalore (serves South India)                          │
│     ├─ Status: ✓ Available                                     │
│     ├─ Response time: 2-3 business days                        │
│     │                                                          │
│     ├─ WHY THIS MATCH                                          │
│     │  ✓ Criminal law (primary practice)                       │
│     │  ✓ High Court & Sessions experience                      │
│     │  ✓ South Indian courts (familiar)                        │
│     │  ○ Based in Bangalore (1-2 hour travel)                  │
│     │  ✓ Court appearance (available)                          │
│     │                                                          │
│     └─ [ VIEW PROFILE ]  [ REQUEST ASSISTANCE ]                │
│                                                                │
│                                                                │
│  [ REFINE REQUEST ]    [ SEARCH MORE ]                         │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- Parses service request (location, date, service type, practice area, court)
- Searches professional graph for availability and expertise match
- Returns ranked matches with explicit reasoning
- No auto-contact; user must explicitly request assistance

**User Actions:**
- [REQUEST ASSISTANCE] → Proceed to formal service request (with message form)
- [VIEW PROFILE] → See full professional profile
- [REFINE REQUEST] → Adjust service parameters
- [SEARCH MORE] → Expand search scope

**Important UX Notes:**
- Service matching is high-touch; user sets parameters
- Availability is real-time (user's status affects visibility)
- Matching is transparent (show why each person matches)
- No automatic messaging; user composes request
- Request goes into service queue, visible to professional

---

## SCREEN 13: REFERRAL ASSISTANT

**Purpose:** AI assists in identifying suitable referral partners based on requirement.

**Primary User:** Professional making a referral.

**Primary Action:** Describe referral need; find suitable referral partner.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  FIND A REFERRAL PARTNER                                       │
│                                                                │
│  You're looking to refer a matter. Tell us about it:           │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ E.g., "I need to refer a property dispute in Madurai"  │ │
│  │ Or, "Family law matter in Chennai, need a referral"    │ │
│  │                                                          │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ [                                                ]   │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  │                                                          │ │
│  │                [ ⚡ FIND REFERRAL ]                       │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  REFERRAL CANDIDATES                                           │
│                                                                │
│  Your requirement:                                             │
│  "I need to refer a property dispute in Madurai"              │
│                                                                │
│  AI UNDERSTOOD                                                 │
│  Practice Area: Property Law                                   │
│  Location: Madurai                                             │
│  Court: District Court (inferred)                              │
│                                                                │
│  3 suitable referral partners found                            │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  1. ADV. RAJESH KUMAR                                          │
│     ├─ Property Law Specialist                                 │
│     ├─ Madurai (primary location)                              │
│     ├─ 12 years experience                                     │
│     │                                                          │
│     ├─ WHY SUITABLE                                            │
│     │  ✓ Property law (your referral area)                     │
│     │  ✓ Madurai jurisdiction                                  │
│     │  ✓ District Court & High Court experience               │
│     │  ✓ Your professional connection                          │
│     │  ✓ Available to accept referrals                         │
│     │                                                          │
│     └─ [ VIEW PROFILE ]  [ SEND REFERRAL ]                    │
│                                                                │
│                                                                │
│  2. ADV. YASMIN ALI                                            │
│     ├─ Property & Commercial Law                               │
│     ├─ Madurai                                                 │
│     ├─ 8 years experience                                      │
│     │                                                          │
│     ├─ WHY SUITABLE                                            │
│     │  ✓ Property law (primary practice)                       │
│     │  ✓ Madurai-based                                         │
│     │  ✓ District Court experience                             │
│     │  ○ Less experienced (8 years vs 12+)                     │
│     │  ✓ Known for responsiveness                              │
│     │                                                          │
│     └─ [ VIEW PROFILE ]  [ SEND REFERRAL ]                    │
│                                                                │
│                                                                │
│  [ REFINE CRITERIA ]    [ SHOW MORE CANDIDATES ]               │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- AI parses referral requirement (practice area, location, court, parties)
- Matches against professional graph (expertise, location, availability)
- Returns candidates ranked by fit
- Shows reasoning for each recommendation

**User Actions:**
- Describe referral need → [⚡ FIND REFERRAL]
- [SEND REFERRAL] → Compose referral message and send
- [VIEW PROFILE] → View full professional profile
- [REFINE CRITERIA] → Adjust search parameters
- [SHOW MORE CANDIDATES] → Expand results

**Important UX Notes:**
- Referral is trust-building; show why candidate is suitable
- Client consent should be implied (user is responsible for that)
- Referral message goes directly to professional
- Acceptance/decline by recipient is asynchronous
- Referral history improves future matching

---

## SCREEN 14: COMMUNITY / DISCUSSIONS

**Purpose:** Professional forum for practice area discussions, Q&A, knowledge sharing.

**Primary User:** Professional exploring or participating in community discussions.

**Primary Action:** Browse discussions, ask questions, share experience.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  PROFESSIONAL COMMUNITY                                        │
│                                                                │
│  Discussions by Practice Area:                                 │
│                                                                │
│  [ Criminal Law ]  [ Civil Law ]  [ Corporate Law ]            │
│  [ Family Law ]    [ Property Law ]  [ IP Law ]                │
│  [ Arbitration ]   [ Taxation ]  [ Other Areas ]               │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  FEATURED DISCUSSIONS                                          │
│                                                                │
│  1. Criminal Law: Electronic Evidence in Cross-Examination     │
│     └─ Started by Adv. Meera Sharma (2 weeks ago)              │
│     └─ 34 professionals participating                          │
│     └─ Last updated 2 hours ago                                │
│     └─ 147 messages                                            │
│     │                                                          │
│     │ Key discussion points:                                   │
│     │ • Admissibility of digital forensics reports             │
│     │ • Judicial precedent on email authentication             │
│     │ • Practical challenges in cross-examination              │
│     │                                                          │
│     └─ [ JOIN DISCUSSION ]                                     │
│                                                                │
│                                                                │
│  2. Corporate Law: Recent Amendments to the DIA Act            │
│     └─ Started by Adv. Rajesh Iyer (1 week ago)                │
│     └─ 23 professionals participating                          │
│     └─ Last updated 3 days ago                                 │
│     └─ 89 messages                                             │
│     │                                                          │
│     │ Key discussion points:                                   │
│     │ • Impact on insolvency timelines                         │
│     │ • Committee implications                                 │
│     │ • Practical guidance on transition                       │
│     │                                                          │
│     └─ [ JOIN DISCUSSION ]                                     │
│                                                                │
│                                                                │
│  3. Property Law: Recent SC Judgment on Adverse Possession     │
│     └─ Started by Adv. Suresh Kumar (4 days ago)               │
│     └─ 15 professionals participating                          │
│     └─ Last updated 1 day ago                                  │
│     └─ 52 messages                                             │
│     │                                                          │
│     │ Key discussion points:                                   │
│     │ • Changed legal threshold for adverse possession         │
│     │ • Practical impact on pending cases                      │
│     │ • State-wise implementation differences                  │
│     │                                                          │
│     └─ [ JOIN DISCUSSION ]                                     │
│                                                                │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  START A NEW DISCUSSION                                        │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ E.g., "Best practices for bail bond calculations?"      │ │
│  │                                                          │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ [Title of your discussion...                     ]   │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  │                                                          │ │
│  │ Practice Area: [ Criminal Law              ▼ ]          │ │
│  │                                                          │ │
│  │              [ START DISCUSSION ]                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│                                                                │
│  [ VIEW ALL DISCUSSIONS ]  [ MY DISCUSSIONS ]                  │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- Community is user-generated (no AI moderation in v1)
- AI summarizes long discussions on-demand (Screen 16)
- Community topics pre-defined by practice area (criminal, civil, corporate, etc.)

**User Actions:**
- [JOIN DISCUSSION] → Enter discussion thread
- Select practice area → Filter discussions by area
- [START DISCUSSION] → Create new discussion
- [VIEW ALL DISCUSSIONS] → Full discussion list with sorting/filtering
- [MY DISCUSSIONS] → User's own discussions and participations

**Important UX Notes:**
- Community is professional peer exchange, not social feed
- No likes, shares, or engagement gamification
- Discussions are permanent (knowledge-building)
- Moderation is light (spam/abuse only)
- Discussion topics are pre-categorized (not free-form)

---

## SCREEN 15: ASK THE NETWORK

**Purpose:** AI-mediated Q&A. User asks a question; AI routes to relevant professionals or surfaces existing discussion.

**Primary User:** Professional with a specific question.

**Primary Action:** Ask question; AI finds relevant pros or discussion.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ASK THE NETWORK                                               │
│                                                                │
│  Have a specific question? Ask your professional network.      │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ E.g., "Has anyone handled a case involving electronic   │ │
│  │ evidence suppression in a criminal trial?"              │ │
│  │                                                          │ │
│  │ ┌──────────────────────────────────────────────────────┐ │ │
│  │ │ [Your question...                               ]   │ │ │
│  │ └──────────────────────────────────────────────────────┘ │ │
│  │                                                          │ │
│  │ Practice Area: [ Criminal Law              ▼ ]          │ │
│  │ Geographic Scope: [ All India     ▼ ]                   │ │
│  │                                                          │ │
│  │              [ ASK THE NETWORK ]                         │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  AI SEARCH RESULTS                                             │
│                                                                │
│  Your question detected as:                                    │
│  Topic: Electronic Evidence in Criminal Trials                 │
│  Intent: Experience/Best Practice Sharing                      │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  ✓ EXISTING DISCUSSION FOUND                                   │
│                                                                │
│  "Electronic Evidence in Cross-Examination"                   │
│  └─ Criminal Law discussion (34 professionals)                │
│  └─ 147 messages (very active)                                │
│  └─ Covers exactly your topic                                 │
│                                                                │
│     [ JOIN THIS DISCUSSION ]                                   │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  OR POST YOUR QUESTION TO THE NETWORK                          │
│                                                                │
│  If you'd prefer a fresh discussion or more specific answer:   │
│                                                                │
│  [ POST AS NEW QUESTION ]                                      │
│                                                                │
│  (Your question will be routed to:                             │
│   • 23 relevant professionals in your network                  │
│   • Criminal law specialists in matching jurisdiction)         │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- AI parses question intent (is this experiential Q&A or knowledge lookup?)
- Searches existing discussions for relevance
- If relevant discussion exists, offer to join
- If new question, route to relevant professionals in network
- Professionals receive notification of question

**User Actions:**
- Ask question
- [JOIN THIS DISCUSSION] → Screen 14 (jump into existing discussion)
- [POST AS NEW QUESTION] → Post question; AI routes to relevant professionals
- Set practice area and geographic scope

**Important UX Notes:**
- CRITICAL: AI should prefer existing discussions over fragmenting Q&A
- Questions are routed to professionals, not broadcast to everyone
- Questions are temporary (time-bounded, not permanent like discussions)
- Professionals can opt-out of question routing
- User gets notifications when question is answered

---

## SCREEN 16: COMMUNITY AI SUMMARY

**Purpose:** AI generates summary of long/complex discussion threads for quick understanding.

**Primary User:** Professional who wants quick context on discussion without reading all messages.

**Primary Action:** View AI-generated discussion summary.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  DISCUSSION SUMMARY                                            │
│                                                                │
│  Electronic Evidence in Cross-Examination                      │
│  └─ 34 professionals • 147 messages • Started 2 weeks ago      │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  ⚡ AI-GENERATED SUMMARY                                        │
│                                                                │
│  This summary is AI-generated from the discussion.             │
│  Always verify current case law and seek expert advice.        │
│                                                                │
│  ───────────────────────────────────────────────────────────   │
│                                                                │
│  KEY CONSENSUS OBSERVATIONS                                    │
│                                                                │
│  1. Digital forensics reports face scrutiny on authenticity     │
│     and chain of custody, particularly in State courts.        │
│                                                                │
│  2. Email authentication hinges on sender verification and     │
│     metadata integrity; Bharati v. State (HC precedent) is     │
│     frequently cited.                                          │
│                                                                │
│  3. Practical challenge: Expert witnesses are often            │
│     unavailable for cross-examination in smaller districts.    │
│                                                                │
│  ───────────────────────────────────────────────────────────   │
│                                                                │
│  DIFFERING VIEWPOINTS                                          │
│                                                                │
│  View A: Admissibility rests on compliance with IT Act         │
│          (Adv. Rajesh, Adv. Meera — 12 participants)          │
│                                                                │
│  View B: Common law authentication standards still apply       │
│          (Adv. Anand, Adv. Sunita — 8 participants)           │
│                                                                │
│  View C: Standards differ between State and High Court         │
│          (Adv. Vikram — minority view, 3 participants)        │
│                                                                │
│  ───────────────────────────────────────────────────────────   │
│                                                                │
│  RELEVANT PROFESSIONALS                                        │
│                                                                │
│  Most active participants:                                     │
│                                                                │
│  Adv. Meera Sharma                                             │
│  └─ Initiated discussion, 23 messages on IT evidence           │
│  └─ [ CONNECT ]                                                │
│                                                                │
│  Adv. Rajesh Kumar                                             │
│  └─ Expert perspective on digital forensics, 18 messages       │
│  └─ [ CONNECT ]                                                │
│                                                                │
│  Adv. Vikram Patel                                             │
│  └─ Alternative viewpoint on common law standards, 12 messages │
│  └─ [ CONNECT ]                                                │
│                                                                │
│  ───────────────────────────────────────────────────────────   │
│                                                                │
│  [ READ FULL DISCUSSION ]    [ REPLY ]    [ SHARE ]            │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- AI extracts discussion consensus, differing views, key observations
- Identifies most active and influential participants
- Suggests relevant professionals to connect with
- NEVER presents AI summary as legal authority or case law
- Always includes disclaimer: "AI-generated, verify independently"

**User Actions:**
- [READ FULL DISCUSSION] → Enter full discussion thread
- [REPLY] → Add message to discussion
- [CONNECT] → Connect with relevant professionals from discussion
- [SHARE] → Share summary with peers (not shown here)

**Important UX Notes:**
- CRITICAL: Disclaimer is prominent and non-negotiable
- AI summarization is for efficiency only, not legal opinion
- Users must read full discussion for nuanced understanding
- Most active participants are identifiable (builds trust)
- Summary is read-only; actual participation requires reading full thread

---

## SCREEN 17: MESSAGING

**Purpose:** Professional 1-to-1 messaging for service requests, referrals, and collaboration.

**Primary User:** Professional managing conversations with peers.

**Primary Action:** Send message, respond to requests, track conversations.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  MESSAGES                                                      │
│                                                                │
│  ┌────────────────────┐ ┌──────────────────────────────────┐  │
│  │ CONVERSATIONS      │ │ CONVERSATION WITH ADV. RAMESH    │  │
│  │                    │ │                                  │  │
│  │ ADV. RAMESH KUMAR  │ │  Re: Criminal matter referral    │  │
│  │ [ Recent message ]─┼─│─────────────────────────────────│  │
│  │ 2 hours ago        │ │                                  │  │
│  │                    │ │  ADV. RAMESH KUMAR              │  │
│  │ ──────────────────── │  2 hours ago                     │  │
│  │ ⊙ SERVICE REQUEST  │ │                                  │  │
│  │   Adv. Sanjay      │ │  "I've got a Sessions matter in │  │
│  │   Court appearance │ │   Salem (criminal). Can you     │  │
│  │   Awaiting response│ │   handle local counsel?"         │  │
│  │   [ ACCEPT/DECLINE] │ │                                  │  │
│  │                    │ │  ──────────────────────────────  │  │
│  │ ──────────────────── │                                  │  │
│  │ ADV. PRIYA SHARMA  │ │  YOU                             │  │
│  │ Legal research Q&A │ │  1 hour ago                      │  │
│  │ 1 day ago          │ │                                  │  │
│  │                    │ │  "Happy to help. What's the     │  │
│  │ ──────────────────── │   client and brief?"             │  │
│  │ ADV. ANAND REDDY   │ │                                  │  │
│  │ [Message preview]  │ │  ──────────────────────────────  │  │
│  │ 3 days ago         │ │                                  │  │
│  │                    │ │  ADV. RAMESH KUMAR              │  │
│  │ ──────────────────── │  1 hour ago                      │  │
│  │ ⊙ REFERRAL         │ │                                  │  │
│  │   Adv. Suresh      │ │  "Corporate, import-export      │  │
│  │   Arbitration      │ │   business. Disputed payment.    │  │
│  │   Interest expressed│ │   Client has limited evidence.   │  │
│  │   [ VIEW DETAILS ] │ │   Timeline is 3 weeks."          │  │
│  │                    │ │                                  │  │
│  │                    │ │  ──────────────────────────────  │  │
│  │                    │ │                                  │  │
│  │ [ VIEW ALL ]       │ │  YOU (type here)                 │  │
│  │                    │ │  ┌────────────────────────────┐  │  │
│  │                    │ │  │ [Message...              ] │  │  │
│  │                    │ │  └────────────────────────────┘  │  │
│  │                    │ │  [ SEND ]  [ OFFER SERVICE ]     │  │
│  │                    │ │                                  │  │
│  └────────────────────┘ └──────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- Messages are user-generated (no AI composition)
- AI can optionally summarize long conversations (on-demand)
- Service requests and referrals are formally routed through messages

**User Actions:**
- Compose and send message
- [OFFER SERVICE] → Propose service within conversation
- [ACCEPT/DECLINE] → Respond to service requests
- [VIEW DETAILS] → Full details of referral or service request
- [VIEW ALL] → Full conversation list

**Important UX Notes:**
- Messaging is transactional, not casual (professional tone expected)
- Service requests and referrals have formal status (awaiting response)
- Separate from community discussions (1-to-1, not public)
- No read receipts or "typing" indicators (professional distance)
- Message history is persistent (can refer back to past conversations)

---

## SCREEN 18: NOTIFICATIONS

**Purpose:** Alert user to important activity without spam.

**Primary User:** Professional checking updates.

**Primary Action:** Review notifications and take action.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  NOTIFICATIONS                                                 │
│                                                                │
│  TODAY                                                         │
│                                                                │
│  ⊙ CONNECTION REQUEST                                          │
│     Adv. Priya Sharma wants to connect                         │
│     [ ACCEPT ]  [ DECLINE ]                                    │
│                                                                │
│  ⊙ SERVICE REQUEST                                             │
│     Adv. Ramesh Kumar requests court appearance (Salem, Mon)   │
│     [ ACCEPT ]  [ DECLINE ]  [ VIEW DETAILS ]                  │
│                                                                │
│  ⊙ MESSAGE                                                     │
│     Adv. Anand: "Are you available for a legal opinion?"       │
│     [ VIEW CONVERSATION ]                                      │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  THIS WEEK                                                     │
│                                                                │
│  □ DISCUSSION PARTICIPATION                                    │
│    Someone replied to your comment in "Electronic Evidence..."│
│    [ VIEW DISCUSSION ]                                         │
│                                                                │
│  □ PROFILE VIEW                                                │
│    Your profile was viewed by 7 professionals this week        │
│    [ VIEW WHO ]                                                │
│                                                                │
│  □ NETWORK MILESTONE                                           │
│    You've reached 50 connections!                              │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  NOTIFICATION PREFERENCES                                      │
│                                                                │
│  [ MANAGE NOTIFICATION SETTINGS ]                              │
│                                                                │
│  Currently enabled:                                            │
│  ✓ Connection requests                                         │
│  ✓ Service requests                                            │
│  ✓ Direct messages                                             │
│  ☐ Discussion updates                                          │
│  ☐ Profile views                                               │
│  ☐ Network recommendations                                     │
│  ✓ Important platform updates                                  │
│                                                                │
│  Email preferences: Digest (once per week)                     │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:** None. Notifications are event-driven.

**User Actions:**
- [ACCEPT] / [DECLINE] → Respond to connection/service requests
- [VIEW DETAILS] / [VIEW CONVERSATION] → Navigate to related content
- [MANAGE NOTIFICATION SETTINGS] → Customize notification preferences

**Important UX Notes:**
- Notifications grouped by time and type (not chronological chaos)
- Action items (requests) separated from information (discussion updates)
- User can customize what triggers notifications
- Digest email option (not real-time spam)
- Milestones and profile views are optional (can be disabled)

---

## SCREEN 19: PROFILE / SETTINGS

**Purpose:** User manage their professional profile, privacy, and account settings.

**Primary User:** Professional updating their profile or settings.

**Primary Action:** Edit profile, manage privacy, update preferences.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  MY PROFILE & SETTINGS                                         │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  PROFESSIONAL PROFILE        [ EDIT ]                   │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │  Name: Kirubakaran Srinivasan                           │  │
│  │  Title: Senior Advocate                                 │  │
│  │  Bar Association: Tamil Nadu Bar Council                │  │
│  │  Enrollment: TN/2015/12345                              │  │
│  │  Verification Status: Pending Full Verification         │  │
│  │  Bio: [Your professional bio]                           │  │
│  │  Photo: [Current photo]                                 │  │
│  │                                                          │  │
│  │  [ EDIT PROFILE ]                                        │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ├─ EXPERTISE & SERVICES         [ EDIT ]                   │  │
│  │  Practice Areas: Criminal Law, Constitutional Law       │  │
│  │  Services Offered: Court Appearance, Consulting         │  │
│  │  [ EDIT SERVICES ]                                       │  │
│  │  [ EDIT AVAILABILITY ]                                   │  │
│  │                                                          │  │
│  ├─ PROFESSIONAL NETWORK         [ VIEW ]                   │  │
│  │  Connections: 47                                         │  │
│  │  Following: 23                                           │  │
│  │  [ MANAGE CONNECTIONS ]                                  │  │
│  │  [ MANAGE FOLLOWING ]                                    │  │
│  │                                                          │  │
│  ├─ PRIVACY & VISIBILITY         [ MANAGE ]                 │  │
│  │  ☑ Profile visible in search results                    │  │
│  │  ☑ Available for connection requests                    │  │
│  │  ☑ Available for service requests                       │  │
│  │  ☐ Show profile view notifications                      │  │
│  │  ☐ Show in recommended professionals                    │  │
│  │  ☑ Include in AI recommendations to others              │  │
│  │                                                          │  │
│  │  Block list: (none)                                     │  │
│  │                                                          │  │
│  ├─ AI PREFERENCES                [ MANAGE ]                │  │
│  │  ☑ Receive AI recommendations                           │  │
│  │  ☑ Allow AI to see my profile data                      │  │
│  │  ☑ Allow AI to summarize discussions I participate in   │  │
│  │  ☐ Opt-out of AI-assisted matching                      │  │
│  │                                                          │  │
│  │  [  ] I would like to know more about how AI is used    │  │
│  │                                                          │  │
│  ├─ NOTIFICATIONS                 [ MANAGE ]                │  │
│  │  [ Notification preferences (see Screen 18) ]            │  │
│  │                                                          │  │
│  ├─ SECURITY & ACCOUNT            [ MANAGE ]                │  │
│  │  Email: kiruba@example.com                              │  │
│  │  Mobile: +91 98765 43210                                │  │
│  │  [ CHANGE PASSWORD ]                                     │  │
│  │  [ TWO-FACTOR AUTHENTICATION ]                           │  │
│  │  [ ACTIVE SESSIONS ]                                     │  │
│  │                                                          │  │
│  ├─ ACCOUNT DELETION               [ DELETE ]               │  │
│  │  Delete your account permanently                         │  │
│  │  [ REQUEST DELETION ]                                    │  │
│  │                                                          │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:** None. Settings are user-controlled.

**User Actions:**
- [EDIT PROFILE] → Edit professional profile
- [EDIT SERVICES] → Update service offerings
- [EDIT AVAILABILITY] → Set availability status
- [MANAGE CONNECTIONS] → View/remove connections
- [MANAGE PRIVACY] → Adjust visibility and privacy settings
- [MANAGE AI PREFERENCES] → Opt-out of AI features
- [CHANGE PASSWORD] / [2FA] → Security settings
- [REQUEST DELETION] → Delete account

**Important UX Notes:**
- AI preferences are transparent and granular (user controls data usage)
- Privacy controls are prominent (not buried)
- Verification status is shown (user knows where they stand)
- Availability is separately managed (service-level, not profile-level)
- Account deletion is available (GDPR/DPA compliance)
- All settings are grouped logically by category

---

## SCREEN 20: AI ACTIVITY / TRANSPARENCY

**Purpose:** Show user how AI agents are operating on their behalf and what data is used.

**Primary User:** Professional curious about AI activity or concerned about privacy.

**Primary Action:** Review AI activity log, understand data usage.

```
┌────────────────────────────────────────────────────────────────┐
│ LEGAL NETWORK         🔔  Messages  Notifications  Profile ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  AI ACTIVITY & TRANSPARENCY                                    │
│                                                                │
│  This page shows what AI agents are doing on your behalf       │
│  and what data they're using.                                  │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  TODAY'S AI ACTIVITY                                           │
│                                                                │
│  1. Professional Search (08:45 AM)                             │
│     └─ Agent: Discovery + Matching                             │
│     └─ Your Query: "Criminal lawyer in Salem for Sessions"    │
│     └─ Data Sources: Professional profiles, services          │
│     └─ Results: 7 professionals recommended                    │
│     └─ [ VIEW REASONING ]                                      │
│                                                                │
│  2. Network Recommendation (08:30 AM)                          │
│     └─ Agent: Recommendation Engine                            │
│     └─ Type: Suggested professionals (homepage)                │
│     └─ Data Sources: Your network, your practice area         │
│     └─ Results: 2 professionals suggested                      │
│     └─ [ VIEW REASONING ]                                      │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  THIS WEEK'S AI ACTIVITY                                       │
│                                                                │
│  Professional Search                     3 searches           │
│  Service Request Matching                1 match              │
│  Referral Recommendations               2 recommendations     │
│  Community Summary Generation           0 (opt-in)            │
│  Profile Insights Generation            1 (profile view)      │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  DATA USED BY AI AGENTS                                        │
│                                                                │
│  The following data is used for AI recommendations:            │
│                                                                │
│  ✓ Your professional profile (name, bar association, etc.)    │
│  ✓ Your practice areas and services                           │
│  ✓ Your location(s)                                           │
│  ✓ Your search queries (not stored permanently)               │
│  ✓ Your network (connections, followers)                      │
│  ✓ Your activity (discussions participated in)                │
│  ? Your past recommendations (optional, you can disable)       │
│  ? Community discussions (if summarization enabled)            │
│                                                                │
│  [ MANAGE DATA USAGE ]                                         │
│  [ VIEW DATA PRIVACY POLICY ]                                  │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  HOW AI AGENTS WORK                                            │
│                                                                │
│  Discovery Agent                                               │
│  └─ Understands your search query (natural language)          │
│  └─ Translates into searchable parameters                     │
│  └─ Searches professional graph                               │
│  └─ Returns explainable matches                               │
│                                                                │
│  Matching Agent                                                │
│  └─ Matches service requests to professionals                 │
│  └─ Considers availability, expertise, location               │
│  └─ Shows reasoning for each match                            │
│                                                                │
│  Recommendation Engine                                         │
│  └─ Suggests professionals based on network & practice area   │
│  └─ Shows reasons for suggestions                             │
│  └─ Does not create ranking or scoring                        │
│                                                                │
│  [ LEARN MORE ABOUT AI AGENTS ]                                │
│                                                                │
│  ─────────────────────────────────────────────────────────    │
│                                                                │
│  AI ACTIVITY PREFERENCES                                       │
│                                                                │
│  ☑ Show AI activity on this page                              │
│  ☑ Log search queries for improvement (can be deleted)         │
│  ☑ Allow AI to learn from my interactions                      │
│  ☐ Opt-out of all AI recommendations                          │
│                                                                │
│  [ SAVE PREFERENCES ]                                          │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**AI Behaviour:**
- AI activity is logged and shown to user
- User can see what data AI agents used
- User can disable specific AI features
- Transparency is the goal; no hidden operations

**User Actions:**
- [VIEW REASONING] → See detailed reasoning for a specific recommendation
- [MANAGE DATA USAGE] → Control which data AI agents can access
- [LEARN MORE ABOUT AI AGENTS] → Educational content on how AI works
- [SAVE PREFERENCES] → Update AI activity preferences

**Important UX Notes:**
- CRITICAL: This screen builds trust by showing AI operations
- All AI activity is logged and auditable
- User can opt-out of AI features, not just disable notifications
- Data usage is transparent (not hidden in privacy policy)
- Reasoning is shown in plain language, not technical jargon

---

## MOBILE ADAPTATIONS

### Bottom Navigation (Mobile)

```
┌────────────────────────────────────────┐
│         [Application Content]          │
├────────────────────────────────────────┤
│ Discover | Network | Services | Comm.  │
│  Profile                               │
└────────────────────────────────────────┘
```

**Tabs:**
- Discover: AI Home + AI Search
- Network: My Connections + Suggested
- Services: Find Services + My Service Requests
- Community: Discussions + Ask Network
- Profile: My Profile + Settings + Notifications (icon)

### Screen Adaptations (Mobile)

**Mobile AI Home:**
- Hero search input full-width
- Quick actions as 2-column grid (not linear)
- Recommendations shown as vertical cards (swipeable)
- Recent activity collapsed

**Mobile Professional Profile:**
- Photo at top, full-width
- Name and verification prominent
- Expertise stacked vertically
- Action buttons as full-width stack
- AI insights section collapsible

**Mobile AI Search Results:**
- Results as full-width cards (not side-by-side)
- "WHY THIS MATCH" section collapsible
- Vertical scroll, not horizontal
- Action buttons as row of smaller buttons or swipeable

**Mobile Messaging:**
- Conversation list full-width
- Single conversation view (no side panel)
- Message input sticky at bottom
- Swipe-to-reply (optional modern UX)

**Mobile Community:**
- Practice area tabs horizontally scrollable
- Discussions as cards with preview
- Discussion threads full-width
- Reply compose modal

---

## AI INTERACTION PATTERNS

### Pattern 1: Request Interpretation → Confirmation → Execution

```
User: "I need a criminal lawyer in Salem"
        ↓
AI: Interpret request (practice area, location, service type)
        ↓
Screen: Show AI understanding (practice area, location, etc.)
        ↓
User: Confirm or edit interpretation
        ↓
AI: Execute search with user-confirmed parameters
```

**Design Principle:** Never search without showing user what was understood.

### Pattern 2: Match Explanation

```
AI Result: Professional X matches your requirement
        ↓
Show: Explicit reasons (practice area ✓, location ✓, etc.)
        ↓
Show: Data gaps (availability unknown, not verified, etc.)
        ↓
User: Makes informed decision to connect/request
```

**Design Principle:** Every recommendation is explainable in human language.

### Pattern 3: Progressive Disclosure

```
Homepage: High-level actions (Find Professional, Ask Network)
        ↓
User selects action
        ↓
Detail screen: User provides specific requirements
        ↓
Interpretation screen: AI shows what it understood
        ↓
Results screen: User sees matches with reasoning
```

**Design Principle:** Information revealed at moment of relevance, not all upfront.

### Pattern 4: Opt-in, Not Opt-out

```
Default: AI features are ON (but user can disable)
        ↓
User can disable at two levels:
  • Disable specific feature (e.g., recommendations)
  • Disable AI entirely (settings)
        ↓
Disabling reverts to manual alternative
```

**Design Principle:** Users are always in control; no dark patterns.

---

## UX RISKS & MITIGATIONS

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **AI recommendations feel opaque** | Users distrust system; don't use AI search | Show explicit reasoning for every match; allow users to see AI reasoning |
| **AI hallucinations on recommendations** | False matches damage credibility | Ground all recommendations in structured data; no "confidence scores" or fake metrics |
| **Privacy concern: AI accessing profile data** | Users avoid AI features; retention drops | Transparent AI Activity screen; granular privacy controls; opt-out available |
| **Service requests go unanswered** | User gets no response; frustration | Track response time; show availability upfront; escalation options |
| **Network becomes spammy** | Users see too many referrals/requests | Cap request frequency; allow muting; moderation on community |
| **Verification becomes bottleneck** | Unverified users feel excluded | Show unverified profiles still; don't gate features; transparent timeline |
| **Community discussions fragment into Q&A** | No coherent knowledge base | Prefer existing discussions; merge duplicate questions; curate by topic |
| **Mobile experience is cluttered** | Users abandon mobile; desktop-only adoption | Ruthless simplification; bottom navigation is hero element |
| **AI profiling creates filter bubbles** | Users only see similar professionals | Recommendations show diversity; no algorithmic bubbles |
| **Lawyers feel system is replacing relationships** | Resistance to adoption | Frame AI as discovery tool; relationship-building is user's job |

---

## RECOMMENDED V1 FEATURE SET

**Screens to build in V1 (MVP):**

1. Welcome (Screen 1)
2. Signup (Screen 2)
3. Find Existing Profile (Screen 3)
4. Claim Profile (Screen 4)
5. AI-Assisted Profile Creation (Screen 5)
6. Professional Profile (Screen 6)
7. AI Home (Screen 7)
8. AI Search Interpretation (Screen 8)
9. AI Search Results (Screen 9)
10. Professional Network (Screen 10)
11. Services (Screen 11)
12. AI Service Matching (Screen 12)
13. Messaging (Screen 17)
14. Notifications (Screen 18)
15. Profile/Settings (Screen 19)
16. AI Activity/Transparency (Screen 20)

**Screens to defer to V2:**

- Community / Discussions (Screen 14) — requires moderation, can start with curated topics
- Ask the Network (Screen 15) — can use messaging for early feedback
- Community AI Summary (Screen 16) — non-critical feature
- Referral Assistant (Screen 13) — use messaging instead, formalize later

**Data model to prioritize:**

- Professional identity (name, bar assoc, enrollment)
- Practice areas (taxonomy of areas)
- Services (structured service types)
- Locations (geographic hierarchy: state → district → city)
- Courts (jurisdictional mapping)
- Availability (binary + response time)
- Connections (directed graph)

---

## CRITICAL UX ASSESSMENT

### What Feels Normal Directory?

- Professional profiles (Screen 6)
- Network view (Screen 10)
- Notifications (Screen 18)

These are expected; differentiation comes from **context** (how users discover professionals), not profile design itself.

### What Genuinely Feels AI-Native?

- **Screen 7 (AI Home):** "What do you need help with?" is the hero pattern. This is AI-native.
- **Screen 8 (AI Search Interpretation):** Showing user what AI understood before executing search is the trust pattern.
- **Screen 9 (AI Search Results):** Explainable reasoning for every match is the differentiator.
- **Screen 12 (AI Service Matching):** Matching service requirements to professionals with transparency is powerful.
- **Screen 20 (AI Activity):** Transparency log makes AI feel trustworthy, not creepy.

**Screens 7, 8, 9, 12, 20 are the product.**

### Where Is AI Unnecessary?

- Community discussions (Screen 14) — let lawyers talk freely
- Messaging (Screen 17) — 1-to-1 conversation, no AI needed
- Professional profiles (Screen 6) — user-generated data is authentic
- Settings (Screen 19) — straightforward preferences

AI adds friction here; remove it.

### Where Could AI Create Distrust?

- **Ratings/Scores:** Never show "4.8★ from 23 reviews". It's fake and undermines credibility.
- **Algorithmic ranking:** If top results are unexplained, users distrust system.
- **Hidden AI decisions:** If AI decides who sees what without transparency, it feels manipulative.
- **Auto-messaging:** If AI sends messages on user's behalf, it violates autonomy.

Mitigation: Always show reasoning, always require explicit user action, always allow opt-out.

### Strongest Product Differentiator?

**Screen 8 + Screen 9 (AI Search Interpretation + Explainable Results)**

This is the core insight: AI understands natural language requirements better than filters/keywords, but only if reasoning is transparent. A lawyer can type "I need a local counsel in Madurai for a complex property dispute" and the system shows "AI matched: Property Law + Madurai + District Court (inferred) + Service: Local Counsel" and then "Here's who matches with reasons."

No other legal professional network does this well. Most force users to navigate taxonomies and filters.

### Screen That Feels Too Complicated?

**Screen 16 (Community AI Summary)**

The disclaimer + key observations + differing viewpoints structure is nuanced. Mobile might struggle with this. **Recommendation:** Defer to V2 or simplify to "Top points" + "Experts to follow" only.

### Features to Remove from V1?

1. **Referral Assistant (Screen 13):** Too niche for V1. Use messaging instead; formalize workflow in V2.
2. **Community AI Summary (Screen 16):** Non-critical feature; summary can be simpler in V1.
3. **Ask the Network (Screen 15):** Can use messaging + simple discussion posts instead; don't build separate Q&A system.
4. **AI Activity log (Screen 20):** Important for trust but complex. Can be simpler: "Here's what AI searched today" without full reasoning logs.

**Rationale:** Faster to ship, easier to iterate, fewer integrations needed.

### Fastest Path to Demonstrating Value?

1. **Build Screens 1-10** (Welcome → Signup → Profile → AI Home → AI Search → Network)
2. **Seed 100-200 verified professionals** (manually curated from directory)
3. **Test with 20-50 early adopters** (existing bar associations or referral networks)
4. **Measure:** Can users find someone relevant in 2-3 searches?
5. **Iterate on Screens 7-9** (AI search UX) based on feedback

**Timeline:** 8-12 weeks for functional MVP. Screens 11-20 are iterative.

### What Makes Lawyers Return Weekly?

1. **Service requests** (Screens 11-12): "Someone needs my help" drives engagement.
2. **Referral opportunities** (via messaging): Getting referrals for the work they do.
3. **Professional network discovery** (Screen 10): Finding peers, especially specialists.
4. **Real professionals** (not bot-inflated): Trust that connections are genuine.

Not: Notifications, gamification, trending, social features.

### What Makes Lawyers Refuse to Use It?

1. **Unverified profiles mixed with verified**: If spammers or fake lawyers appear, they leave.
2. **AI making decisions for them**: If system auto-contacts people or sends messages, they reject it.
3. **Algorithmic opacity**: If they can't understand why someone was recommended, they lose trust.
4. **Service requests that go unanswered**: If people don't respond, the network feels dead.
5. **Privacy violations**: If they discover AI is using their data in ways they didn't consent to.

**Mitigations:** Mandatory verification, explicit user action for all AI outputs, transparent reasoning, response-time tracking, granular privacy controls.

---

## FINAL UX ASSESSMENT

### What Works

1. **Natural language discovery (Screens 7-9)** is genuinely novel in legal professional networks. The "What do you need?" → "Here's why they match" flow is intuitive.

2. **Explainable AI (Screens 8, 9, 12)** is the trust multiplier. Lawyers are trained to evaluate reasoning; showing reasoning makes them confident in recommendations.

3. **Professional profile (Screen 6)** is clean and serviceable. The AI Insights section is well-separated; doesn't feel like AI is inventing data.

4. **Messaging + Service requests (Screens 11-12, 17)** are transactional and clear. No ambiguity about next steps.

5. **Transparency log (Screen 20)** addresses the elephant in the room: "What is this AI doing with my data?" Answering that explicitly is differentiating.

### What Needs Refinement

1. **Community (Screen 14)** needs stronger moderation framework if discussions are to remain credible. Defer or add moderation.

2. **AI Activity log (Screen 20)** might be overwhelming on first visit. Simplify to "What AI did today" without full reasoning chain.

3. **Mobile bottom navigation** assumes 5 tabs fit; test on actual devices. May need to collapse into 4 tabs + more menu.

4. **Referral Assistant (Screen 13)** duplicates Service Matching logic. Consolidate in V1.

5. **Search Results (Screen 9)** show 3 professionals per screen; needs "Load More" or pagination. Design for 7-10 results gracefully.

### Why This Works as an AI-Native Product

- **AI is integrated, not bolted on:** AI search, AI service matching, AI recommendations are primary workflows. It's not "search + AI chatbot on the side."
- **AI is transparent:** Every recommendation shows reasoning. No opaque ranking.
- **AI is subordinate:** Humans make decisions. AI suggests. This respect for agency is critical for lawyers.
- **AI solves the discovery problem:** Finding the right lawyer in a professional network is hard; AI makes it natural-language-driven.
- **AI unlocks efficiency:** Service matching that currently happens via phone calls (vetting lawyers in your network) is now instant.

The product is not "an AI that talks about law." It's "a professional network where AI understands what you need and helps you find the right person."

---

## DESIGN SYSTEM SUMMARY

**Color:**
- Primary (#0D47A1), Secondary (#546E7A), AI Accent (#1565C0)
- Verification badge (#2E7D32)
- Clean background (#FAFAFA), white surfaces

**Typography:**
- Inter or Segoe UI throughout
- Max 2 sizes per section (reduce visual noise)
- High contrast text, generous line-height

**Components:**
- Buttons (4 variants: Primary, Secondary, Tertiary, Danger, AI Action)
- Professional cards (name, role, practice area, location, action buttons)
- AI insight component (reasoning, data gaps, match strength)
- Service cards, discussion cards (all text-based, scannable)

**Layout:**
- 2-column desktop (sidebar + main) for messaging, full-width otherwise
- Generous whitespace, dense information hierarchy
- Bottom navigation mobile (5 tabs max)

---

**END OF DESIGN DOCUMENT**

This design is built for **clarity, trust, and agency**. Every AI decision is shown to the user. Every user action is explicit. Every screen serves a specific professional workflow. No gamification, no social features, no fake engagement metrics—just a professional network that works like a smart colleague who knows who can help.
