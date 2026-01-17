import { useMemo } from 'react';
import { Deal, DealStage } from '@/types/crm';
import {
    selectDealsByStage,
    selectDealsBySource,
    selectDealsOverTime,
    selectTotalDeals,
    selectTotalValue
} from '@/selectors/crm.selectors';

interface CrmAnalytics {
    dealsByStage: Record<string, number>;
    dealsBySource: Record<string, number>;
    dealsOverTime: Record<string, number>;
    totalDeals: number;
    totalValue: number;
}

export const useCrmAnalytics = (deals: Deal[] = []): CrmAnalytics => {
    const dealsByStage = useMemo(() => selectDealsByStage(deals), [deals]);
    const dealsBySource = useMemo(() => selectDealsBySource(deals), [deals]);
    const dealsOverTime = useMemo(() => selectDealsOverTime(deals), [deals]);
    const totalDeals = useMemo(() => selectTotalDeals(deals), [deals]);
    const totalValue = useMemo(() => selectTotalValue(deals), [deals]);

    return {
        dealsByStage,
        dealsBySource,
        dealsOverTime,
        totalDeals,
        totalValue
    };
};
