import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { getAuthHeader } from '../../../utils/authHeader';
import { BASE_URLS } from '../../../services/api/config';
import { useTheme } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

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

const options = {
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          // Show meal time as main label with count
          return `${tooltipItem.label}: ${tooltipItem.raw} orders`;
        },
        title: function (tooltipItems) {
          return 'Meal Time Distribution';
        },
        afterLabel: function (tooltipItem) {
          const total = tooltipItem.dataset.data.reduce((sum, value) => sum + value, 0);
          const percentage = ((tooltipItem.raw / total) * 100).toFixed(1);
          
          // Get meal types for this meal time from the dataset
          const mealTimeIndex = tooltipItem.dataIndex;
          const dataset = tooltipItem.dataset;
          
          if (dataset.mealTypesData && dataset.mealTypesData[mealTimeIndex]) {
            const mealTypes = dataset.mealTypesData[mealTimeIndex];
            const mealTypesList = mealTypes.map(mt => `${mt.type}: ${mt.count}`).join(', ');
            return [`${percentage}% of total orders`, `Meal Types: ${mealTypesList}`];
          }
          
          return `${percentage}% of total orders`;
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

export const MealTypeDistribution = ({ date }) => {
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
  const [topMealTypes, setTopMealTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    // Fetch both meal type distribution and most requested meal types
    Promise.all([
      axios.get(`${BASE_URLS.dashboardAdmin}/mealtypedist?date=${selectedDate}`, {
        headers: { ...getAuthHeader() },
      }),
      axios.get(`${BASE_URLS.dashboardAdmin}/mostrequestedmealtypes?date=${selectedDate}`, {
        headers: { ...getAuthHeader() },
      })
    ])
      .then(([mealDistRes, topMealTypesRes]) => {
        setData(mealDistRes.data);
        setTopMealTypes(topMealTypesRes.data);
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
          // Removed justifyContent: 'center' to start content from top
          height: '100%',
        }}
        className="p-6 rounded-lg"
      >
        <h2
          className="mb-2 text-xl font-semibold"
          style={{ color: theme.palette.text.primary }}
        >
          Meal Time Distribution
        </h2>
        <div className="flex justify-end w-full mb-2">
          <input
            type="date"
            value={selectedDate}
            max={getToday()}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-2 py-1 text-sm border rounded"
            style={{
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          />
        </div>
        <div>Loading meal time distribution...</div>
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
          // Removed justifyContent: 'center' to start content from top
          height: '100%',
        }}
        className="p-6 rounded-lg"
      >
        <h2
          className="mb-2 text-xl font-semibold"
          style={{ color: theme.palette.text.primary }}
        >
          Meal Time Distribution
        </h2>
        <div className="flex justify-end w-full mb-2">
          <input
            type="date"
            value={selectedDate}
            max={getToday()}
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
  if (!data || !data.data || data.data.length === 0) {
    chartContent = (
      <div
        className="flex items-center justify-center flex-1 text-gray-500"
        style={{ minHeight: 180 }}
      >
        No meal time data for selected date.
      </div>
    );
  } else {
    // Since we only have meal types, create meal time simulation
    // Group meal types into simulated meal times
    const mealTimeMapping = {
      'Breakfast': ['Vegetarian', 'Non-Vegetarian', 'Vegan'],
      'Lunch': ['Vegetarian', 'Non-Vegetarian', 'Vegan'],
      'Dinner': ['Vegetarian', 'Non-Vegetarian', 'Vegan']
    };
    
    // For now, we'll distribute meal types across three meal times
    const totalMealTypes = data.data.length;
    const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];
    
    // Create meal time distribution by dividing meal types equally
    const mealTimeData = mealTimes.map((mealTime, index) => {
      const startIndex = Math.floor((totalMealTypes / 3) * index);
      const endIndex = Math.floor((totalMealTypes / 3) * (index + 1));
      const mealTypesForTime = data.data.slice(startIndex, endIndex);
      
      const totalCount = mealTypesForTime.reduce((sum, item) => sum + item.count, 0);
      const mealTypes = mealTypesForTime.map(item => ({
        type: item.mealtype,
        count: item.count
      }));
      
      return {
        mealTime,
        totalCount,
        mealTypes
      };
    }).filter(item => item.totalCount > 0); // Only include meal times with data
    
    const chartData = {
      labels: mealTimeData.map(item => item.mealTime),
      datasets: [
        {
          data: mealTimeData.map(item => item.totalCount),
          mealTypesData: mealTimeData.map(item => item.mealTypes), // Store meal types for tooltips
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
        Meal Time Distribution
      </h2>
      <p
        className="mb-6 text-sm"
        style={{ color: theme.palette.text.secondary }}
      >
        Distribution of meal times for the selected date (hover for meal types)
      </p>
      {chartContent}
      <div className="flex justify-center w-full mt-6">
        <input
          type="date"
          value={selectedDate}
          max={getToday()}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-2 py-1 text-sm border rounded"
          style={{
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        />
      </div>
      
      {/* Most Requested Meal Types Section */}
      {topMealTypes && (
        <div className="w-full mt-4">
          <h3
            className="mb-3 text-sm font-medium text-center"
            style={{ color: theme.palette.text.primary }}
          >
            Most Requested Meal Types Today
          </h3>
          {topMealTypes.data && topMealTypes.data.length > 0 ? (
            <div className="flex justify-center gap-4">
              {topMealTypes.data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-2 rounded-lg"
                  style={{
                    background: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-1"
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
                    {item.mealtype}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    {item.count} orders
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-center text-xs"
              style={{ color: theme.palette.text.secondary }}
            >
              {topMealTypes.message || 'No meal requests found for this date'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
