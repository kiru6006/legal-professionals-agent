import React, { useEffect, useState } from 'react'
import { Scale, Search, ShieldCheck, MapPin, CheckCircle, ExternalLink } from 'lucide-react'
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tamil Nadu Advocate Directory</h1>
          <p className="text-sm text-slate-500">
            Over 30,000 public advocate enrollment records. Find your name to claim and verify your profile.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name, roll no, district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3.5 text-left">Advocate Name</th>
              <th className="px-6 py-3.5 text-left">Enrollment No</th>
              <th className="px-6 py-3.5 text-left">District / Association</th>
              <th className="px-6 py-3.5 text-left">Status</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 mr-3 text-xs">
                    {record.full_name.charAt(0)}
                  </div>
                  {record.full_name}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-600">{record.enrollment_number}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {record.district || 'Tamil Nadu'}
                  </div>
                  {record.bar_association_name && (
                    <div className="text-[11px] text-slate-400 mt-0.5">{record.bar_association_name}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {record.is_claimed ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Claimed & Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      Unclaimed
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {record.is_claimed ? (
                    <Button variant="ghost" size="sm" className="text-sky-600">
                      View Profile
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleClaim(record)}
                      className="bg-navy-900 text-white hover:bg-navy-800"
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
          <div className="p-8 text-center text-slate-400 text-sm">No advocate records found matching your filter.</div>
        )}
      </div>

      {/* Claim Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Claim Profile Verification</h3>
            <p className="text-sm text-slate-600">
              Are you claiming the profile of <b>{selectedRecord.full_name}</b> (Enrollment:{' '}
              <span className="font-mono">{selectedRecord.enrollment_number}</span>)?
            </p>

            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-xs">
              Deterministic Verification Notice: Upload of Bar Council ID or Certificate of Practice will be required upon submission to establish verified status.
            </div>

            {claimSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                Profile claimed successfully! Redirecting...
              </div>
            ) : (
              <div className="flex justify-end space-x-3 pt-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedRecord(null)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={submitClaim} className="bg-navy-900 text-white hover:bg-navy-800">
                  Affirm & Claim
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
