export type DealStage = 'lead' | 'contacted' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

export interface Deal {
    id: string;
    title: string;
    value: number;
    stage: DealStage;
    companyName: string;
    contactName: string;
    source: 'referral' | 'website' | 'outbound' | 'linkedin';
    closingDate: string; // ISO date
    createdAt: string;
    userId: string; // Maps to Tenant/Persona ID
}

export interface PipelineMetrics {
    totalValue: number;
    dealCount: number;
    winRate: number; // percentage
    avgDealSize: number;
    dealsByStage: Record<DealStage, number>;
    dealsBySource: Record<string, number>;
    revenueForecast: Record<string, number>; // date -> value
}
