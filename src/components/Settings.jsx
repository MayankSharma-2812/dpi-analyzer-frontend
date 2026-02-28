import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Save, RefreshCw, Bell, Shield, Database, Wifi } from 'lucide-react'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoRefresh: true,
    refreshInterval: 5,
    darkMode: false,
    highContrast: false,
    dataRetention: 30,
    maxAlerts: 100,
    enableFirewall: true,
    enableIDS: true,
    logLevel: 'info',
    apiRateLimit: 1000,
    enableBackup: true,
    backupInterval: 24,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Simulate saving settings
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    setSettings({
      notifications: true,
      autoRefresh: true,
      refreshInterval: 5,
      darkMode: false,
      highContrast: false,
      dataRetention: 30,
      maxAlerts: 100,
      enableFirewall: true,
      enableIDS: true,
      logLevel: 'info',
      apiRateLimit: 1000,
      enableBackup: true,
      backupInterval: 24,
    })
  }

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
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
          <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600 mt-1">Configure your DPI Analyzer preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="alert alert-success"
        >
          <Settings className="w-5 h-5" />
          <span>Settings saved successfully!</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enable Notifications</p>
                <p className="text-sm text-gray-600">Receive alerts for security events</p>
              </div>
              <button
                onClick={() => updateSetting('notifications', !settings.notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Auto Refresh</p>
                <p className="text-sm text-gray-600">Automatically refresh dashboard data</p>
              </div>
              <button
                onClick={() => updateSetting('autoRefresh', !settings.autoRefresh)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoRefresh ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Refresh Interval (seconds)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.refreshInterval}
                onChange={(e) => updateSetting('refreshInterval', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enable Firewall</p>
                <p className="text-sm text-gray-600">Activate network firewall protection</p>
              </div>
              <button
                onClick={() => updateSetting('enableFirewall', !settings.enableFirewall)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableFirewall ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableFirewall ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enable IDS</p>
                <p className="text-sm text-gray-600">Intrusion Detection System</p>
              </div>
              <button
                onClick={() => updateSetting('enableIDS', !settings.enableIDS)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableIDS ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableIDS ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Max Alerts Display
              </label>
              <input
                type="number"
                min="10"
                max="1000"
                value={settings.maxAlerts}
                onChange={(e) => updateSetting('maxAlerts', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Data Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Database className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Data Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enable Backup</p>
                <p className="text-sm text-gray-600">Automatic data backup</p>
              </div>
              <button
                onClick={() => updateSetting('enableBackup', !settings.enableBackup)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableBackup ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableBackup ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Data Retention (days)
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={settings.dataRetention}
                onChange={(e) => updateSetting('dataRetention', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Backup Interval (hours)
              </label>
              <input
                type="number"
                min="1"
                max="168"
                value={settings.backupInterval}
                onChange={(e) => updateSetting('backupInterval', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Wifi className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">API Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                API Rate Limit (requests/hour)
              </label>
              <input
                type="number"
                min="100"
                max="10000"
                value={settings.apiRateLimit}
                onChange={(e) => updateSetting('apiRateLimit', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Log Level
              </label>
              <select
                value={settings.logLevel}
                onChange={(e) => updateSetting('logLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SettingsPage
