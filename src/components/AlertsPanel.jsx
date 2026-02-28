import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Shield, Wifi, Database, Clock, AlertCircle } from 'lucide-react'

const AlertsPanel = ({ alerts }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'suspicious_ip':
        return <AlertTriangle className="w-5 h-5" />
      case 'port_scan':
        return <Wifi className="w-5 h-5" />
      case 'data_exfiltration':
        return <Database className="w-5 h-5" />
      case 'ddos_attempt':
        return <Shield className="w-5 h-5" />
      case 'dns_tunneling':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <AlertTriangle className="w-5 h-5" />
    }
  }

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-900'
      case 'medium':
        return 'bg-amber-50 border-amber-200 text-amber-900'
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-900'
      default:
        return 'bg-slate-50 border-slate-200 text-slate-900'
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Security Alerts</h3>
          <p className="text-sm text-slate-600 mt-1">Real-time threat detection</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-slate-700">Active Monitoring</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {alerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No security alerts</p>
              <p className="text-slate-400 text-sm mt-1">Network is secure</p>
            </motion.div>
          ) : (
            alerts.map((alert, index) => (
              <motion.div
                key={alert.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-xl border-l-4 ${getAlertColor(alert.severity)} hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 mb-1">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(alert.timestamp)}</span>
                        </span>
                        <span>Source: {alert.source_ip}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityBadge(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AlertsPanel
