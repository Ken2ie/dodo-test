"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCrmAnalytics } from "@/hooks/useCrmAnalytics";
import { useGetDealsQuery } from "@/services/crm.api";
import { useTenant } from "@/hooks/useTenant";
import { filterDeals } from "@/utils/filterDeals";
import { ChartEmptyState } from "./ChartEmptyState";

interface DealsBySourceChartProps {
    timeRange?: string;
    status?: string;
}

export function DealsBySourceChart({ timeRange, status }: DealsBySourceChartProps) {
    const { tenantId } = useTenant();
    const { data: deals = [] } = useGetDealsQuery(tenantId);

    const filteredDeals = filterDeals(deals, { timeRange, status });
    const { dealsBySource } = useCrmAnalytics(filteredDeals);

    const data = Object.entries(dealsBySource).map(([source, count]) => ({
        name: source.charAt(0).toUpperCase() + source.slice(1),
        count
    }));

    if (deals.length > 0 && data.every(d => d.count === 0)) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Deals by Source</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ChartEmptyState />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Deals by Source</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
