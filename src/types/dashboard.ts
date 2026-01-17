export type TrendDirection = 'up' | 'down' | 'neutral';

export interface DashboardStat {
    label: string;
    value: string;
    trendValue: string;
    trendDirection: TrendDirection;
    comparedToLabel: string;
    sparklineData?: number[];
}

export interface RevenueData {
    totalRevenue: number;
    stats: DashboardStat[];
    history: { date: string; value: number }[]; // Raw data: date string -> value
}

export interface Campaign {
    id: string;
    title: string;
    status: 'draft' | 'in_progress' | 'archived';
    platform: 'facebook' | 'google' | 'instagram' | 'linkedin';
    startDate?: string;
    endDate?: string;
    lastUpdated: string;
    assignees: string[]; // URLs to avatars
}
