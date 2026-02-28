import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, Eye, EyeOff, Lock, Unlock } from 'lucide-react'

const Security = () => {
  const [alerts, setAlerts] = useState([])
  const [threats, setThreats] = useState([])
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Generate mock security data
    const mockAlerts = [
      { id: 1, type: 'suspicious_ip', severity: 'high', source: '192.168.1.100', message: 'Suspicious activity detected from known scanner IP', time: '2 min ago' },
      { id: 2, type: 'port_scan', severity: 'medium', source: '10.0.0.50', message: 'Port scan detected on multiple ports', time: '5 min ago' },
      { id: 3, type: 'ddos_attempt', severity: 'high', source: '172.16.0.25', message: 'DDoS attack pattern detected', time: '8 min ago' },
      { id: 4, type: 'data_exfiltration', severity: 'high', source: '192.168.1.200', message: 'Large data transfer detected', time: '12 min ago' },
    ]

    const mockThreats = [
      { name: 'DDoS Attacks', count: 3, severity: 'high', trend: 'up' },
      { name: 'Port Scans', count: 7, severity: 'medium', trend: 'down' },
      { name: 'Suspicious IPs', count: 12, severity: 'high', trend: 'up' },
      { name: 'Data Exfiltration', count: 2, severity: 'critical', trend: 'stable' },
    ]

    setAlerts(mockAlerts)
    setThreats(mockThreats)
  }, [])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-red-50 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-50 text-green-700 border-green-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '↑'
      case 'down': return '↓'
      default: return '→'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Security Center</h2>
          <p className="text-gray-600 mt-1">Monitor and manage network security threats</p>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="btn btn-secondary flex items-center space-x-2"
        >
          {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showDetails ? 'Hide' : 'Show'} Details</span>
        </button>
      </div>

      {/* Threat Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {threats.map((threat, index) => (
          <motion.div
            key={threat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{threat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{threat.count}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${getSeverityColor(threat.severity)}`}>
                    {threat.severity}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {getTrendIcon(threat.trend)}
                  </span>
                </div>
              </div>
              <Shield className={`w-8 h-8 ${
                threat.severity === 'critical' ? 'text-red-500' :
                threat.severity === 'high' ? 'text-orange-500' :
                threat.severity === 'medium' ? 'text-yellow-500' :
                'text-green-500'
              }`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security Alerts */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">Protected</span>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    {showDetails && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Source IP: {alert.source}</p>
                        <p>Alert ID: #{alert.id}</p>
                        <p>Severity: {alert.severity}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{alert.time}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Security
