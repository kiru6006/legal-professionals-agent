import React, { useState } from 'react'
import {
  Sparkles,
  BarChart3,
  Users,
  ShieldCheck,
  Layers,
  Table as TableIcon,
  Palette,
  AlertCircle,
  Search,
  Scale,
  Sun,
  Moon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { StatusBadge, BadgeColor } from '@/components/ui/StatusBadge'
import { AppCard } from '@/components/cards/AppCard'
import { KPICard } from '@/components/cards/KPICard'
import { CardHighlightedTable, ColumnDef, TableHeaderTheme, RowIndicatorColor } from '@/components/tables/CardHighlightedTable'
import { AppTabs } from '@/components/navigation/AppTabs'
import { Input, Switch, Checkbox } from '@/components/forms/AppFormControls'
import { AppAlert } from '@/components/feedback/AppAlert'
import { AppModal } from '@/components/overlays/AppModal'
import {
  AppLineChart,
  AppAreaChart,
  AppDonutChart,
  MiniSparkline
} from '@/components/charts/AnalyticsCharts'

interface LegalMatterRecord {
  id: string
  caseNumber: string
  title: string
  client: string
  court: string
  advocate: string
  priority: 'High' | 'Normal' | 'Urgent' | 'Low'
  status: 'In Progress' | 'Completed' | 'Critical' | 'Pending' | 'AI Review' | 'Important'
  fee: string
  date: string
}

export const DesignSystemShowcasePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('components')
  const [tableTheme, setTableTheme] = useState<TableHeaderTheme>('crimson')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [switchState, setSwitchState] = useState(true)
  const [checkboxState, setCheckboxState] = useState(true)
  const [inputText, setInputText] = useState('')
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([])
  const [isDark, setIsDark] = useState(false)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Realistic Legal Tech Sample Data
  const sampleData: LegalMatterRecord[] = [
    {
      id: 'MAT-2026-001',
      caseNumber: 'CRL.A. 452/2026',
      title: 'State vs. Murugan (Appellate Reference)',
      client: 'K. Murugan',
      court: 'Madras High Court',
      advocate: 'Adv. Kirubakaran',
      priority: 'Urgent',
      status: 'Critical',
      fee: '₹1,50,000',
      date: '2026-11-04',
    },
    {
      id: 'MAT-2026-002',
      caseNumber: 'O.S. 88/2026',
      title: 'Apex Infrastructure vs. Metro Corp',
      client: 'Apex Infra Ltd.',
      court: 'Principal Sessions Court, Salem',
      advocate: 'Adv. Ramesh Kumar',
      priority: 'High',
      status: 'In Progress',
      fee: '₹3,20,000',
      date: '2026-11-02',
    },
    {
      id: 'MAT-2026-003',
      caseNumber: 'ARB.P. 12/2026',
      title: 'Southern Textiles Commercial Arbitration',
      client: 'Southern Textiles',
      court: 'Arbitration Tribunal, Coimbatore',
      advocate: 'Adv. K. Balasubramanian',
      priority: 'Normal',
      status: 'Completed',
      fee: '₹2,10,000',
      date: '2026-10-28',
    },
    {
      id: 'MAT-2026-004',
      caseNumber: 'W.P. 19204/2026',
      title: 'Public Interest Petition (Groundwater Rights)',
      client: 'Salem Environment Trust',
      court: 'Madras High Court (Writ Bench)',
      advocate: 'Adv. Anitha Rajan',
      priority: 'High',
      status: 'Important',
      fee: 'Pro Bono',
      date: '2026-11-01',
    },
    {
      id: 'MAT-2026-005',
      caseNumber: 'BAIL.APPL. 331/2026',
      title: 'Bail Application u/s 439 CrPC',
      client: 'P. Selvam',
      court: 'District Sessions Court, Salem',
      advocate: 'Adv. M. Senthil Nathan',
      priority: 'Urgent',
      status: 'Pending',
      fee: '₹45,000',
      date: '2026-11-03',
    },
    {
      id: 'MAT-2026-006',
      caseNumber: 'CAVEAT 104/2026',
      title: 'Commercial Caveat in Land Title Claim',
      client: 'Velan Estates',
      court: 'Sub Court, Coimbatore',
      advocate: 'Adv. Deepa Sundaram',
      priority: 'Low',
      status: 'AI Review',
      fee: '₹35,000',
      date: '2026-10-30',
    },
  ]

  // Map Status to Badge and Indicator Color
  const getStatusConfig = (status: LegalMatterRecord['status']): { badgeColor: BadgeColor; indicator: RowIndicatorColor } => {
    switch (status) {
      case 'In Progress':
        return { badgeColor: 'blue', indicator: 'blue' }
      case 'Completed':
        return { badgeColor: 'green', indicator: 'green' }
      case 'Critical':
        return { badgeColor: 'red', indicator: 'red' }
      case 'Pending':
        return { badgeColor: 'yellow', indicator: 'yellow' }
      case 'AI Review':
        return { badgeColor: 'purple', indicator: 'purple' }
      case 'Important':
        return { badgeColor: 'crimson', indicator: 'crimson' }
      default:
        return { badgeColor: 'neutral', indicator: 'blue' }
    }
  }

  // Table Columns Definition
  const columns: ColumnDef<LegalMatterRecord>[] = [
    {
      id: 'caseNumber',
      header: 'Case Docket',
      accessorKey: 'caseNumber',
      sortable: true,
      width: '180px',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-xs text-[#202124] block">{row.caseNumber}</span>
          <span className="text-[10px] text-[#80868B]">{row.id}</span>
        </div>
      ),
    },
    {
      id: 'title',
      header: 'Matter Title & Client',
      accessorKey: 'title',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-semibold text-xs text-[#202124] block">{row.title}</span>
          <span className="text-[11px] text-[#5F6368]">Client: {row.client}</span>
        </div>
      ),
    },
    {
      id: 'court',
      header: 'Jurisdiction Court',
      accessorKey: 'court',
      sortable: true,
      cell: (row) => <span className="text-xs text-[#5F6368]">{row.court}</span>,
    },
    {
      id: 'advocate',
      header: 'Assigned Counsel',
      accessorKey: 'advocate',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-medium text-[#202124] bg-[#F1F3F4] px-2 py-0.5 rounded border border-[#DADCE0]">
          {row.advocate}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Matter Status',
      accessorKey: 'status',
      sortable: true,
      cell: (row) => {
        const cfg = getStatusConfig(row.status)
        return (
          <StatusBadge color={cfg.badgeColor} dot>
            {row.status}
          </StatusBadge>
        )
      },
    },
    {
      id: 'fee',
      header: 'Retainer / Fee',
      accessorKey: 'fee',
      align: 'right',
      cell: (row) => <span className="font-bold text-xs text-[#202124]">{row.fee}</span>,
    },
  ]

  // Chart Sample Data
  const monthlyCasesData = [
    { month: 'Jun', filed: 42, disposed: 38, pending: 24 },
    { month: 'Jul', filed: 55, disposed: 48, pending: 31 },
    { month: 'Aug', filed: 68, disposed: 52, pending: 47 },
    { month: 'Sep', filed: 74, disposed: 65, pending: 56 },
    { month: 'Oct', filed: 89, disposed: 78, pending: 67 },
    { month: 'Nov', filed: 95, disposed: 86, pending: 76 },
  ]

  const practiceAreaDistribution = [
    { name: 'Criminal Defense', value: 45, color: '#4285F4' },
    { name: 'Civil Litigation', value: 30, color: '#34A853' },
    { name: 'Corporate / NCLT', value: 18, color: '#A142F4' },
    { name: 'Appellate Writs', value: 12, color: '#C70234' },
    { name: 'Arbitration', value: 8, color: '#FBBC05' },
  ]

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* ──────────────── Top Hero Section ──────────────── */}
      <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C70234] bg-[#FCE8EF] px-2.5 py-0.5 rounded-full border border-[#F8CCD7] flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Vignxs × Google Vibrant Enterprise UI
            </span>
            <span className="text-[11px] font-semibold text-[#188038] bg-[#E6F4EA] px-2 py-0.5 rounded-full border border-[#CEEAD6]">
              Design System v2.0
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight">
            Enterprise UI <span className="text-[#C70234]">Design System</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-1.5 max-w-2xl leading-relaxed">
            High-contrast enterprise dashboard system combining Google-inspired clarity, Vignxs crimson editorial branding, card-highlighted HTML data tables, and rich analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={toggleDarkMode}
            leftIcon={isDark ? <Sun className="w-4 h-4 text-[#FBBC05]" /> : <Moon className="w-4 h-4 text-[#5F6368]" />}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
          <Button variant="brand" onClick={() => setIsModalOpen(true)}>
            Open Test Modal
          </Button>
        </div>
      </div>

      {/* ──────────────── Navigation Tabs ──────────────── */}
      <AppTabs
        variant="underlined"
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'components', label: 'Core Components', icon: <Layers className="w-4 h-4" /> },
          { id: 'table', label: 'Card-Highlighted Table', icon: <TableIcon className="w-4 h-4" /> },
          { id: 'analytics', label: 'Charts & KPIs', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'palette', label: 'Color System', icon: <Palette className="w-4 h-4" /> },
        ]}
      />

      {/* ════════════════ TAB 1: CORE COMPONENTS ════════════════ */}
      {activeTab === 'components' && (
        <div className="space-y-10 animate-in fade-in">
          {/* Section: Global Buttons */}
          <section className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-card space-y-5">
            <div>
              <h2 className="text-base font-bold text-[#202124] uppercase tracking-wider">
                1. Reusable Button System
              </h2>
              <p className="text-xs text-[#5F6368]">
                Consistent semantic colors, accessible focus indicators, and comprehensive loading states.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary (Google Blue)</Button>
              <Button variant="brand">Brand (Crimson)</Button>
              <Button variant="secondary">Secondary Neutral</Button>
              <Button variant="success">Success Action</Button>
              <Button variant="danger">Destructive / Error</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="primary" loading>Loading...</Button>
            </div>
          </section>

          {/* Section: Status Badges */}
          <section className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-card space-y-5">
            <div>
              <h2 className="text-base font-bold text-[#202124] uppercase tracking-wider">
                2. Semantic Status Badges
              </h2>
              <p className="text-xs text-[#5F6368]">
                High-contrast foregrounds with accessible soft backgrounds.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 items-center">
              <StatusBadge color="blue" dot>In Progress (#4285F4)</StatusBadge>
              <StatusBadge color="green" dot>Completed (#34A853)</StatusBadge>
              <StatusBadge color="red" dot>Critical / Error (#EA4335)</StatusBadge>
              <StatusBadge color="yellow" dot>Pending / Review (#FBBC05)</StatusBadge>
              <StatusBadge color="purple" dot>AI Intelligence (#A142F4)</StatusBadge>
              <StatusBadge color="crimson" dot>Brand Crimson (#C70234)</StatusBadge>
              <StatusBadge color="cyan" dot>Information (#00ACC1)</StatusBadge>
              <StatusBadge color="neutral" dot>Neutral Inactive</StatusBadge>
            </div>
          </section>

          {/* Section: Global Card Variants */}
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-[#202124] uppercase tracking-wider">
                3. Global Card Design Variants
              </h2>
              <p className="text-xs text-[#5F6368]">
                Visible borders and color accents. No plain borderless white cards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AppCard variant="full-border" accentColor="crimson" interactive>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-[#C70234]">Variant A</span>
                  <h4 className="text-sm font-bold text-[#202124]">Full Colored Border</h4>
                  <p className="text-xs text-[#5F6368]">
                    2px solid crimson border with subtle shadow for high priority items.
                  </p>
                </div>
              </AppCard>

              <AppCard variant="top-accent" accentColor="blue" interactive>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-[#1A73E8]">Variant B</span>
                  <h4 className="text-sm font-bold text-[#202124]">Top Accent Strip</h4>
                  <p className="text-xs text-[#5F6368]">
                    1px neutral border with a prominent 4px colored header band.
                  </p>
                </div>
              </AppCard>

              <AppCard variant="left-accent" accentColor="green" interactive>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-[#188038]">Variant C</span>
                  <h4 className="text-sm font-bold text-[#202124]">Left Vertical Indicator</h4>
                  <p className="text-xs text-[#5F6368]">
                    Clean card with a vertical status ribbon along the left margin.
                  </p>
                </div>
              </AppCard>

              <AppCard variant="selected" accentColor="purple">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-[#8430C9]">Variant D</span>
                  <h4 className="text-sm font-bold text-[#202124]">Selected Active Card</h4>
                  <p className="text-xs text-[#5F6368]">
                    Soft tinted surface background and colored focus ring highlight.
                  </p>
                </div>
              </AppCard>
            </div>
          </section>

          {/* Section: Form Controls & Feedback */}
          <section className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-card space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#202124] uppercase tracking-wider">
                4. Form Controls & Validation
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Input
                label="Normal Search Input"
                placeholder="e.g. Adv. Kirubakaran"
                leftIcon={<Search className="w-4 h-4" />}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                helperText="Enter full advocate or client name"
              />
              <Input
                label="Success Validation Input"
                defaultValue="TN/2015/12345"
                status="success"
                helperText="Verified Tamil Nadu Bar Council enrollment"
              />
              <Input
                label="Error Validation Input"
                defaultValue="invalid_docket_code"
                status="error"
                helperText="Case docket number not found in registry"
              />
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-2 border-t border-[#F1F3F4]">
              <Switch
                checked={switchState}
                onChange={setSwitchState}
                label="AI Natural Language Match Engine"
                description="Automatically parses complex legal briefs"
                color="crimson"
              />
              <Checkbox
                checked={checkboxState}
                onChange={setCheckboxState}
                label="Only verified Bar Council members"
                color="blue"
              />
            </div>
          </section>

          {/* Section: Feedback & Alerts */}
          <section className="space-y-3">
            <AppAlert type="brand" title="Vignxs Crimson Brand Notice">
              This enterprise platform strictly adheres to the Bar Council of India regulations and Advocate-Client Privilege guidelines.
            </AppAlert>
            <AppAlert type="success" title="Profile Verification Completed">
              Your professional credentials have been grounded with public court registers.
            </AppAlert>
            <AppAlert type="warning" title="Limitation Advisory">
              Appellate petition filing deadline expires in 72 hours.
            </AppAlert>
          </section>
        </div>
      )}

      {/* ════════════════ TAB 2: CARD-HIGHLIGHTED DATA TABLE ════════════════ */}
      {activeTab === 'table' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header Theme Switcher Toolbar */}
          <div className="bg-white rounded-xl border border-[#DADCE0] p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#202124] uppercase">Choose Table Header Theme:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'crimson' as const, label: 'Crimson (#C70234)', color: 'bg-[#C70234]' },
                  { id: 'blue' as const, label: 'Google Blue (#1A73E8)', color: 'bg-[#1A73E8]' },
                  { id: 'green' as const, label: 'Google Green (#188038)', color: 'bg-[#188038]' },
                  { id: 'red' as const, label: 'Google Red (#D93025)', color: 'bg-[#D93025]' },
                  { id: 'purple' as const, label: 'Purple (#8430C9)', color: 'bg-[#8430C9]' },
                  { id: 'dark' as const, label: 'Dark (#202124)', color: 'bg-[#202124]' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setTableTheme(th.id)}
                    className={cn(
                      'px-2.5 py-1 rounded text-xs font-semibold text-white transition-transform cursor-pointer',
                      th.color,
                      tableTheme === th.id && 'ring-2 ring-offset-2 ring-black scale-105'
                    )}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs text-[#5F6368]">
              Selected: <b>{selectedRowIds.length}</b> rows
            </span>
          </div>

          {/* Actual CardHighlightedTable */}
          <CardHighlightedTable
            title="Legal Matters & Case Docket Management"
            subtitle="Demonstrating real HTML table with separate card-highlighted rows, colored indicators, and sorting"
            columns={columns}
            data={sampleData}
            headerTheme={tableTheme}
            getRowIndicatorColor={(row) => getStatusConfig(row.status).indicator}
            selectedRowIds={selectedRowIds}
            onSelectionChange={setSelectedRowIds}
            rowActions={(_row) => (
              <Button variant="secondary" size="sm" className="h-7 text-xs">
                View
              </Button>
            )}
          />
        </div>
      )}

      {/* ════════════════ TAB 3: CHARTS & KPIS ════════════════ */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Top KPI Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Active Court Matters"
              metric="142"
              change="+14.2%"
              changeType="positive"
              icon={<Scale className="w-5 h-5" />}
              color="blue"
              chartSnippet={<MiniSparkline data={[20, 28, 35, 45, 52, 68]} color="#4285F4" />}
            />
            <KPICard
              title="Disposed Cases"
              metric="98"
              change="+8.6%"
              changeType="positive"
              icon={<ShieldCheck className="w-5 h-5" />}
              color="green"
              chartSnippet={<MiniSparkline data={[12, 18, 25, 30, 42, 55]} color="#34A853" />}
            />
            <KPICard
              title="Pending Hearing Dates"
              metric="19"
              change="-3.1%"
              changeType="negative"
              icon={<AlertCircle className="w-5 h-5" />}
              color="crimson"
              chartSnippet={<MiniSparkline data={[30, 28, 26, 25, 22, 19]} color="#C70234" />}
            />
            <KPICard
              title="Colleague Network"
              metric="847"
              change="+22.4%"
              changeType="positive"
              icon={<Users className="w-5 h-5" />}
              color="purple"
              chartSnippet={<MiniSparkline data={[10, 22, 35, 48, 62, 85]} color="#A142F4" />}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#202124]">Case Filing vs Disposal Trend</h3>
                  <p className="text-xs text-[#5F6368]">6-month overview of tribunal activity</p>
                </div>
                <StatusBadge color="blue">Monthly Data</StatusBadge>
              </div>

              <AppLineChart
                data={monthlyCasesData}
                xAxisKey="month"
                lines={[
                  { key: 'filed', name: 'Cases Filed', color: '#4285F4' },
                  { key: 'disposed', name: 'Cases Disposed', color: '#34A853' },
                  { key: 'pending', name: 'Active Pending', color: '#C70234' },
                ]}
              />
            </div>

            <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-card space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#202124]">Practice Area Distribution</h3>
                <p className="text-xs text-[#5F6368]">Matters by legal specialization</p>
              </div>

              <AppDonutChart data={practiceAreaDistribution} />
            </div>
          </div>

          {/* Area Chart Section */}
          <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#202124]">Cumulative Courtroom Appearances</h3>
                <p className="text-xs text-[#5F6368]">Comparative volume across High Court and Sessions venues</p>
              </div>
              <StatusBadge color="green">Verified Metrics</StatusBadge>
            </div>

            <AppAreaChart
              data={monthlyCasesData}
              xAxisKey="month"
              areas={[
                { key: 'filed', name: 'Appearances Recorded', color: '#1A73E8' },
                { key: 'disposed', name: 'Arguments Concluded', color: '#34A853' },
              ]}
            />
          </div>
        </div>
      )}

      {/* ════════════════ TAB 4: COLOR SYSTEM ════════════════ */}
      {activeTab === 'palette' && (
        <div className="bg-white rounded-2xl border border-[#DADCE0] p-6 sm:p-8 shadow-card space-y-8 animate-in fade-in">
          <div>
            <h2 className="text-xl font-bold text-[#202124]">Global Color Architecture</h2>
            <p className="text-xs text-[#5F6368] mt-1">
              Balanced 60-65% neutral surfaces, 20-25% soft colored backgrounds, and 10-15% saturated accents.
            </p>
          </div>

          {/* Palette Blocks */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-3">Google-Inspired Core Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Google Blue', hex: '#4285F4', bg: 'bg-[#4285F4]', text: 'text-white' },
                  { name: 'Strong Blue', hex: '#1A73E8', bg: 'bg-[#1A73E8]', text: 'text-white' },
                  { name: 'Google Red', hex: '#EA4335', bg: 'bg-[#EA4335]', text: 'text-white' },
                  { name: 'Google Yellow', hex: '#FBBC05', bg: 'bg-[#FBBC05]', text: 'text-[#202124]' },
                  { name: 'Google Green', hex: '#34A853', bg: 'bg-[#34A853]', text: 'text-white' },
                  { name: 'Green Dark', hex: '#188038', bg: 'bg-[#188038]', text: 'text-white' },
                ].map((c) => (
                  <div key={c.hex} className={cn('p-4 rounded-xl shadow-xs font-mono text-xs flex flex-col justify-between h-20', c.bg, c.text)}>
                    <span className="font-sans font-bold">{c.name}</span>
                    <span>{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-3">Vignxs Crimson Brand Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { name: 'Brand Crimson', hex: '#C70234', bg: 'bg-[#C70234]', text: 'text-white' },
                  { name: 'Deep Crimson', hex: '#B6263A', bg: 'bg-[#B6263A]', text: 'text-white' },
                  { name: 'Rose', hex: '#CD2C56', bg: 'bg-[#CD2C56]', text: 'text-white' },
                  { name: 'Soft Rose', hex: '#D25578', bg: 'bg-[#D25578]', text: 'text-white' },
                  { name: 'Light Pink', hex: '#E7B7C5', bg: 'bg-[#E7B7C5]', text: 'text-[#202124]' },
                ].map((c) => (
                  <div key={c.hex} className={cn('p-4 rounded-xl shadow-xs font-mono text-xs flex flex-col justify-between h-20', c.bg, c.text)}>
                    <span className="font-sans font-bold">{c.name}</span>
                    <span>{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-3">Extended Vibrant Accents</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Purple', hex: '#A142F4', bg: 'bg-[#A142F4]', text: 'text-white' },
                  { name: 'Indigo', hex: '#5E5CE6', bg: 'bg-[#5E5CE6]', text: 'text-white' },
                  { name: 'Cyan', hex: '#00ACC1', bg: 'bg-[#00ACC1]', text: 'text-white' },
                  { name: 'Orange', hex: '#FF8A00', bg: 'bg-[#FF8A00]', text: 'text-white' },
                ].map((c) => (
                  <div key={c.hex} className={cn('p-4 rounded-xl shadow-xs font-mono text-xs flex flex-col justify-between h-20', c.bg, c.text)}>
                    <span className="font-sans font-bold">{c.name}</span>
                    <span>{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── Test Modal ──────────────── */}
      <AppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Matter Reassignment & Consultation"
        subtitle="Vignxs-inspired modal with clean enterprise actions"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="brand" size="sm" onClick={() => setIsModalOpen(false)}>
              Confirm Assignment
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <AppAlert type="info">
            Reassigning this matter will transmit case documents under advocate-client privilege.
          </AppAlert>
          <p>
            Please ensure the receiving counsel is admitted to practice before the High Court of Judicature at Madras and has declared active appearance capacity.
          </p>
        </div>
      </AppModal>
    </div>
  )
}
