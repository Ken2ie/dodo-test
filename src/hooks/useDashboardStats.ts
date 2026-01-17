import { useGetRevenueStatsQuery } from '@/services/analytics.api';
import { useTenant } from './useTenant';

export const useDashboardStats = (timeRange?: string, status?: string) => {
    const { tenantId } = useTenant();

    const revenueQuery = useGetRevenueStatsQuery(
        { userId: tenantId, filter: { timeRange, status } },
        { skip: !tenantId }
    );

    return {
        revenue: revenueQuery.data,
        isLoading: revenueQuery.isLoading,
        isFetching: revenueQuery.isFetching,
        error: revenueQuery.error,
    };
};
