import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  Users,
  Globe,
  Server,
  TrendingUp,
  AlertTriangle,
  Wifi,
  Database,
  Shield,
  Zap,
  Eye,
  BarChart3,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical
} from 'lucide-react'
import StatsCard from './StatsCard'
import AlertsPanel from './AlertsPanel'
import TopTalkers from './TopTalkers'
import ProtocolChart from './ProtocolChart'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [topTalkers, setTopTalkers] = useState([])
  const [protocols, setProtocols] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState('live')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, alertsRes, talkersRes, protocolsRes] = await Promise.all([
          fetch('http://localhost:5000/api/v1/stats'),
          fetch('http://localhost:5000/api/v1/alerts'),
          fetch('http://localhost:5000/api/v1/top-talkers'),
          fetch('http://localhost:5000/api/v1/protocols')
        ])

        const statsData = await statsRes.json()
        const alertsData = await alertsRes.json()
        const talkersData = await talkersRes.json()
        const protocolsData = await protocolsRes.json()

        setStats(statsData.data)
        setAlerts(alertsData.data)
        setTopTalkers(talkersData.data)
        setProtocols(protocolsData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 2000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Network Data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">DPI Analyzer</h1>
                <p className="text-sm text-slate-600">Network Security Monitor</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">Live Monitoring</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-100 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 text-slate-600" />
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="bg-transparent text-sm font-medium text-slate-700 outline-none"
                >
                  <option value="live">Live</option>
                  <option value="1h">Last Hour</option>
                  <option value="24h">Last 24h</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatsCard
            title="Total Packets"
            value={stats?.total_packets?.toLocaleString() || 0}
            icon={<Activity className="w-5 h-5" />}
            color="blue"
            change="+12.5%"
            trend="up"
            subtitle="From last hour"
          />
          <StatsCard
            title="Active IPs"
            value={stats?.unique_ips || 0}
            icon={<Users className="w-5 h-5" />}
            color="emerald"
            change="+5.2%"
            trend="up"
            subtitle="Unique connections"
          />
          <StatsCard
            title="Packet Rate"
            value={`${stats?.packet_rate || 0}/s`}
            icon={<Zap className="w-5 h-5" />}
            color="violet"
            change="+8.1%"
            trend="up"
            subtitle="Real-time rate"
          />
          <StatsCard
            title="Data Transfer"
            value={`${((stats?.bytes_transferred || 0) / 1024 / 1024).toFixed(1)} MB`}
            icon={<Database className="w-5 h-5" />}
            color="orange"
            change="+15.3%"
            trend="up"
            subtitle="Total transferred"
          />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProtocolChart data={protocols} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TopTalkers data={topTalkers} />
          </motion.div>
        </div>

        {/* Alerts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AlertsPanel alerts={alerts} />
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard
