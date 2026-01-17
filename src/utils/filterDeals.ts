import { Deal } from "@/types/crm";

export interface FilterOptions {
    timeRange?: string;
    status?: string;
}

export const filterDeals = (deals: Deal[], filter: FilterOptions): Deal[] => {
    let filteredDeals = [...deals];

    // Status Filter
    if (filter.status && filter.status !== 'all') {
        if (filter.status === 'closed') {
            filteredDeals = filteredDeals.filter(d => ['closed_won', 'closed_lost'].includes(d.stage));
        } else if (filter.status === 'active') {
            filteredDeals = filteredDeals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage));
        } else if (filter.status === 'pending') {
            filteredDeals = filteredDeals.filter(d => ['proposal', 'negotiation'].includes(d.stage));
        }
    }

    // Time Range Filter
    if (filter.timeRange) {
        const now = new Date();
        const dealDate = (d: Deal) => new Date(d.createdAt);

        if (filter.timeRange === 'this_month') {
            filteredDeals = filteredDeals.filter(d => {
                const date = dealDate(d);
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
            });
        } else if (filter.timeRange === 'last_month') {
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            filteredDeals = filteredDeals.filter(d => {
                const date = dealDate(d);
                return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
            });
        } else if (filter.timeRange === 'this_quarter') {
            const currentQuarter = Math.floor((now.getMonth() + 3) / 3);
            filteredDeals = filteredDeals.filter(d => {
                const date = dealDate(d);
                const quarter = Math.floor((date.getMonth() + 3) / 3);
                return quarter === currentQuarter && date.getFullYear() === now.getFullYear();
            });
        } else if (filter.timeRange === 'this_year') {
            filteredDeals = filteredDeals.filter(d => dealDate(d).getFullYear() === now.getFullYear());
        }
    }

    return filteredDeals;
};
