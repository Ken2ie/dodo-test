import { Deal } from '@/types/crm';

export const selectDealsByStage = (deals: Deal[]) => {
    return deals.reduce((acc, deal) => {
        acc[deal.stage] = (acc[deal.stage] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
};

export const selectDealsBySource = (deals: Deal[]) => {
    return deals.reduce((acc, deal) => {
        const source = deal.source || 'unknown';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
};

export const selectDealsOverTime = (deals: Deal[]) => {
    return deals.reduce((acc, deal) => {
        const date = new Date(deal.createdAt).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
};

export const selectTotalDeals = (deals: Deal[]) => deals.length;

export const selectTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
};
export const STAGE_LABELS = {
    lead: 'Lead',
    contacted: 'Contacted',
    proposal: 'Proposal',
    negotiation: 'Negotiation',
    closed_won: 'Won',
    closed_lost: 'Lost'
};

export const STAGE_COLORS = {
    lead: '#94a3b8',
    contacted: '#60a5fa',
    proposal: '#818cf8',
    negotiation: '#c084fc',
    closed_won: '#34d399',
    closed_lost: '#f87171'
};

export const selectDealStageChartData = (dealsByStage: Record<string, number>) => {
    return Object.entries(dealsByStage)
        .filter(([_, count]) => count > 0)
        .map(([stage, count]) => ({
            name: STAGE_LABELS[stage as keyof typeof STAGE_LABELS],
            value: count,
            color: STAGE_COLORS[stage as keyof typeof STAGE_COLORS]
        }));
};

export const selectDealsBySourceChartData = (dealsBySource: Record<string, number>) => {
    return Object.entries(dealsBySource).map(([source, count]) => ({
        name: source.charAt(0).toUpperCase() + source.slice(1),
        count
    }));
};
