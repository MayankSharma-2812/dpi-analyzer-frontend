import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Monitor, Users } from 'lucide-react'

const TopTalkers = ({ data }) => {
  const chartData = data.slice(0, 8).map(talker => ({
    ip: talker.ip,
    packets: talker.packets
  }))

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-200/50">
          <p className="font-semibold text-slate-900">IP: {payload[0].payload.ip}</p>
          <p className="text-sm text-slate-600">Packets: {payload[0].value.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Top Talkers</h3>
          <p className="text-sm text-slate-600 mt-1">Most active IP addresses</p>
        </div>
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
          <Users className="w-5 h-5 text-emerald-600" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="ip"
            tick={{ fontSize: 11, fill: '#64748b' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="packets"
            fill="url(#colorGradient)"
            radius={[8, 8, 0, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
              <stop offset="100%" stopColor="#059669" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TopTalkers
