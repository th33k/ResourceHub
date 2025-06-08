import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';

export const QuickActions = ({ actions }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleAction = (path) => {
    if (path) {
      navigate(path);
    } else {
      console.warn('Action triggered with no path defined.');
    }
  };

  if (!actions || actions.length === 0) {
    return <div className="p-4 text-gray-500">No quick actions available.</div>;
  }

  return (
    <div
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
      }}
      className="rounded-lg p-6"
    >
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: theme.palette.text.primary }}
      >
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => handleAction(action.path)}
            className="flex items-center gap-3 p-3 rounded-lg w-full transition-colors"
            style={{
              background: theme.palette.action.hover,
              color: theme.palette.text.primary,
            }}
          >
            {action.icon && (
              <action.icon
                className={`${action.iconColor || 'text-gray-500'} mb-2`}
                size={24}
              />
            )}
            <span>{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
