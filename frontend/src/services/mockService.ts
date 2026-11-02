import { DirectoryRecord } from '@/types'
import { MOCK_DIRECTORY_RECORDS, MOCK_PROFILES, MockProfileDetail } from '@/data/mockData'

// In-memory mutable copy of directory records so claims persist in browser session
let directoryRecords = [...MOCK_DIRECTORY_RECORDS]
const profilesMap: Record<string, MockProfileDetail> = { ...MOCK_PROFILES }

export const mockService = {
  // 1. Directory list
  getDirectory(params?: { limit?: number; q?: string }): DirectoryRecord[] {
    const q = (params?.q || '').toLowerCase().trim()
    let results = directoryRecords

    if (q) {
      results = results.filter(
        (r) =>
          r.full_name.toLowerCase().includes(q) ||
          r.enrollment_number.toLowerCase().includes(q) ||
          (r.district && r.district.toLowerCase().includes(q)) ||
          (r.bar_association_name && r.bar_association_name.toLowerCase().includes(q))
      )
    }

    if (params?.limit && params.limit > 0) {
      results = results.slice(0, params.limit)
    }
    return results
  },

  // 2. Claim Directory Record
  claimRecord(id: string, _payload?: { full_name?: string; enrollment_number?: string }) {
    const recordIndex = directoryRecords.findIndex((r) => r.id === id)
    if (recordIndex !== -1) {
      directoryRecords[recordIndex] = {
        ...directoryRecords[recordIndex],
        is_claimed: true,
        is_verified: true,
      }
      return {
        success: true,
        message: `Profile ${directoryRecords[recordIndex].full_name} claimed successfully`,
        record: directoryRecords[recordIndex],
      }
    }
    return {
      success: true,
      message: 'Claim recorded successfully',
    }
  },

  // 3. Get full profile details for modal / card
  getProfile(profileId: string): MockProfileDetail {
    if (profilesMap[profileId]) {
      return profilesMap[profileId]
    }

    // Try matching directory record ID or enrollment number
    const dirRecord = directoryRecords.find(
      (r) => r.id === profileId || r.enrollment_number === profileId
    )

    if (dirRecord) {
      const generated: MockProfileDetail = {
        id: dirRecord.id,
        full_name: dirRecord.full_name,
        designation: dirRecord.year_of_enrollment && dirRecord.year_of_enrollment < 2012 ? 'Senior Advocate' : 'Advocate',
        enrollment_number: dirRecord.enrollment_number,
        is_verified: dirRecord.is_verified,
        years_of_experience: dirRecord.year_of_enrollment ? Math.max(1, 2026 - dirRecord.year_of_enrollment) : 10,
        headline: `Legal Counsel & Advocate at ${dirRecord.district || 'Tamil Nadu'} Bar`,
        bio: `Enrolled in ${dirRecord.year_of_enrollment || 2015} with the ${dirRecord.bar_association_name}. Actively handling trial, appellate, and advisory matters in ${dirRecord.district || 'Tamil Nadu'} with verified bar credentials.`,
        district: {
          id: `dist-${dirRecord.district?.toLowerCase() || 'tn'}`,
          name: dirRecord.district || 'Tamil Nadu',
          state: 'Tamil Nadu',
        },
        languages: ['Tamil', 'English'],
        practice_areas: [
          {
            practice_area: { id: 'pa-gen', name: 'Civil & Criminal Litigation', description: 'Comprehensive litigation and trial defense' },
            is_primary: true,
            years_focused: dirRecord.year_of_enrollment ? Math.max(1, 2026 - dirRecord.year_of_enrollment) : 8,
          },
          {
            practice_area: { id: 'pa-prop', name: 'Property & Real Estate Law', description: 'Title search, deeds, and partitions' },
            is_primary: false,
            years_focused: 5,
          },
        ],
        courts: [
          {
            court: { id: `c-${dirRecord.id}`, name: `${dirRecord.district || 'District'} Principal Court`, court_type: 'District' },
            is_regular: true,
          },
          {
            court: { id: 'c-hc', name: 'Madras High Court', court_type: 'High Court' },
            is_regular: false,
          },
        ],
        services: [
          {
            service: { id: 'svc-app', title: 'Court Appearance & Representation', category: 'Litigation', slug: 'court-appearance' },
            details: 'Trial court hearings, bail petitions, and interim injunction motions.',
            is_active: true,
          },
          {
            service: { id: 'svc-opin', title: 'Legal Notice & Legal Opinion', category: 'Advisory', slug: 'legal-opinion' },
            details: 'In-depth statutory interpretation and formal title opinion issuance.',
            is_active: true,
          },
        ],
        contact_info: {
          phone: '+91 94432 00000',
          email: `${dirRecord.full_name.toLowerCase().replace(/[^a-z]/g, '')}@lawchamber.in`,
          is_masked: false,
        },
      }
      profilesMap[profileId] = generated
      return generated
    }

    // Default fallback
    return {
      id: profileId,
      full_name: 'Advocate Legal Practitioner',
      designation: 'Advocate',
      enrollment_number: 'TN/1234/2015',
      is_verified: true,
      years_of_experience: 11,
      headline: 'Advocate & Legal Consultant — Tamil Nadu Bar',
      bio: 'Practicing advocate representing individual and corporate clients in civil, criminal, and commercial matters across Tamil Nadu.',
      district: { id: 'd-tn', name: 'Chennai', state: 'Tamil Nadu' },
      languages: ['Tamil', 'English'],
      practice_areas: [
        {
          practice_area: { id: 'pa-1', name: 'Civil Litigation' },
          is_primary: true,
          years_focused: 11,
        },
      ],
      courts: [
        { court: { id: 'c-1', name: 'Madras High Court', court_type: 'High Court' }, is_regular: true },
      ],
      services: [
        {
          service: { id: 's-1', title: 'Court Appearance & Filing', category: 'Litigation', slug: 'court-appearance' },
          details: 'Prompt court appearances and status updates.',
          is_active: true,
        },
      ],
      contact_info: {
        phone: '+91 98840 12345',
        email: 'counsel@tamilnadubar.org',
        is_masked: false,
      },
    }
  },

  // 4. Natural language AI Ask Network
  askNetwork(query: string, _includeUnclaimed = true) {
    const qLower = query.toLowerCase()

    // Location detection
    let detectedDistrict = 'Tamil Nadu'
    const districts = [
      'Salem',
      'Chennai',
      'Coimbatore',
      'Madurai',
      'Trichy',
      'Tiruchirappalli',
      'Tirunelveli',
      'Erode',
      'Vellore',
      'Thanjavur',
      'Kanchipuram',
      'Dindigul',
      'Karur',
      'Namakkal',
      'Tiruppur',
      'Cuddalore',
    ]

    for (const d of districts) {
      if (qLower.includes(d.toLowerCase())) {
        detectedDistrict = d === 'Tiruchirappalli' ? 'Trichy' : d
        break
      }
    }

    // Practice area detection
    let detectedPA = 'Civil Litigation'
    if (qLower.includes('crim') || qLower.includes('bail') || qLower.includes('ndps') || qLower.includes('murder') || qLower.includes('police')) {
      detectedPA = 'Criminal Law'
    } else if (qLower.includes('prop') || qLower.includes('land') || qLower.includes('real estate') || qLower.includes('patta') || qLower.includes('partition')) {
      detectedPA = 'Property & Real Estate'
    } else if (qLower.includes('corp') || qLower.includes('arbitrat') || qLower.includes('company') || qLower.includes('commercial') || qLower.includes('contract')) {
      detectedPA = 'Corporate & Commercial'
    } else if (qLower.includes('divorce') || qLower.includes('matrimon') || qLower.includes('custody') || qLower.includes('maintenance') || qLower.includes('family')) {
      detectedPA = 'Family & Matrimonial'
    } else if (qLower.includes('writ') || qLower.includes('constitut') || qLower.includes('habeas') || qLower.includes('quash')) {
      detectedPA = 'Constitutional Law'
    } else if (qLower.includes('bank') || qLower.includes('drt') || qLower.includes('ibbi') || qLower.includes('nclt') || qLower.includes('sarfaesi')) {
      detectedPA = 'Banking & Insolvency'
    } else if (qLower.includes('tax') || qLower.includes('gst') || qLower.includes('income tax')) {
      detectedPA = 'Taxation & GST'
    } else if (qLower.includes('cyber') || qLower.includes('trademark') || qLower.includes('patent') || qLower.includes('ipr')) {
      detectedPA = 'Cyber Law & IP'
    }

    // Court detection
    let detectedCourt = 'Principal District & Sessions Court'
    if (qLower.includes('high court') || qLower.includes('madras high') || qLower.includes('appellate')) {
      detectedCourt = 'Madras High Court'
    } else if (qLower.includes('madurai bench')) {
      detectedCourt = 'Madurai Bench of Madras High Court'
    } else if (qLower.includes('drt') || qLower.includes('debt recovery')) {
      detectedCourt = 'Debts Recovery Tribunal (DRT)'
    } else if (qLower.includes('nclt')) {
      detectedCourt = 'National Company Law Tribunal (NCLT)'
    } else if (qLower.includes('family court')) {
      detectedCourt = 'Principal Family Court'
    } else if (qLower.includes('magistrate')) {
      detectedCourt = 'Judicial Magistrate Court'
    }

    // Service detection
    let detectedService = 'Court Appearance & Representation'
    if (qLower.includes('bail') || qLower.includes('anticipatory')) {
      detectedService = 'Bail Application & Anticipatory Bail'
    } else if (qLower.includes('local counsel') || qLower.includes('passover') || qLower.includes('adjournment') || qLower.includes('cross-border')) {
      detectedService = 'Local Counsel & Cross-Border Appearance'
    } else if (qLower.includes('title') || qLower.includes('search report') || qLower.includes('due diligence')) {
      detectedService = 'Title Due Diligence & Search Report'
    } else if (qLower.includes('caveat')) {
      detectedService = 'Caveat Petition Filing'
    } else if (qLower.includes('draft') || qLower.includes('opinion')) {
      detectedService = 'Legal Opinion & Drafting'
    }

    // Match profiles
    const allProfileList = Object.values(profilesMap)

    const scored = allProfileList.map((p) => {
      let score = 0
      const reasons: string[] = []

      // Location match
      if (detectedDistrict !== 'Tamil Nadu') {
        if (p.district?.name.toLowerCase() === detectedDistrict.toLowerCase()) {
          score += 45
          reasons.push(`Resident practitioner in ${p.district?.name} jurisdiction`)
        } else if (detectedCourt.includes('High Court') && p.district?.name === 'Chennai') {
          score += 35
          reasons.push(`Practices before Madras High Court with physical Chennai chambers`)
        }
      } else {
        score += 20
        reasons.push(`Active advocate in ${p.district?.name || 'Tamil Nadu'} Bar`)
      }

      // Practice Area match
      const matchingPA = p.practice_areas?.find(
        (pa) =>
          pa.practice_area.name.toLowerCase().includes(detectedPA.toLowerCase()) ||
          detectedPA.toLowerCase().includes(pa.practice_area.name.toLowerCase())
      )

      if (matchingPA) {
        score += 40
        reasons.push(`${matchingPA.is_primary ? 'Primary' : 'Extensive'} practice in ${matchingPA.practice_area.name} (${matchingPA.years_focused} years)`)
      } else if (p.headline?.toLowerCase().includes(detectedPA.toLowerCase())) {
        score += 30
        reasons.push(`Demonstrated litigation focus in ${detectedPA}`)
      }

      // Court match
      const matchingCourt = p.courts?.find((c) =>
        c.court.name.toLowerCase().includes(detectedCourt.toLowerCase().split(' ')[0])
      )
      if (matchingCourt) {
        score += 25
        reasons.push(`Regular designated appearance in ${matchingCourt.court.name}`)
      }

      // Verified bar bonus
      if (p.is_verified) {
        score += 15
        reasons.push(`Bar Council verified enrollment: ${p.enrollment_number}`)
      }

      // Experience bonus
      if (p.years_of_experience >= 10) {
        score += 10
        reasons.push(`Senior standing with ${p.years_of_experience} years of continuous bar experience`)
      }

      return {
        profile: p,
        score,
        reasons,
      }
    })

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score)

    // Select candidates (top 5)
    let candidates = scored.slice(0, 5)

    // Fallback if none scored high: take all profiles sorted by experience
    if (candidates.length === 0 || candidates[0].score < 20) {
      candidates = scored.slice(0, 4)
    }

    const recommendations = candidates.map(({ profile: p, score, reasons }) => {
      const confidence: 'HIGH' | 'MEDIUM' | 'LOW' = score >= 60 ? 'HIGH' : score >= 35 ? 'MEDIUM' : 'LOW'
      return {
        profile_id: p.id,
        full_name: p.full_name,
        enrollment_number: p.enrollment_number,
        district: p.district?.name || 'Chennai',
        years_experience: p.years_of_experience,
        confidence,
        primary_court: p.courts?.[0]?.court.name || detectedCourt,
        match_reasons: reasons.length > 0 ? reasons : [
          `Verified advocate in ${p.district?.name || 'Tamil Nadu'} Bar Council records`,
          `Regular appearances in district and appellate courts`,
          `Available for direct legal representation and consultation`,
        ],
        missing_information: ['Daily court appearance calendar availability subject to confirmation via messaging'],
        is_verified: p.is_verified,
      }
    })

    return {
      parsed_parameters: {
        location: detectedDistrict !== 'Tamil Nadu' ? `${detectedDistrict}, Tamil Nadu` : 'Tamil Nadu',
        practice_area: detectedPA,
        court: detectedCourt,
        service_required: detectedService,
      },
      recommendations,
    }
  },

  // 5. Extract structured legal profile from bio text
  extractProfile(rawText: string) {
    const text = rawText.trim()
    const tLower = text.toLowerCase()

    // Practice areas extraction
    const detectedPracticeAreas: string[] = []
    if (tLower.includes('crim') || tLower.includes('bail') || tLower.includes('ndps') || tLower.includes('ipc')) {
      detectedPracticeAreas.push('Criminal Defense & Trial')
    }
    if (tLower.includes('civil') || tLower.includes('appeal') || tLower.includes('injunction') || tLower.includes('suit')) {
      detectedPracticeAreas.push('Civil Litigation & Appeals')
    }
    if (tLower.includes('writ') || tLower.includes('constitut') || tLower.includes('habeas')) {
      detectedPracticeAreas.push('Constitutional & Writ Practice')
    }
    if (tLower.includes('property') || tLower.includes('real estate') || tLower.includes('patta') || tLower.includes('title')) {
      detectedPracticeAreas.push('Property & Real Estate Law')
    }
    if (tLower.includes('corp') || tLower.includes('commercial') || tLower.includes('company') || tLower.includes('arbitrat')) {
      detectedPracticeAreas.push('Corporate & Commercial Law')
    }
    if (tLower.includes('family') || tLower.includes('divorce') || tLower.includes('matrimon')) {
      detectedPracticeAreas.push('Family & Matrimonial Law')
    }
    if (tLower.includes('tax') || tLower.includes('gst')) {
      detectedPracticeAreas.push('Taxation & GST Law')
    }
    if (detectedPracticeAreas.length === 0) {
      detectedPracticeAreas.push('General Civil & Criminal Litigation')
    }

    // Court extraction
    const detectedCourts: string[] = []
    if (tLower.includes('madras high court') || tLower.includes('high court')) {
      detectedCourts.push('Madras High Court (Principal Seat, Chennai)')
    }
    if (tLower.includes('madurai bench')) {
      detectedCourts.push('Madras High Court (Madurai Bench)')
    }
    if (tLower.includes('district court') || tLower.includes('sessions')) {
      detectedCourts.push('Principal District & Sessions Court')
    }
    if (tLower.includes('drt') || tLower.includes('debt recovery')) {
      detectedCourts.push('Debts Recovery Tribunal (DRT)')
    }
    if (tLower.includes('nclt')) {
      detectedCourts.push('National Company Law Tribunal (NCLT)')
    }
    if (tLower.includes('family court')) {
      detectedCourts.push('Principal Family Court')
    }
    if (detectedCourts.length === 0) {
      detectedCourts.push('Principal District & Sessions Court', 'Madras High Court')
    }

    // Services extraction
    const detectedServices: string[] = []
    if (tLower.includes('appearance') || tLower.includes('appear') || tLower.includes('local')) {
      detectedServices.push('Court Appearance & Representation')
    }
    if (tLower.includes('caveat')) {
      detectedServices.push('Caveat Petition Filing')
    }
    if (tLower.includes('opinion') || tLower.includes('advisory')) {
      detectedServices.push('Legal Opinion & Statutory Interpretation')
    }
    if (tLower.includes('bail')) {
      detectedServices.push('Bail & Anticipatory Bail Application')
    }
    if (tLower.includes('draft') || tLower.includes('pleading')) {
      detectedServices.push('Pleadings & Contract Drafting')
    }
    if (detectedServices.length === 0) {
      detectedServices.push('Court Appearance & Representation', 'Legal Opinion & Advisory')
    }

    // Years of experience estimation
    let years = 10
    const yearMatch = text.match(/(\d+)\+?\s*years?/i)
    if (yearMatch) {
      years = parseInt(yearMatch[1], 10)
    } else {
      const sinceMatch = text.match(/since\s*(19\d\d|20\d\d)/i)
      if (sinceMatch) {
        years = Math.max(1, 2026 - parseInt(sinceMatch[1], 10))
      }
    }

    // Name extraction
    let name = 'Advocate Legal Practitioner'
    const nameMatch = text.match(/(?:adv\.?|advocate)\s+([a-zA-Z\.\s]{3,30})/i)
    if (nameMatch) {
      name = `Adv. ${nameMatch[1].trim()}`
    }

    return {
      extracted_draft: {
        full_name: name,
        years_of_experience: years,
        headline: `${detectedPracticeAreas[0]} Practitioner | ${detectedCourts[0]}`,
        bio: text.slice(0, 320) + (text.length > 320 ? '...' : ''),
        practice_areas: detectedPracticeAreas,
        court_names: detectedCourts,
        service_names: detectedServices,
      },
    }
  },
}
