import { useTheme } from '@mui/material';

export const ResourceCard = ({ title, total, highPriority, progress }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
      }}
      className="rounded-lg p-6 hover:shadow-lg transition-all"
    >
      <h3
        className="font-medium mb-4"
        style={{ color: theme.palette.text.primary }}
      >
        {title}
      </h3>
      <div
        className="h-2 rounded-full mb-4"
        style={{ background: theme.palette.action.disabledBackground }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
          }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span style={{ color: theme.palette.text.secondary }}>
          Total: {total}
        </span>
        <span style={{ color: theme.palette.text.secondary }}>
          High Priority: {highPriority}
        </span>
      </div>
    </div>
  );
};
