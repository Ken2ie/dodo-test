import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useCrmAnalytics } from "@/hooks/useCrmAnalytics";
import { useGetDealsQuery } from "@/services/crm.api";
import { useTenant } from "@/hooks/useTenant";
import { filterDeals } from "@/utils/filterDeals";

interface RevenueForecastChartProps {
    timeRange?: string;
    status?: string;
}

export function RevenueForecastChart({ timeRange, status }: RevenueForecastChartProps) {
    const { tenantId } = useTenant();
    const { data: deals = [] } = useGetDealsQuery(tenantId);

    const filteredDeals = filterDeals(deals, { timeRange, status });
    const { dealsOverTime } = useCrmAnalytics(filteredDeals);

    const data = Object.entries(dealsOverTime)
        .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
        .map(([date, count]) => ({
            name: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            deals: count,
            revenue: count * 15000 // Mock avg value projection
        }));

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="var(--primary)"
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}