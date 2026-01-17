import { api } from './api';
import { RevenueData, DashboardStat } from '@/types/dashboard';
import { MOCK_DEALS } from '@/data/deals';
import { Deal } from '@/types/crm';

// Helper to calculate metrics from deals
const calculateMetrics = (deals: Deal[]): RevenueData => {
    const totalPipelineValue = deals
        .filter(d => d.stage !== 'closed_lost')
        .reduce((sum, d) => sum + d.value, 0);

    const wonDeals = deals.filter(d => d.stage === 'closed_won');
    const lostDeals = deals.filter(d => d.stage === 'closed_lost');
    const closedCount = wonDeals.length + lostDeals.length;

    // Avoid division by zero
    const winRate = closedCount > 0
        ? Math.round((wonDeals.length / closedCount) * 100)
        : 0;

    const avgDealSize = deals.length > 0
        ? Math.round(totalPipelineValue / deals.length)
        : 0;

    // Generate mock history (last 6 months)
    const history = [
        { date: '2023-07-01', value: totalPipelineValue * 0.4 },
        { date: '2023-08-01', value: totalPipelineValue * 0.5 },
        { date: '2023-09-01', value: totalPipelineValue * 0.6 },
        { date: '2023-10-01', value: totalPipelineValue * 0.8 },
        { date: '2023-11-01', value: totalPipelineValue * 0.9 },
        { date: '2023-12-01', value: totalPipelineValue },
    ];

    const stats: DashboardStat[] = [
        {
            label: 'Total Pipeline',
            value: `$${totalPipelineValue.toLocaleString()}`,
            trendValue: '12%',
            trendDirection: 'up',
            comparedToLabel: 'vs last month',
            sparklineData: [100, 120, 110, 140, 150, 160, 180]
        },
        {
            label: 'Win Rate',
            value: `${winRate}%`,
            trendValue: '4%',
            trendDirection: 'up',
            comparedToLabel: 'vs target',
            sparklineData: [45, 48, 50, 49, 52, 55, winRate]
        },
        {
            label: 'Avg Deal Size',
            value: `$${avgDealSize.toLocaleString()}`,
            trendValue: '2%',
            trendDirection: 'neutral',
            comparedToLabel: 'vs industry',
            sparklineData: [5000, 5200, 5100, 5300, 5250, 5400, 5300]
        }
    ];

    return {
        totalRevenue: totalPipelineValue,
        stats,
        history
    };
};

export interface RevenueStatsFilter {
    timeRange?: string;
    status?: string;
}

export const analyticsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRevenueStats: build.query<RevenueData, { userId: string; filter?: RevenueStatsFilter }>({
            queryFn: async ({ userId, filter }) => {
                await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network latency
                // Filter deals for the specific user
                let userDeals = MOCK_DEALS.filter(d => d.userId === userId);

                // Apply Filters
                if (filter?.status && filter.status !== 'all') {
                    if (filter.status === 'closed') {
                        userDeals = userDeals.filter(d => ['closed_won', 'closed_lost'].includes(d.stage));
                    } else if (filter.status === 'active') {
                        userDeals = userDeals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage));
                    } else if (filter.status === 'pending') {
                        userDeals = userDeals.filter(d => ['proposal', 'negotiation'].includes(d.stage));
                    }
                }

                if (filter?.timeRange) {
                    const now = new Date();
                    const dealDate = (d: Deal) => new Date(d.createdAt);

                    if (filter.timeRange === 'this_month') {
                        userDeals = userDeals.filter(d => {
                            const date = dealDate(d);
                            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                        });
                    } else if (filter.timeRange === 'last_month') {
                        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                        userDeals = userDeals.filter(d => {
                            const date = dealDate(d);
                            return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
                        });
                    } else if (filter.timeRange === 'this_quarter') {
                        const currentQuarter = Math.floor((now.getMonth() + 3) / 3);
                        userDeals = userDeals.filter(d => {
                            const date = dealDate(d);
                            const quarter = Math.floor((date.getMonth() + 3) / 3);
                            return quarter === currentQuarter && date.getFullYear() === now.getFullYear();
                        });
                    } else if (filter.timeRange === 'this_year') {
                        userDeals = userDeals.filter(d => dealDate(d).getFullYear() === now.getFullYear());
                    }
                }

                const data = calculateMetrics(userDeals);
                return { data };
            },
            providesTags: ['Task'],
        }),
    }),
    overrideExisting: true,
});

export const { useGetRevenueStatsQuery } = analyticsApi;
