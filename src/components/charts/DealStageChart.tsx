import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCrmAnalytics } from "@/hooks/useCrmAnalytics";
import { useGetDealsQuery } from "@/services/crm.api";
import { useTenant } from "@/hooks/useTenant";
import { filterDeals } from "@/utils/filterDeals";
import { ChartEmptyState } from "./ChartEmptyState";

const COLORS = {
    lead: '#94a3b8',
    contacted: '#60a5fa',
    proposal: '#818cf8',
    negotiation: '#c084fc',
    closed_won: '#34d399',
    closed_lost: '#f87171'
};

const STAGE_LABELS = {
    lead: 'Lead',
    contacted: 'Contacted',
    proposal: 'Proposal',
    negotiation: 'Negotiation',
    closed_won: 'Won',
    closed_lost: 'Lost'
};

interface DealStageChartProps {
    timeRange?: string;
    status?: string;
}

export function DealStageChart({ timeRange, status }: DealStageChartProps) {
    const { tenantId } = useTenant();
    const { data: deals = [] } = useGetDealsQuery(tenantId);

    const filteredDeals = filterDeals(deals, { timeRange, status });
    const { dealsByStage, totalDeals } = useCrmAnalytics(filteredDeals);

    const data = Object.entries(dealsByStage)
        .filter(([_, count]) => count > 0)
        .map(([stage, count]) => ({
            name: STAGE_LABELS[stage as keyof typeof STAGE_LABELS],
            value: count,
            color: COLORS[stage as keyof typeof COLORS]
        }));

    if (deals.length > 0 && data.length === 0) {
        // Data exists but all filtered out or zero
        return (
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Pipeline Health</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ChartEmptyState
                            title="No deals found"
                            description="Adjust filters to see deal stages."
                        />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Pipeline Health</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                    <div className="text-3xl font-bold">{totalDeals}</div>
                    <p className="text-xs text-muted-foreground">Total Deals</p>
                </div>
            </CardContent>
        </Card>
    );
}
