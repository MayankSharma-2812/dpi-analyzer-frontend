import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NetworkChartProps {
  data: Array<{
    time: string;
    rate: number;
    total: number;
  }>;
  isLoading?: boolean;
}

const NetworkChart: React.FC<NetworkChartProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="network-chart"
      >
        <div className="card-header">
          <h3 className="card-title">Network Activity</h3>
        </div>
        <div className="chart-container">
          <div className="skeleton h-full w-full rounded-lg"></div>
        </div>
      </motion.div>
    );
  }

  const currentRate = data[data.length - 1]?.rate || 0;
  const peakRate = Math.max(...data.map(d => d.rate), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="network-chart"
    >
      <div className="card-header">
        <h3 className="card-title">Network Activity</h3>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Current</p>
            <p className="text-lg font-semibold text-primary-600">{currentRate} pkt/s</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Peak</p>
            <p className="text-lg font-semibold text-success-600">{peakRate} pkt/s</p>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#111827', fontWeight: 500 }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorRate)"
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default NetworkChart;
