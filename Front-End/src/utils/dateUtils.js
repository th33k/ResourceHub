export const getMonthLabels = () => {
  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentMonth = new Date().getMonth(); // Get the current month index (0 for Jan, 11 for Dec)

  // Reorder the month labels so the current month is first
  const reorderedLabels = [
    ...monthLabels.slice(currentMonth),
    ...monthLabels.slice(0, currentMonth),
  ];

  return reorderedLabels;
};
