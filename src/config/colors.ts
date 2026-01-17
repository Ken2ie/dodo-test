export const CHART_COLORS = {
    // Semantic Names
    primary: 'var(--chart-1)',
    success: 'var(--chart-2)',
    warning: 'var(--chart-3)',
    info: 'var(--chart-4)',
    danger: 'var(--chart-5)',

    // UI Elements
    axis: 'var(--muted-foreground)',
    grid: 'var(--border)',
    tooltipBg: 'var(--card)',
    tooltipBorder: 'var(--border)',
    tooltipText: 'var(--card-foreground)',
};

export const STAGE_COLORS = {
    lead: 'var(--chart-4)',       // info
    contacted: 'var(--chart-1)',  // primary
    proposal: 'var(--chart-3)',   // warning
    negotiation: '#d97706',       // dark amber (custom)
    closed_won: 'var(--chart-2)', // success
    closed_lost: 'var(--chart-5)' // danger
};
