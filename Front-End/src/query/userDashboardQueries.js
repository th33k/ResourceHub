import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URLS } from '../services/api/config';

export function useUserDashboardData() {
  return useQuery({
    queryKey: ['userDashboardData'],
    queryFn: async () => {
      const userId = localStorage.getItem('Userid');
      const [statsResponse, activitiesResponse] = await Promise.all([
        axios.get(`${BASE_URLS.dashboardUser}/stats/${userId}`),
        axios.get(`${BASE_URLS.dashboardUser}/activities/${userId}`),
      ]);
      return {
        stats: Array.isArray(statsResponse.data)
          ? statsResponse.data
          : [
              {
                title: 'My Meals Today',
                value: statsResponse.data.mealsToday,
                icon: 'Utensils',
                monthlyData: statsResponse.data.mealsMonthlyData || [],
              },
              {
                title: 'My Assets',
                value: statsResponse.data.assets,
                icon: 'Box',
                monthlyData: statsResponse.data.assetsMonthlyData || [],
              },
              {
                title: 'My Maintenance Requests',
                value: statsResponse.data.maintenanceRequests,
                icon: 'Wrench',
                monthlyData: statsResponse.data.maintenanceMonthlyData || [],
              },
            ],
        recentActivities: activitiesResponse.data,
      };
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
  });
}
