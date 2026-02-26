import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for API key if available
api.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
      config.headers['X-API-Key'] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized: Invalid API key');
    } else if (error.response?.status === 429) {
      console.error('Rate limit exceeded');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    return Promise.reject(error);
  }
);

// API Types
export interface NetworkStats {
  total_packets: number;
  tcp: number;
  udp: number;
  dns_queries: number;
  http_requests: number;
  https_traffic: number;
  ipv6_packets: number;
  packet_rate: number;
  bytes_transferred: number;
  unique_ips: number;
  uptime: number;
  protocols: Record<string, number>;
  ports: Record<string, number>;
}

export interface TopTalker {
  [ip: string]: {
    total: number;
    tcp: number;
    udp: number;
    dns: number;
    http: number;
  };
}

export interface DNSDomain {
  [domain: string]: number;
}

export interface Alert {
  message: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source_ip?: string;
}

export interface HTTPHost {
  [host: string]: number;
}

export interface ProtocolSignature {
  [protocol: string]: number;
}

export interface ConnectionSummary {
  total_unique_sources: number;
  active_connections: number;
  alerted_ips: number;
  suspicious_ips_monitored: number;
}

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: number;
  version: string;
  uptime: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: number;
  error?: string;
}

// API Functions
export const apiService = {
  // Health and monitoring
  async getHealth(): Promise<HealthStatus> {
    const response = await api.get<HealthStatus>('/health');
    return response.data;
  },

  async getApiDocs() {
    const response = await api.get('/api/docs');
    return response.data;
  },

  // Network statistics
  async getStats(): Promise<NetworkStats> {
    const response = await api.get<ApiResponse<NetworkStats>>('/stats');
    return response.data.data;
  },

  async getHistoricalStats(hours: number = 24): Promise<NetworkStats[]> {
    const response = await api.get<ApiResponse<NetworkStats[]>>(`/historical-stats?hours=${hours}`);
    return response.data.data;
  },

  // Traffic analysis
  async getTopTalkers(limit: number = 10): Promise<TopTalker> {
    const response = await api.get<ApiResponse<TopTalker>>(`/top-talkers?limit=${limit}`);
    return response.data.data;
  },

  async getDNSDomains(limit: number = 10): Promise<DNSDomain> {
    const response = await api.get<ApiResponse<DNSDomain>>(`/dns-domains?limit=${limit}`);
    return response.data.data;
  },

  async getHTTPHosts(limit: number = 10): Promise<HTTPHost> {
    const response = await api.get<ApiResponse<HTTPHost>>(`/http-hosts?limit=${limit}`);
    return response.data.data;
  },

  async getProtocolSignatures(): Promise<ProtocolSignature> {
    const response = await api.get<ApiResponse<ProtocolSignature>>('/protocol-signatures');
    return response.data.data;
  },

  async getConnectionSummary(): Promise<ConnectionSummary> {
    const response = await api.get<ApiResponse<ConnectionSummary>>('/connection-summary');
    return response.data.data;
  },

  // Security and alerts
  async getAlerts(limit: number = 20, severity?: string, historical: boolean = false): Promise<Alert[] | { current: Alert[]; historical: Alert[] }> {
    const params = new URLSearchParams({
      limit: limit.toString(),
    });
    
    if (severity) params.append('severity', severity);
    if (historical) params.append('historical', 'true');

    const response = await api.get<ApiResponse<Alert[] | { current: Alert[]; historical: Alert[] }>>(`/alerts?${params}`);
    return response.data.data;
  },

  async addSuspiciousIP(ipAddress: string, reason?: string, threatLevel?: number): Promise<{ message: string }> {
    const response = await api.post<ApiResponse<{ message: string }>>('/add-suspicious-ip', {
      ip_address: ipAddress,
      reason: reason || '',
      threat_level: threatLevel || 1,
    });
    return response.data.data;
  },

  // Cache management
  async getCacheStats() {
    const response = await api.get('/cache-stats');
    return response.data;
  },

  async invalidateCache(pattern?: string) {
    const response = await api.post('/invalidate-cache', pattern ? { pattern } : {});
    return response.data;
  },

  // Database stats
  async getDatabaseStats() {
    const response = await api.get('/database-stats');
    return response.data;
  },
};

export default api;
