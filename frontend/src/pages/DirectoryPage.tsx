import React, { useEffect, useState } from 'react'
import { MapPin, CheckCircle, Award } from 'lucide-react'
import { DirectoryRecord } from '@/types'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/Button'
import { CardHighlightedTable, ColumnDef } from '@/components/tables/CardHighlightedTable'
import { StatusBadge } from '@/components/ui/StatusBadge'

export const DirectoryPage: React.FC = () => {
  const [records, setRecords] = useState<DirectoryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRecord, setSelectedRecord] = useState<DirectoryRecord | null>(null)
  const [claimSuccess, setClaimSuccess] = useState(false)

  useEffect(() => {
    fetchDirectory()
  }, [])

  const fetchDirectory = async () => {
    try {
      setLoading(true)
      const res = await api.get('/directory', { params: { limit: 50 } })
      setRecords(res.data)
    } catch (err) {
      console.error('Error fetching directory records', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClaim = (record: DirectoryRecord) => {
    setSelectedRecord(record)
  }

  const submitClaim = async () => {
    if (!selectedRecord) return
    try {
      await api.post(`/directory/${selectedRecord.id}/claim`, {
        full_name: selectedRecord.full_name,
        enrollment_number: selectedRecord.enrollment_number,
      })
      setClaimSuccess(true)
      setTimeout(() => {
        setClaimSuccess(false)
        setSelectedRecord(null)
        fetchDirectory()
      }, 2000)
    } catch (err) {
      console.error('Claim submission failed', err)
    }
  }

  const columns: ColumnDef<DirectoryRecord>[] = [
    {
      id: 'full_name',
      header: 'Advocate Name',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-[#E8F0FE] text-[#1A73E8] font-bold flex items-center justify-center mr-3 text-xs border border-[#1A73E8]/20 shrink-0">
            {row.full_name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-[#202124] text-xs flex items-center gap-1.5">
              {row.full_name}
              {row.is_claimed && (
                <span title="Verified Bar Member">
                  <Award className="w-3.5 h-3.5 text-[#34A853]" />
                </span>
              )}
            </div>
            <div className="text-[11px] text-[#5F6368]">Madras High Court Bar</div>
          </div>
        </div>
      ),
    },
    {
      id: 'enrollment_number',
      header: 'Enrollment No',
      sortable: true,
      cell: (row) => (
        <span className="font-mono text-xs font-semibold text-[#202124] bg-[#F1F3F4] px-2 py-0.5 rounded border border-[#DADCE0]">
          {row.enrollment_number}
        </span>
      ),
    },
    {
      id: 'district',
      header: 'District / Association',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="flex items-center text-xs text-[#202124] font-medium">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#C70234]" />
            {row.district || 'Tamil Nadu'}
          </div>
          {row.bar_association_name && (
            <div className="text-[11px] text-[#80868B] mt-0.5">{row.bar_association_name}</div>
          )}
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        row.is_claimed ? (
          <StatusBadge color="green" dot>
            Claimed & Verified
          </StatusBadge>
        ) : (
          <StatusBadge color="blue" dot>
            Public Record
          </StatusBadge>
        )
      ),
    },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Info */}
      <div className="border-b border-[#DADCE0] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C70234] bg-[#FCE8EF] px-2 py-0.5 rounded border border-[#C70234]/20">
            01 · BAR ROLLS
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#80868B]">
            PUBLIC ADVOCATE DIRECTORY
          </span>
        </div>
        <h1 className="text-3xl font-editorial text-[#202124] font-normal tracking-tight">
          Tamil Nadu Advocate <span className="italic font-serif text-[#C70234]">Directory</span>
        </h1>
        <p className="text-xs text-[#5F6368] mt-1">
          Official Tamil Nadu Bar Council enrollments with verified status, bar affiliations, and deterministic identity verification.
        </p>
      </div>

      {/* CardHighlightedTable */}
      <CardHighlightedTable
        title="Bar Council Enrollment Registry"
        subtitle="Individual card-highlighted records with verified credentials and claim actions"
        columns={columns}
        data={records}
        headerTheme="crimson"
        getRowIndicatorColor={(row) => (row.is_claimed ? 'green' : 'blue')}
        isLoading={loading}
        searchPlaceholder="Filter by advocate name, enrollment no, district..."
        rowActions={(row) => (
          row.is_claimed ? (
            <Button variant="secondary" size="sm" className="h-7 text-xs">
              View Profile
            </Button>
          ) : (
            <Button
              size="sm"
              variant="brand"
              onClick={() => handleClaim(row)}
              className="h-7 text-xs font-semibold"
            >
              Claim Profile
            </Button>
          )
        )}
      />

      {/* Claim Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-[#202124]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#DADCE0] shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#FCE8EF] text-[#C70234] flex items-center justify-center font-bold text-sm">
                ⚖
              </span>
              <h3 className="text-base font-bold text-[#202124]">Claim Profile Verification</h3>
            </div>
            <p className="text-xs text-[#5F6368]">
              Are you claiming the profile of <b className="text-[#202124]">{selectedRecord.full_name}</b> (Enrollment:{' '}
              <span className="font-mono text-[#1A73E8] font-semibold">{selectedRecord.enrollment_number}</span>)?
            </p>

            <div className="bg-[#FEF7E0] border border-[#FBBC05]/40 text-[#B06000] p-3.5 rounded-xl text-xs">
              <span className="font-bold block mb-1">Deterministic Verification Notice:</span>
              Upload of Bar Council ID or Certificate of Practice will be required upon submission to establish verified status.
            </div>

            {claimSuccess ? (
              <div className="bg-[#E6F4EA] border border-[#34A853]/30 text-[#188038] p-3 rounded-xl text-xs flex items-center font-medium">
                <CheckCircle className="w-4 h-4 mr-2 text-[#34A853]" />
                Profile claimed successfully! Redirecting...
              </div>
            ) : (
              <div className="flex items-center justify-end space-x-2 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setSelectedRecord(null)}>
                  Cancel
                </Button>
                <Button variant="brand" size="sm" onClick={submitClaim}>
                  Confirm & Claim
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
