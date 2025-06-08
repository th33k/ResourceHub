import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { StatCardPopup } from './StatCardPopup';
import { useTheme } from '@mui/material';

export const StatCard = ({ title, value, previousValue, icon, chartData }) => {
  const theme = useTheme();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const getCardTextColor = () => {
    if (previousValue !== undefined) {
      if (typeof value === 'number' && typeof previousValue === 'number') {
        if (value > previousValue) return 'text-green-500';
        if (value < previousValue) return 'text-red-500';
      }
    }
    return 'text-black';
  };

  const getSubtitle = () => {
    switch (title) {
      case 'Total Employees':
        return 'Active employees in the system';
      case 'Today Total meals':
        return 'Meals served today';
      case 'Due Assets':
        return 'Assets pending return';
      case 'New Maintenance':
        return 'New maintenance requests';
      default:
        return '';
    }
  };

  return (
    <>
      <div
        style={{
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[1],
        }}
        className="rounded-lg p-6 cursor-pointer transition-all"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="flex items-center justify-between mb-2">
          <h3
            style={{ color: theme.palette.text.secondary }}
            className="text-sm font-medium flex items-center gap-2"
          >
            {title}
            <ChevronDown size={16} className="text-gray-400" />
          </h3>
          {icon}
        </div>
        <p
          className="text-3xl font-bold"
          style={{ color: theme.palette.text.primary }}
        >
          {value}
        </p>
      </div>

      <StatCardPopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={title}
        subtitle={getSubtitle()}
        value={value}
        chartData={chartData}
      />
    </>
  );
};
