import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Activity, Globe, Shield, Users, WifiOff } from 'lucide-react';

import Header from '../Layout/Header';
import StatsCard from './StatsCard';
import NetworkChart from './NetworkChart';
import AlertsPanel from './AlertsPanel';
import { apiService, type NetworkStats, type Alert, type TopTalker, type DNSDomain } from '../../services/api';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 2000, // Refresh every 2 seconds
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

function DashboardContent() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Fetch network stats
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery<NetworkStats>({
    queryKey: ['stats'],
    queryFn: apiService.getStats,
  });

  // Fetch alerts
  const { data: alertsData, isLoading: alertsLoading, error: alertsError } = useQuery<Alert[] | { current: Alert[]; historical: Alert[] }>({
    queryKey: ['alerts'],
    queryFn: () => apiService.getAlerts(20),
  });

  // Update alerts when data changes
  useEffect(() => {
    if (alertsData) {
      const alertsArray = Array.isArray(alertsData) ? alertsData : alertsData.current || [];
      setAlerts(alertsArray);
    }
  }, [alertsData]);

  // Fetch top talkers
  const { data: talkers, isLoading: talkersLoading } = useQuery<TopTalker>({
    queryKey: ['topTalkers'],
    queryFn: () => apiService.getTopTalkers(10),
  });

  // Fetch DNS domains
  const { data: domains, isLoading: domainsLoading } = useQuery<DNSDomain>({
    queryKey: ['dnsDomains'],
    queryFn: () => apiService.getDNSDomains(10),
  });

  // Check connection status
  const isConnected = !statsError && !alertsError;

  // Mock packet history for the chart (in real app, this would come from historical data)
  const packetHistory = Array.from({ length: 20 }, (_, i) => ({
    time: new Date(Date.now() - (19 - i) * 2000).toISOString(),
    rate: Math.floor(Math.random() * 100) + (stats?.packet_rate || 0),
    total: stats?.total_packets || 0,
  }));

  const handleClearAlert = (index: number) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />

      <Header
        isConnected={isConnected}
      />

      <main className="container">
        {/* Connection Status Banner */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="alert alert-danger mb-6"
          >
            <div className="flex items-center">
              <WifiOff className="w-5 h-5 text-danger-600 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-danger-800">Connection Lost</h3>
                <p className="text-sm text-danger-600 mt-1">
                  Unable to connect to the DPI backend. Please check your connection.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="stats-grid mb-8">
          <StatsCard
            title="Total Packets"
            value={stats?.total_packets?.toLocaleString() || '0'}
            icon={Activity}
            color="primary"
            isLoading={statsLoading}
          />

          <StatsCard
            title="Packet Rate"
            value={`${stats?.packet_rate || 0} pkt/sec`}
            icon={Globe}
            color="success"
            isLoading={statsLoading}
          />

          <StatsCard
            title="Unique IPs"
            value={stats?.unique_ips || 0}
            icon={Users}
            color="warning"
            isLoading={statsLoading}
          />

          <StatsCard
            title="Active Alerts"
            value={alerts?.length || 0}
            icon={Shield}
            color="danger"
            isLoading={alertsLoading}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Network Chart */}
          <div className="lg:col-span-2">
            <NetworkChart data={packetHistory} isLoading={statsLoading} />
          </div>

          {/* Top Talkers */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Top Talkers</h3>
            </div>

            {talkersLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton h-10 rounded"></div>
                ))}
              </div>
            ) : talkers && Object.keys(talkers).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(talkers).slice(0, 5).map(([ip, data], index) => (
                  <motion.div
                    key={ip}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {ip}
                      </p>
                      <p className="text-xs text-gray-500">
                        {data.total} packets
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary-600">
                        {data.total}
                      </div>
                      <div className="text-xs text-gray-500">
                        TCP: {data.tcp} | UDP: {data.udp}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* DNS Domains */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">DNS Domains</h3>
            </div>

            {domainsLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton h-10 rounded"></div>
                ))}
              </div>
            ) : domains && Object.keys(domains).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(domains).slice(0, 5).map(([domain, count], index) => (
                  <motion.div
                    key={domain}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {domain}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-primary-600">
                      {count} queries
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No DNS data available</p>
              </div>
            )}
          </div>

          {/* Alerts Panel */}
          <AlertsPanel
            alerts={alerts}
            isLoading={alertsLoading}
            onClearAlert={handleClearAlert}
          />
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
