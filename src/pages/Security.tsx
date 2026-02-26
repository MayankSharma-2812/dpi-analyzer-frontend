import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, AlertTriangle, Lock, Eye, Ban, Activity, TrendingUp } from 'lucide-react';
import BackButton from '../components/UI/BackButton';

const Security = () => {
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);

  const securityEvents = [
    {
      id: 1,
      type: 'DDoS Attack',
      severity: 'critical',
      source: '192.168.1.100',
      target: 'Web Server',
      timestamp: '2024-01-15 14:32:18',
      status: 'blocked',
      description: 'Multiple connection attempts detected'
    },
    {
      id: 2,
      type: 'Port Scan',
      severity: 'high',
      source: '10.0.0.55',
      target: 'Database Server',
      timestamp: '2024-01-15 14:28:45',
      status: 'detected',
      description: 'Sequential port scanning activity'
    },
    {
      id: 3,
      type: 'Suspicious Traffic',
      severity: 'medium',
      source: '172.16.0.10',
      target: 'Internal Network',
      timestamp: '2024-01-15 14:15:22',
      status: 'monitoring',
      description: 'Unusual traffic patterns detected'
    },
    {
      id: 4,
      type: 'Malware Detection',
      severity: 'critical',
      source: '192.168.2.45',
      target: 'File Server',
      timestamp: '2024-01-15 13:58:10',
      status: 'quarantined',
      description: 'Malicious file signature detected'
    },
    {
      id: 5,
      type: 'Brute Force',
      severity: 'high',
      source: '203.0.113.15',
      target: 'SSH Server',
      timestamp: '2024-01-15 13:45:33',
      status: 'blocked',
      description: 'Multiple failed login attempts'
    }
  ];

  const securityMetrics = [
    { title: 'Threats Blocked', value: '1,247', icon: Settings, color: 'success', trend: '+12%' },
    { title: 'Active Alerts', value: '23', icon: AlertTriangle, color: 'danger', trend: '+5%' },
    { title: 'Security Score', value: '94/100', icon: Lock, color: 'primary', trend: '+2%' },
    { title: 'Monitored IPs', value: '8,456', icon: Eye, color: 'warning', trend: '+18%' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-danger-600 bg-danger-100 border-danger-200';
      case 'high': return 'text-warning-600 bg-warning-100 border-warning-200';
      case 'medium': return 'text-primary-600 bg-primary-100 border-primary-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'text-success-600 bg-success-100';
      case 'detected': return 'text-warning-600 bg-warning-100';
      case 'quarantined': return 'text-danger-600 bg-danger-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Center</h1>
              <p className="text-gray-600">Real-time threat detection and security monitoring</p>
            </div>
          </div>
        </motion.div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {securityMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="metric-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-success-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{metric.trend}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="card-header">
                <h3 className="card-title">Security Events</h3>
                <div className="flex items-center gap-2">
                  <span className="badge badge-danger">Live</span>
                  <Activity className="w-4 h-4 text-success-600 animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                {securityEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${selectedThreat === event.id.toString() ? 'ring-2 ring-primary-500' : ''
                      }`}
                    onClick={() => setSelectedThreat(event.id.toString())}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                            {event.type}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 font-medium mb-1">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Source: {event.source}</span>
                          <span>Target: {event.target}</span>
                          <span>{event.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {event.severity === 'critical' && <Ban className="w-5 h-5 text-danger-600" />}
                        <AlertTriangle className={`w-5 h-5 ${event.severity === 'critical' ? 'text-danger-600' :
                            event.severity === 'high' ? 'text-warning-600' :
                              'text-primary-600'
                          }`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Threat Details */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="card-header">
                <h3 className="card-title">Threat Details</h3>
                <Shield className="w-5 h-5 text-primary-600" />
              </div>

              {selectedThreat ? (
                <div className="space-y-4">
                  {(() => {
                    const event = securityEvents.find(e => e.id.toString() === selectedThreat);
                    if (!event) return null;

                    return (
                      <>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{event.type}</h4>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Severity:</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                              {event.severity.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                              {event.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Source IP:</span>
                            <span className="font-mono">{event.source}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Target:</span>
                            <span>{event.target}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Detected:</span>
                            <span>{event.timestamp}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <button className="btn btn-primary w-full mb-2">
                            Take Action
                          </button>
                          <button className="btn btn-secondary w-full">
                            View Details
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a threat to view details</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
