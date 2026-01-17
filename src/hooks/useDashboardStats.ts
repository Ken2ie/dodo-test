import { useGetRevenueStatsQuery } from '@/services/analytics.api';
import { useTenant } from './useTenant';

export const useDashboardStats = () => {
    const { tenantId } = useTenant();

    const revenueQuery = useGetRevenueStatsQuery(tenantId, { skip: !tenantId });

    return {
        revenue: revenueQuery.data,
        isLoading: revenueQuery.isLoading,
        error: revenueQuery.error,
    };
};
