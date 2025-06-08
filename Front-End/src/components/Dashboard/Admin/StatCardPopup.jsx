import { Line } from 'react-chartjs-2';
import { X } from 'lucide-react';
import { Dialog, useTheme } from '@mui/material';

export const StatCardPopup = ({
  open,
  onClose,
  title,
  subtitle,
  value,
  chartData,
}) => {
  const theme = useTheme();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: chartData?.labels || [],
    datasets: [
      {
        data: chartData?.data || [],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
    ],
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <div
        style={{
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        className="p-4 sm:p-6 rounded-lg max-h-[90vh] overflow-y-auto scrollbar-hide"
      >
        <div className="flex justify-between items-start mb-4 sm:mb-6 gap-2">
          <div>
            <h2
              style={{ color: theme.palette.text.primary }}
              className="text-lg sm:text-xl font-semibold"
            >
              {title}
            </h2>
            <p
              style={{ color: theme.palette.text.secondary }}
              className="text-xs sm:text-sm"
            >
              {subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ color: theme.palette.text.secondary }}
            className="hover:opacity-80"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 sm:mb-8">
          <div
            style={{ color: theme.palette.text.secondary }}
            className="text-xs sm:text-sm mb-1 sm:mb-2"
          >
            Current Value
          </div>
          <div
            style={{ color: theme.palette.text.primary }}
            className="text-2xl sm:text-3xl font-bold"
          >
            {value}
          </div>
        </div>

        {chartData && (
          <div className="aspect-[16/9] w-full">
            <Line options={options} data={data} />
          </div>
        )}
      </div>
    </Dialog>
  );
};
