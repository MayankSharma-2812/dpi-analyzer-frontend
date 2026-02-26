import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, RotateCcw, Shield, Database, Bell, Network } from 'lucide-react';
import BackButton from '../components/UI/BackButton';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    apiEndpoint: 'http://localhost:5000',
    apiKey: 'oW9PjGJx6dvaG5StZn5zupPAmGCKkiUUR3Sr-2t6xI4',
    refreshInterval: '2000',

    // Security Settings
    enableAlerts: true,
    alertThreshold: 'medium',
    autoBlock: false,

    // Database Settings
    enablePersistence: true,
    retentionDays: '30',
    backupEnabled: true,

    // Network Settings
    captureInterface: 'auto',
    enableDeepDPI: true,
    maxPacketsPerSecond: '10000',
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'network', label: 'Network', icon: Network },
  ];

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
    // Show success message
  };

  const handleReset = () => {
    // Reset to default settings
    setSettings({
      apiEndpoint: 'http://localhost:5000',
      apiKey: 'oW9PjGJx6dvaG5StZn5zupPAmGCKkiUUR3Sr-2t6xI4',
      refreshInterval: '2000',
      enableAlerts: true,
      alertThreshold: 'medium',
      autoBlock: false,
      enablePersistence: true,
      retentionDays: '30',
      backupEnabled: true,
      captureInterface: 'auto',
      enableDeepDPI: true,
      maxPacketsPerSecond: '10000',
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">API Endpoint</label>
              <input
                type="text"
                className="form-input"
                value={settings.apiEndpoint}
                onChange={(e) => setSettings({ ...settings, apiEndpoint: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">API Key</label>
              <input
                type="password"
                className="form-input"
                value={settings.apiKey}
                onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Refresh Interval (ms)</label>
              <input
                type="number"
                className="form-input"
                value={settings.refreshInterval}
                onChange={(e) => setSettings({ ...settings, refreshInterval: e.target.value })}
              />
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="form-label mb-0">Enable Security Alerts</label>
                <p className="text-sm text-gray-500">Receive notifications for security events</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableAlerts}
                onChange={(e) => setSettings({ ...settings, enableAlerts: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded"
              />
            </div>

            <div>
              <label className="form-label">Alert Threshold</label>
              <select
                className="form-input"
                value={settings.alertThreshold}
                onChange={(e) => setSettings({ ...settings, alertThreshold: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="form-label mb-0">Auto-block Threats</label>
                <p className="text-sm text-gray-500">Automatically block detected threats</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoBlock}
                onChange={(e) => setSettings({ ...settings, autoBlock: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded"
              />
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="form-label mb-0">Enable Persistence</label>
                <p className="text-sm text-gray-500">Save data to database</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enablePersistence}
                onChange={(e) => setSettings({ ...settings, enablePersistence: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded"
              />
            </div>

            <div>
              <label className="form-label">Data Retention (days)</label>
              <input
                type="number"
                className="form-input"
                value={settings.retentionDays}
                onChange={(e) => setSettings({ ...settings, retentionDays: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="form-label mb-0">Enable Backups</label>
                <p className="text-sm text-gray-500">Create automatic backups</p>
              </div>
              <input
                type="checkbox"
                checked={settings.backupEnabled}
                onChange={(e) => setSettings({ ...settings, backupEnabled: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded"
              />
            </div>
          </div>
        );

      case 'network':
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">Capture Interface</label>
              <select
                className="form-input"
                value={settings.captureInterface}
                onChange={(e) => setSettings({ ...settings, captureInterface: e.target.value })}
              >
                <option value="auto">Auto-detect</option>
                <option value="eth0">Ethernet</option>
                <option value="wlan0">WiFi</option>
                <option value="lo">Loopback</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="form-label mb-0">Enable Deep DPI</label>
                <p className="text-sm text-gray-500">Perform deep packet inspection</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableDeepDPI}
                onChange={(e) => setSettings({ ...settings, enableDeepDPI: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded"
              />
            </div>

            <div>
              <label className="form-label">Max Packets per Second</label>
              <input
                type="number"
                className="form-input"
                value={settings.maxPacketsPerSecond}
                onChange={(e) => setSettings({ ...settings, maxPacketsPerSecond: e.target.value })}
              />
            </div>
          </div>
        );

      default:
        return null;
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600">Configure your DPI Analyzer preferences</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="card-header">
                <h3 className="card-title">
                  {tabs.find(tab => tab.id === activeTab)?.label} Settings
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="btn btn-secondary btn-sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-primary btn-sm"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </button>
                </div>
              </div>

              <div className="p-6">
                {renderTabContent()}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
