import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTheme } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}%`;
        },
      },
    },
  },
};

// Updated to accept dynamic data as props
export const ResourceAllocation = ({ data, mostRequestedAsset }) => {
  const theme = useTheme();

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.allocated),
        backgroundColor: [
          'rgb(59, 130, 246)', // Blue
          'rgb(16, 185, 129)', // Green
          'rgb(245, 158, 11)', // Amber
          'rgb(239, 68, 68)', // Red
          'rgb(124, 58, 237)', // Purple
          'rgb(236, 72, 153)', // Pink
          'rgb(14, 165, 233)', // Sky Blue
          'rgb(234, 88, 12)', // Orange
          'rgb(168, 85, 247)', // Violet
          'rgb(79, 70, 229)', // Indigo
          'rgb(20, 184, 166)', // Teal
          'rgb(251, 191, 36)', // Yellow
        ],
      },
    ],
  };

  return (
    <div
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        minHeight: 340,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // Removed justifyContent: 'center' to start content from top
        height: '100%',
      }}
      className="p-6 rounded-lg"
    >
      <h2
        className="mb-2 text-xl font-semibold"
        style={{ color: theme.palette.text.primary }}
      >
        Resource Allocation
      </h2>
      <p
        className="mb-6 text-sm"
        style={{ color: theme.palette.text.secondary }}
      >
        Current resource distribution
      </p>
      <div className="flex-1 w-full flex items-center justify-center">
        <Doughnut data={chartData} options={options} />
      </div>
      
      {/* Top 3 Most Requested Assets Section */}
      {mostRequestedAsset && mostRequestedAsset.length > 0 && (
        <div 
          className="mt-4 w-full"
          style={{
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(59, 130, 246, 0.1)' 
              : 'rgba(59, 130, 246, 0.05)',
            border: `1px solid ${theme.palette.mode === 'dark' 
              ? 'rgba(59, 130, 246, 0.3)' 
              : 'rgba(59, 130, 246, 0.2)'}`,
          }}
        >
          <h3 
            className="text-sm font-semibold mb-3 text-center p-2 border-b"
            style={{ 
              color: theme.palette.text.primary,
              borderColor: theme.palette.mode === 'dark' 
                ? 'rgba(59, 130, 246, 0.3)' 
                : 'rgba(59, 130, 246, 0.2)'
            }}
          >
            Top 3 Most Requested Assets
          </h3>
          <div className="px-3 pb-3 space-y-2">
            {mostRequestedAsset.slice(0, 3).map((asset, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-2 rounded"
                style={{
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(255, 255, 255, 0.7)',
                }}
              >
                <div className="flex items-center space-x-2">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: index === 0 
                        ? '#FFD700' 
                        : index === 1 
                        ? '#C0C0C0' 
                        : '#CD7F32',
                      color: '#000'
                    }}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p 
                      className="text-sm font-medium"
                      style={{ color: theme.palette.text.primary }}
                    >
                      {asset.asset_name}
                    </p>
                    {asset.category && (
                      <p 
                        className="text-xs"
                        style={{ color: theme.palette.text.secondary }}
                      >
                        {asset.category}
                      </p>
                    )}
                  </div>
                </div>
                <span 
                  className="text-sm font-semibold"
                  style={{ color: theme.palette.primary.main }}
                >
                  {asset.request_count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
