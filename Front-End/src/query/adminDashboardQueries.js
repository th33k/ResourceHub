import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URLS } from '../services/api/config';

export function useAdminDashboardData() {
  return useQuery({
    queryKey: ['adminDashboardData'],
    queryFn: async () => {
      const [statsRes, resourcesRes, mealRes, resourceAllocRes] =
        await Promise.all([
          axios.get(`${BASE_URLS.dashboardAdmin}/stats`),
          axios.get(`${BASE_URLS.dashboardAdmin}/resources`),
          axios.get(`${BASE_URLS.dashboardAdmin}/mealdistribution`),
          axios.get(`${BASE_URLS.dashboardAdmin}/resourceallocation`),
        ]);
      return {
        stats: statsRes.data,
        resources: resourcesRes.data,
        mealData: mealRes.data,
        resourceData: resourceAllocRes.data,
      };
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
  });
}
