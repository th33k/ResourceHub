import React from 'react';
import { useTheme } from '@mui/material';
import { TrendingUp, TrendingDown, Calendar, Users, Package, Utensils, Wrench } from 'lucide-react';

export const DashboardSummary = ({ stats, selectedDate = new Date().toISOString().split('T')[0] }) => {
  const theme = useTheme();

  // Calculate total statistics from stats array
  const totalUsers = stats.find(s => s.title === 'Total Users')?.value || 0;
  const todayMeals = stats.find(s => s.title === 'Today\'s Meals')?.value || 0;
  const todayResources = stats.find(s => s.title === 'Today\'s Resources')?.value || 0;
  const todayServices = stats.find(s => s.title === 'Today\'s Services')?.value || 0;

  // Calculate trends based on monthly data
  const calculateTrend = (monthlyData) => {
    if (!monthlyData || monthlyData.length < 2) return { percentage: 0, isUp: true };
    
    const current = monthlyData[monthlyData.length - 1];
    const previous = monthlyData[monthlyData.length - 2];
    
    if (previous === 0) return { percentage: current > 0 ? 100 : 0, isUp: current > 0 };
    
    const percentage = ((current - previous) / previous * 100).toFixed(1);
    return { percentage: Math.abs(percentage), isUp: current >= previous };
  };

  const mealsTrend = calculateTrend(stats.find(s => s.title === 'Today\'s Meals')?.monthlyData);
  const assetsTrend = calculateTrend(stats.find(s => s.title === 'Today\'s Resources')?.monthlyData);
  const servicesTrend = calculateTrend(stats.find(s => s.title === 'Today\'s Services')?.monthlyData);

  const summaryItems = [
    {
      icon: Calendar,
      label: 'Selected Date',
      value: new Date(selectedDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      color: theme.palette.info.main
    },
    {
      icon: Users,
      label: 'Total Users',
      value: totalUsers.toLocaleString(),
      color: theme.palette.primary.main
    },
    {
      icon: Utensils,
      label: 'Today\'s Meals',
      value: todayMeals.toLocaleString(),
      trend: mealsTrend,
      color: theme.palette.success.main
    },
    {
      icon: Package,
      label: 'Asset Requests',
      value: todayResources.toLocaleString(),
      trend: assetsTrend,
      color: theme.palette.warning.main
    },
    {
      icon: Wrench,
      label: 'Service Requests',
      value: todayServices.toLocaleString(),
      trend: servicesTrend,
      color: theme.palette.error.main
    }
  ];

  return (
    <div
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.borderRadius,
      }}
      className="p-4 mb-6"
    >
      <h3 
        className="text-lg font-semibold mb-4"
        style={{ color: theme.palette.text.primary }}
      >
        Dashboard Overview
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-3 rounded-lg"
            style={{
              background: theme.palette.background.default,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full mr-3"
              style={{ background: `${item.color}20` }}
            >
              <item.icon 
                size={20} 
                style={{ color: item.color }}
              />
            </div>
            
            <div className="flex-1">
              <div 
                className="text-xs text-gray-500 mb-1"
                style={{ color: theme.palette.text.secondary }}
              >
                {item.label}
              </div>
              <div 
                className="text-sm font-semibold"
                style={{ color: theme.palette.text.primary }}
              >
                {item.value}
              </div>
              
              {item.trend && (
                <div className="flex items-center mt-1">
                  {item.trend.isUp ? (
                    <TrendingUp size={12} style={{ color: theme.palette.success.main }} />
                  ) : (
                    <TrendingDown size={12} style={{ color: theme.palette.error.main }} />
                  )}
                  <span 
                    className="text-xs ml-1"
                    style={{ 
                      color: item.trend.isUp ? theme.palette.success.main : theme.palette.error.main 
                    }}
                  >
                    {item.trend.percentage}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.palette.divider }}>
        <div className="flex flex-wrap gap-4 text-xs" style={{ color: theme.palette.text.secondary }}>
          <span>💡 Trends are calculated from previous month data</span>
          <span>📊 Data refreshes every 5 minutes</span>
          <span>🔄 Use date picker to view historical data</span>
        </div>
      </div>
    </div>
  );
};
