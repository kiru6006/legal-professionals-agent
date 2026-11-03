import React, { useEffect, useState } from 'react'
import { Search, ShieldCheck, MapPin, CheckCircle } from 'lucide-react'
import { DirectoryRecord } from '@/types'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/Button'

export const DirectoryPage: React.FC = () => {
  const [records, setRecords] = useState<DirectoryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<DirectoryRecord | null>(null)
  const [claimSuccess, setClaimSuccess] = useState(false)

  useEffect(() => {
    fetchDirectory()
  }, [])

  const fetchDirectory = async () => {
    try {
      setLoading(true)
      const res = await api.get('/directory', { params: { limit: 20 } })
      setRecords(res.data)
    } catch (err) {
      console.error('Error fetching directory records', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClaim = async (record: DirectoryRecord) => {
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

  const filtered = records.filter(
    (r) =>
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      r.enrollment_number.toLowerCase().includes(search.toLowerCase()) ||
      (r.district && r.district.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D9D7D0] pb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#929292] mb-1">
            01 · BAR ROLLS & DIRECTORY
          </div>
          <h1 className="text-3xl font-editorial text-[#171717] font-normal tracking-tight">
            Tamil Nadu Advocate <span className="italic font-serif">Directory</span>
          </h1>
          <p className="text-xs text-[#686868] mt-1">
            Over 30,000 public advocate enrollment records. Find your record to claim and verify your profile.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name, roll no, district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#FFFFFF] border border-[#D9D7D0] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#111111] text-[#171717] placeholder-[#929292]"
          />
          <Search className="w-4 h-4 text-[#929292] absolute left-3 top-3" />
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-[#FFFFFF] border border-[#D9D7D0] rounded-xl overflow-hidden shadow-xs">
        <table className="min-w-full divide-y divide-[#D9D7D0] text-xs">
          <thead className="bg-[#F0EFEA] text-[#171717] font-bold text-[10px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3.5 text-left">Advocate Name</th>
              <th className="px-6 py-3.5 text-left">Enrollment No</th>
              <th className="px-6 py-3.5 text-left">District / Association</th>
              <th className="px-6 py-3.5 text-left">Status</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9D7D0] text-[#686868]">
            {filtered.map((record) => (
              <tr key={record.id} className="hover:bg-[#F0EFEA] transition-colors">
                <td className="px-6 py-4 font-semibold text-[#171717] flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#F0EFEA] border border-[#D9D7D0] flex items-center justify-center font-bold text-[#171717] mr-3 text-xs">
                    {record.full_name.charAt(0)}
                  </div>
                  {record.full_name}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-[#171717]">{record.enrollment_number}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-xs text-[#686868]">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#929292]" />
                    {record.district || 'Tamil Nadu'}
                  </div>
                  {record.bar_association_name && (
                    <div className="text-[11px] text-[#929292] mt-0.5">{record.bar_association_name}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {record.is_claimed ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F0EFEA] text-[#2F6B4F] border border-[#D9D7D0]">
                      <ShieldCheck className="w-3 h-3 mr-1 text-[#2F6B4F]" />
                      Claimed & Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#F0EFEA] text-[#929292] border border-[#D9D7D0]">
                      Unclaimed
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {record.is_claimed ? (
                    <Button variant="secondary" size="sm" className="text-xs">
                      View Profile
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleClaim(record)}
                      className="text-xs"
                    >
                      Claim Profile
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && !loading && (
          <div className="p-8 text-center text-[#929292] text-xs">No advocate records found matching your query.</div>
        )}
      </div>

      {/* Claim Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] rounded-xl max-w-md w-full p-6 space-y-4 border border-[#D9D7D0] shadow-lg">
            <h3 className="text-base font-bold text-[#171717]">Claim Profile Verification</h3>
            <p className="text-xs text-[#686868]">
              Are you claiming the profile of <b>{selectedRecord.full_name}</b> (Enrollment:{' '}
              <span className="font-mono text-[#171717]">{selectedRecord.enrollment_number}</span>)?
            </p>

            <div className="bg-[#F0EFEA] border border-[#D9D7D0] text-[#9A6A16] p-3.5 rounded-lg text-xs">
              <span className="font-bold block mb-1">Deterministic Verification Notice:</span>
              Upload of Bar Council ID or Certificate of Practice will be required upon submission to establish verified status.
            </div>

            {claimSuccess ? (
              <div className="bg-[#F0EFEA] border border-[#D9D7D0] text-[#2F6B4F] p-3 rounded-lg text-xs flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-[#2F6B4F]" />
                Profile claimed successfully! Redirecting...
              </div>
            ) : (
              <div className="flex items-center justify-end space-x-2 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setSelectedRecord(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={submitClaim}>
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
