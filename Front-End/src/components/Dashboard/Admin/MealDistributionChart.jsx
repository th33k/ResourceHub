import React, { useState, useEffect } from 'react';
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
import { useTheme, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { getAuthHeader } from '../../../utils/authHeader';
import { BASE_URLS } from '../../../services/api/config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const MealDistributionChart = () => {
  const theme = useTheme();
  const [filterType, setFilterType] = useState('meals');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get the short name of a day
  const getDayShortName = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  // Generate labels for past 6 days, today, and tomorrow (8 days) based on selected date
  const generateLabels = () => {
    const labels = [];
    const baseDate = new Date(selectedDate);
    
    // Generate 7 days: 6 days before selected date + selected date
    for (let i = 6; i >= 0; i--) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() - i);
      if (i === 0) {
        labels.push(getDayShortName(date) + ' (Selected)');
      } else {
        labels.push(getDayShortName(date));
      }
    }
    
    // Add tomorrow
    const tomorrow = new Date(baseDate);
    tomorrow.setDate(baseDate.getDate() + 1);
    labels.push(getDayShortName(tomorrow) + ' (Tomorrow)');
    
    return labels;
  };

  // Fetch data based on filter type and selected date
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let endpoint = '';
        switch (filterType) {
          case 'meals':
            endpoint = `${BASE_URLS.dashboardAdmin}/mealdistribution?date=${selectedDate}`;
            break;
          case 'assets':
            endpoint = `${BASE_URLS.dashboardAdmin}/assetdistribution?date=${selectedDate}`;
            break;
          case 'services':
            endpoint = `${BASE_URLS.dashboardAdmin}/servicesdistribution?date=${selectedDate}`;
            break;
          default:
            endpoint = `${BASE_URLS.dashboardAdmin}/mealdistribution?date=${selectedDate}`;
        }

        const response = await axios.get(endpoint, {
          headers: { ...getAuthHeader() },
        });
        
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        setData({ labels: [], datasets: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterType, selectedDate]);

  const getChartTitle = () => {
    switch (filterType) {
      case 'meals':
        return 'Meal Distribution';
      case 'assets':
        return 'Asset Request Distribution';
      case 'services':
        return 'Service Request Distribution';
      default:
        return 'Distribution Chart';
    }
  };

  const getChartDescription = () => {
    switch (filterType) {
      case 'meals':
        return 'Weekly meal service trends';
      case 'assets':
        return 'Weekly asset request trends by category';
      case 'services':
        return 'Weekly maintenance service request trends';
      default:
        return 'Weekly trends';
    }
  };

  // Find the maximum value in all datasets
  let maxValue = 0;
  if (Array.isArray(data.datasets)) {
    data.datasets.forEach((ds) => {
      if (Array.isArray(ds.data)) {
        const localMax = Math.max(...ds.data);
        if (localMax > maxValue) maxValue = localMax;
      }
    });
  }

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
        max: maxValue + 3,
        ticks: {
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
            return '';
          },
          stepSize: 1,
        },
      },
    },
  };

  const chartData = {
    labels: data.labels || generateLabels(),
    datasets:
      Array.isArray(data.datasets) && data.datasets.length > 0
        ? data.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data || [],
          }))
        : [],
  };

  if (loading) {
    return (
      <div
        style={{
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[1],
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="p-6 rounded-lg"
      >
        <div>Loading...</div>
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
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="p-6 rounded-lg"
      >
        <div style={{ color: theme.palette.error.main }}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
      }}
      className="p-6 rounded-lg"
    >
      {/* Header with filters */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2
            className="mb-2 text-xl font-semibold"
            style={{ color: theme.palette.text.primary }}
          >
            {getChartTitle()}
          </h2>
          <p
            className="text-sm"
            style={{ color: theme.palette.text.secondary }}
          >
            {getChartDescription()}
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex gap-3">
          <FormControl size="small" style={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Type"
              style={{
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            >
              <MenuItem value="meals">Meals</MenuItem>
              <MenuItem value="assets">Assets</MenuItem>
              <MenuItem value="services">Services</MenuItem>
            </Select>
          </FormControl>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 text-sm border rounded"
            style={{
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
            }}
          />
        </div>
      </div>
      
      {/* Chart */}
      <div className="mt-4">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};
