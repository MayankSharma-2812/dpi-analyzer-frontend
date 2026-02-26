import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, X, RefreshCw, Filter } from 'lucide-react';
import type { Alert } from '../../services/api';

interface AlertsPanelProps {
  alerts: Alert[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onClearAlert?: (index: number) => void;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alerts,
  isLoading = false,
  onRefresh,
  onClearAlert,
}) => {
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.severity === filter
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'alert-item low';
      case 'medium':
        return 'alert-item medium';
      case 'high':
        return 'alert-item high';
      case 'critical':
        return 'alert-item critical';
      default:
        return 'alert-item low';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Shield className="w-4 h-4 text-primary-600" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-warning-600" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-danger-600" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-danger-700" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-primary-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      low: 'badge-primary',
      medium: 'badge-warning',
      high: 'badge-danger',
      critical: 'badge-danger'
    };
    return colors[severity as keyof typeof colors] || 'badge-primary';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="alert-panel"
    >
      <div className="card-header">
        <h3 className="card-title">Security Alerts</h3>
        <div className="flex items-center gap-2">
          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="form-input text-sm pr-8"
            >
              <option value="all">All Alerts</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="btn btn-secondary btn-sm"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-2">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-16 rounded-lg"></div>
          ))
        ) : filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No alerts detected</p>
            <p className="text-sm text-gray-400 mt-1">
              {filter !== 'all' ? `No ${filter} severity alerts found` : 'System is operating normally'}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredAlerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={getSeverityColor(alert.severity)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`badge ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 font-medium">
                        {alert.message}
                      </p>
                      {alert.source_ip && (
                        <p className="text-xs text-gray-600 mt-1">
                          Source: {alert.source_ip}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {onClearAlert && (
                    <button
                      onClick={() => onClearAlert(index)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Alert Summary */}
      {!isLoading && alerts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              {filteredAlerts.length} of {alerts.length} alerts shown
            </span>
            <div className="flex gap-4">
              <span className="text-danger-600">
                {alerts.filter(a => a.severity === 'high' || a.severity === 'critical').length} critical
              </span>
              <span className="text-warning-600">
                {alerts.filter(a => a.severity === 'medium').length} medium
              </span>
              <span className="text-primary-600">
                {alerts.filter(a => a.severity === 'low').length} low
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AlertsPanel;
