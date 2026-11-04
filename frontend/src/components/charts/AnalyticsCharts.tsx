import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

// Chart Palette as per Design System
export const CHART_PALETTE = [
  '#4285F4', // Series 1 (Google Blue)
  '#34A853', // Series 2 (Google Green)
  '#EA4335', // Series 3 (Google Red)
  '#FBBC05', // Series 4 (Google Yellow)
  '#A142F4', // Series 5 (Purple)
  '#00ACC1', // Series 6 (Cyan)
  '#FF8A00', // Series 7 (Orange)
]

// ──────────────── 1. Multi-Series Line Chart ────────────────
export interface LineChartProps {
  data: any[]
  xAxisKey: string
  lines: { key: string; name: string; color?: string }[]
  height?: number
}

export const AppLineChart: React.FC<LineChartProps> = ({
  data,
  xAxisKey,
  lines,
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DADCE0" vertical={false} />
          <XAxis dataKey={xAxisKey} tick={{ fill: '#5F6368', fontSize: 12 }} axisLine={{ stroke: '#DADCE0' }} />
          <YAxis tick={{ fill: '#5F6368', fontSize: 12 }} axisLine={{ stroke: '#DADCE0' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DADCE0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(60,64,67,0.15)',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          {lines.map((line, idx) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.name}
              stroke={line.color || CHART_PALETTE[idx % CHART_PALETTE.length]}
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 1.5, fill: '#FFFFFF' }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ──────────────── 2. Area Chart ────────────────
export interface AreaChartProps {
  data: any[]
  xAxisKey: string
  areas: { key: string; name: string; color?: string }[]
  height?: number
}

export const AppAreaChart: React.FC<AreaChartProps> = ({
  data,
  xAxisKey,
  areas,
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DADCE0" vertical={false} />
          <XAxis dataKey={xAxisKey} tick={{ fill: '#5F6368', fontSize: 12 }} axisLine={{ stroke: '#DADCE0' }} />
          <YAxis tick={{ fill: '#5F6368', fontSize: 12 }} axisLine={{ stroke: '#DADCE0' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DADCE0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(60,64,67,0.15)',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          {areas.map((area, idx) => {
            const color = area.color || CHART_PALETTE[idx % CHART_PALETTE.length]
            return (
              <Area
                key={area.key}
                type="monotone"
                dataKey={area.key}
                name={area.name}
                stroke={color}
                strokeWidth={2}
                fill={color}
                fillOpacity={0.2}
              />
            )
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ──────────────── 3. Bar Chart ────────────────
export interface BarChartProps {
  data: any[]
  xAxisKey: string
  bars: { key: string; name: string; color?: string }[]
  height?: number
}

export const AppBarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey,
  bars,
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DADCE0" vertical={false} />
          <XAxis dataKey={xAxisKey} tick={{ fill: '#5F6368', fontSize: 12 }} axisLine={{ stroke: '#DADCE0' }} />
          <YAxis tick={{ fill: '#5F6368', fontSize: 12 }} axisLine={{ stroke: '#DADCE0' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DADCE0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(60,64,67,0.15)',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          {bars.map((bar, idx) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.name}
              fill={bar.color || CHART_PALETTE[idx % CHART_PALETTE.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ──────────────── 4. Donut Chart ────────────────
export interface DonutChartProps {
  data: { name: string; value: number; color?: string }[]
  height?: number
  innerRadius?: number
  outerRadius?: number
}

export const AppDonutChart: React.FC<DonutChartProps> = ({
  data,
  height = 260,
  innerRadius = 55,
  outerRadius = 85,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || CHART_PALETTE[index % CHART_PALETTE.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DADCE0',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// ──────────────── 5. Mini Sparkline for KPI Cards ────────────────
export const MiniSparkline: React.FC<{ data: number[]; color?: string }> = ({
  data,
  color = '#4285F4',
}) => {
  const chartData = data.map((v, i) => ({ i, v }))
  return (
    <div style={{ width: '100%', height: 36 }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
