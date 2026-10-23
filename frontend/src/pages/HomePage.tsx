import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Search, Users, Cpu, ArrowRight, Award } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-900 rounded-3xl text-white p-8 md:p-14 shadow-xl border border-navy-800">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-sky-500/10 border border-sky-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-400">
            <Cpu className="w-3.5 h-3.5 mr-1 text-sky-400" />
            Zero-Hallucination Legal AI Engine
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            AI-Powered Legal Professional Network for Advocates and Counsel.
          </h1>

          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            Find verified colleagues across all 38 districts of Tamil Nadu, High Courts, and subordinate tribunals. Grounded recommendations with zero hallucinated claims.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link to="/search">
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Find an Advocate
              </Button>
            </Link>
            <Link to="/directory">
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-navy-800 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" />
                Claim Your Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Stats Bar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">30,000+</div>
            <div className="text-xs text-slate-500 font-medium">Verified Advocate Records</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">38 Districts</div>
            <div className="text-xs text-slate-500 font-medium">Tamil Nadu & Pondicherry Courts</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">100% Deterministic</div>
            <div className="text-xs text-slate-500 font-medium">Bar Verification & Grounded AI</div>
          </div>
        </div>
      </section>

      {/* Quick Discovery Teaser */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Experience Intelligent Natural Language Search</h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Type naturally in English or Tamil legal context: &quot;Need a criminal appeal advocate in Madurai for Principal Sessions Court appearance tomorrow&quot;.
            </p>
          </div>
          <Link to="/search">
            <Button size="md" className="shrink-0 flex items-center">
              Try AI Search Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
