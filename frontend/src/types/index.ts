export interface District {
  id: string
  name: string
  state: string
}

export interface Court {
  id: string
  name: string
  court_type: string
  district_id?: string
}

export interface PracticeArea {
  id: string
  name: string
  category: string
  description?: string
}

export interface Service {
  id: string
  name: string
  category: string
  description?: string
}

export interface DirectoryRecord {
  id: string
  full_name: string
  enrollment_number: string
  year_of_enrollment?: number
  bar_association_name?: string
  district?: string
  state: string
  status: string
  is_claimed: boolean
  is_verified: boolean
}

export interface ProfessionalProfile {
  id: string
  user_id: string
  directory_record_id?: string
  full_name: string
  enrollment_number?: string
  designation?: string
  primary_district?: string
  years_of_experience?: number
  office_address?: string
  bio?: string
  phone?: string
  email?: string
  is_phone_verified: boolean
  is_email_verified: boolean
  is_bar_verified: boolean
  verification_tier: string
  practice_areas: {
    id: string
    name: string
    is_primary: boolean
    years_experience?: number
  }[]
  courts: {
    id: string
    name: string
    court_type: string
    is_regular_appearance: boolean
  }[]
  services: {
    id: string
    name: string
    description?: string
    is_active: boolean
  }[]
}

export interface GroundingReason {
  claim: string
  source_field: string
  verified: boolean
}

export interface RecommendedCandidate {
  profile_id: string
  full_name: string
  enrollment_number?: string
  primary_district?: string
  years_of_experience?: number
  confidence_score: number
  confidence_tier: 'HIGH' | 'MEDIUM' | 'LOW'
  matching_practice_areas: string[]
  matching_courts: string[]
  matching_services: string[]
  grounding_reasons: GroundingReason[]
  information_gaps: string[]
  is_bar_verified: boolean
}

export interface DiscoveryResponse {
  query: string
  interpreted_intent: {
    raw_query: string
    practice_areas: string[]
    court_names: string[]
    districts: string[]
    service_names: string[]
    min_experience_years?: number
    urgency_tier: string
    reasoning_summary: string
  }
  total_matches: number
  candidates: RecommendedCandidate[]
  search_mode: string
}
