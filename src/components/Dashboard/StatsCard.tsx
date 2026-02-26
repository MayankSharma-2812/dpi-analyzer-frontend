import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'primary',
  trend,
  isLoading = false,
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'metric-card success';
      case 'warning':
        return 'metric-card warning';
      case 'danger':
        return 'metric-card danger';
      default:
        return 'metric-card';
    }
  };

  const getTrendIcon = () => {
    switch (trend?.direction) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-danger-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend?.direction) {
      case 'up':
        return 'text-success-600';
      case 'down':
        return 'text-danger-600';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={getColorClasses()}
    >
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {isLoading ? (
                <div className="skeleton h-8 w-20 rounded"></div>
              ) : (
                value
              )}
            </div>
          </div>
        </div>

        {trend && (
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {trend.value}%
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
