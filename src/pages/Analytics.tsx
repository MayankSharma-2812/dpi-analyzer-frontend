import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, Globe, Users, Shield } from 'lucide-react';
import BackButton from '../components/UI/BackButton';

const Analytics = () => {
  // Mock data for demonstration
  const trafficData = [
    { time: '00:00', http: 120, https: 340, dns: 45, other: 23 },
    { time: '04:00', http: 98, https: 280, dns: 38, other: 19 },
    { time: '08:00', http: 450, https: 890, dns: 120, other: 67 },
    { time: '12:00', http: 680, https: 1200, dns: 156, other: 89 },
    { time: '16:00', http: 520, https: 980, dns: 134, other: 78 },
    { time: '20:00', http: 380, https: 750, dns: 98, other: 45 },
  ];

  const protocolData = [
    { name: 'HTTPS', value: 45, color: '#22c55e' },
    { name: 'HTTP', value: 25, color: '#3b82f6' },
    { name: 'DNS', value: 15, color: '#f59e0b' },
    { name: 'TCP', value: 10, color: '#8b5cf6' },
    { name: 'UDP', value: 5, color: '#ef4444' },
  ];

  const topPorts = [
    { port: 443, connections: 1250, service: 'HTTPS' },
    { port: 80, connections: 890, service: 'HTTP' },
    { port: 53, connections: 456, service: 'DNS' },
    { port: 22, connections: 234, service: 'SSH' },
    { port: 3389, connections: 189, service: 'RDP' },
  ];

  return (
    <div className="min-h-screen">
      <div className="container">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Network Analytics</h1>
              <p className="text-gray-600">Comprehensive network traffic analysis and insights</p>
            </div>
          </div>
        </motion.div>

        {/* Traffic Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="card-header">
              <h3 className="card-title">Traffic Trends</h3>
              <TrendingUp className="w-5 h-5 text-success-600" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="http" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="https" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="dns" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="card-header">
              <h3 className="card-title">Protocol Distribution</h3>
              <Globe className="w-5 h-5 text-primary-600" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={protocolData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {protocolData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Top Ports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="card-header">
            <h3 className="card-title">Top Ports by Connections</h3>
            <Activity className="w-5 h-5 text-warning-600" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPorts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="port" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="connections" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { title: 'Total Packets', value: '1.2M', icon: Activity, color: 'primary' },
            { title: 'Active Connections', value: '2,847', icon: Users, color: 'success' },
            { title: 'Protocols', value: '12', icon: Globe, color: 'warning' },
            { title: 'Alerts Today', value: '23', icon: Shield, color: 'danger' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="metric-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
