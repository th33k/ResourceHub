import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Updated to accept dynamic data as props
export const MealDistributionChart = ({ data }) => {
  const theme = useTheme();
  // Use dynamic labels from data.labels, fallback to empty array
  const chartData = {
    labels: Array.isArray(data.labels) ? data.labels : [],
    datasets:
      Array.isArray(data.datasets) && data.datasets.length > 0
        ? data.datasets
        : [],
  };

  return (
    <div
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
      }}
      className="p-6 rounded-lg"
    >
      <h2
        className="text-xl font-semibold mb-2"
        style={{ color: theme.palette.text.primary }}
      >
        Meal Distribution
      </h2>
      <p
        className="text-sm mb-6"
        style={{ color: theme.palette.text.secondary }}
      >
        Weekly meal service trends
      </p>
      <Line options={options} data={chartData} />
    </div>
  );
};
