import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { getAuthHeader } from '../../../utils/authHeader';
import { BASE_URLS } from '../../../services/api/config';
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
          return `${tooltipItem.label}: ${tooltipItem.raw} available`;
        },
        title: function (tooltipItems) {
          return 'Available Resources';
        },
        afterLabel: function (tooltipItem) {
          const total = tooltipItem.dataset.data.reduce((sum, value) => sum + value, 0);
          const percentage = ((tooltipItem.raw / total) * 100).toFixed(1);
          return `${percentage}% of total available`;
        },
      },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  onHover: (event, elements) => {
    event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
  },
};

const COLORS = [
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
];

// Updated to be self-contained with date functionality
export const ResourceAllocation = ({ date }) => {
  // If no date prop, use today in YYYY-MM-DD
  const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const initialDate = date || getToday();

  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [data, setData] = useState(null);
  const [mostRequestedAssets, setMostRequestedAssets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    // Fetch both resource allocation and most requested assets
    Promise.all([
      axios.get(`${BASE_URLS.dashboardAdmin}/resourceallocation?date=${selectedDate}`, {
        headers: { ...getAuthHeader() },
      }),
      axios.get(`${BASE_URLS.dashboardAdmin}/mostrequestedasset?date=${selectedDate}`, {
        headers: { ...getAuthHeader() },
      })
    ])
      .then(([resourceRes, topAssetsRes]) => {
        setData(resourceRes.data);
        setMostRequestedAssets(topAssetsRes.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      });
  }, [selectedDate]);

  if (loading) {
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
          height: '100%',
        }}
        className="p-6 rounded-lg"
      >
        <h2
          className="mb-2 text-xl font-semibold"
          style={{ color: theme.palette.text.primary }}
        >
          Available Resources
        </h2>
        <div className="flex justify-end w-full mb-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-2 py-1 text-sm border rounded"
            style={{
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          />
        </div>
        <div>Loading available resources...</div>
      </div>
    );
  }

  if (error) {
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
          height: '100%',
        }}
        className="p-6 rounded-lg"
      >
        <h2
          className="mb-2 text-xl font-semibold"
          style={{ color: theme.palette.text.primary }}
        >
          Available Resources
        </h2>
        <div className="flex justify-end w-full mb-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-2 py-1 text-sm border rounded"
            style={{
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          />
        </div>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  let chartContent;
  if (!data || data.length === 0) {
    chartContent = (
      <div
        className="flex items-center justify-center flex-1 text-gray-500"
        style={{ minHeight: 180 }}
      >
        No available resources for selected date.
      </div>
    );
  } else {
    const chartData = {
      labels: data.map((item) => item.category),
      datasets: [
        {
          data: data.map((item) => item.allocated),
          backgroundColor: COLORS,
          borderWidth: 1,
          hoverBackgroundColor: COLORS.map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')),
          hoverBorderWidth: 2,
          hoverBorderColor: '#fff',
        },
      ],
    };
    chartContent = <Doughnut data={chartData} options={options} />;
  }

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
        height: '100%',
      }}
      className="p-6 rounded-lg"
    >
      <h2
        className="mb-2 text-xl font-semibold"
        style={{ color: theme.palette.text.primary }}
      >
        Available Resources
      </h2>
      <p
        className="mb-6 text-sm"
        style={{ color: theme.palette.text.secondary }}
      >
        Available resources by category for the selected date
      </p>
      {chartContent}
      <div className="flex justify-center w-full mt-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-2 py-1 text-sm border rounded"
          style={{
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        />
      </div>
      
      {/* Top 3 Most Requested Assets Section */}
      {mostRequestedAssets && mostRequestedAssets.length > 0 && (
        <div className="w-full mt-4">
          <h3
            className="mb-3 text-sm font-medium text-center"
            style={{ color: theme.palette.text.primary }}
          >
            Most Requested Assets Today
          </h3>
          <div className="flex justify-center gap-4">
            {mostRequestedAssets.slice(0, 3).map((asset, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-2 rounded-lg"
                style={{
                  background: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 mb-1 text-xs font-bold text-white rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                >
                  {index + 1}
                </div>
                <span
                  className="text-xs font-medium text-center"
                  style={{ color: theme.palette.text.primary }}
                >
                  {asset.asset_name}
                </span>
                <span
                  className="text-xs"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {asset.category}
                </span>
                <span
                  className="text-xs"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {asset.request_count} requests
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
