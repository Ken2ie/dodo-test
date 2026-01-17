import { RevenueData } from '@/types/dashboard';

export const selectRevenueChartData = (revenue: RevenueData | undefined) => {
    if (!revenue?.history) return [];

    return revenue.history.map(item => {
        const date = new Date(item.date);
        return {
            name: date.toLocaleString('default', { month: 'short' }),
            revenue: item.value
        };
    });
};

export const selectRevenueForecastData = (dealsOverTime: Record<string, number>) => {
    return Object.entries(dealsOverTime)
        .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
        .map(([date, count]) => ({
            name: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            deals: count,
            revenue: count * 15000 // Mock avg value projection
        }));
};
