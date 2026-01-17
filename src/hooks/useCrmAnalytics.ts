import { useMemo } from 'react';
import { Deal, DealStage } from '@/types/crm';

interface CrmAnalytics {
    dealsByStage: Record<DealStage, number>;
    dealsBySource: Record<string, number>;
    valueByStage: Record<DealStage, number>;
    dealsOverTime: Record<string, number>;
    totalDeals: number;
    totalValue: number;
}

export const useCrmAnalytics = (deals: Deal[] = []): CrmAnalytics => {
    return useMemo(() => {
        const dealsByStage: Record<string, number> = {
            lead: 0,
            contacted: 0,
            proposal: 0,
            negotiation: 0,
            closed_won: 0,
            closed_lost: 0
        };
        const valueByStage: Record<string, number> = { ...dealsByStage };
        const dealsBySource: Record<string, number> = {};
        const dealsOverTime: Record<string, number> = {};
        let totalValue = 0;

        deals.forEach((deal) => {
            // Stage Counts & Value
            if (dealsByStage[deal.stage] !== undefined) {
                dealsByStage[deal.stage]++;
                valueByStage[deal.stage] += deal.value;
            }

            // Source Counts
            const source = deal.source || 'Unknown';
            dealsBySource[source] = (dealsBySource[source] || 0) + 1;

            // Total Value
            if (deal.stage !== 'closed_lost') {
                totalValue += deal.value;
            }

            // Over Time
            const date = new Date(deal.createdAt).toISOString().split('T')[0];
            dealsOverTime[date] = (dealsOverTime[date] || 0) + 1;
        });

        return {
            dealsByStage: dealsByStage as Record<DealStage, number>,
            valueByStage: valueByStage as Record<DealStage, number>,
            dealsBySource,
            dealsOverTime,
            totalDeals: deals.length,
            totalValue
        };
    }, [deals]);
};
