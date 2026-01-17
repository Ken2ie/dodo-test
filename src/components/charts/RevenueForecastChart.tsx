import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { useCrmAnalytics } from "@/hooks/useCrmAnalytics";
import { useGetDealsQuery } from "@/services/crm.api";
import { useTenant } from "@/hooks/useTenant";
import { useMemo } from "react";
import { formatDate } from "@/utils/date";
import { CHART_COLORS } from "@/config/colors";

export function RevenueForecastChart() {
    const { tenantId } = useTenant();
    const { data: deals = [] } = useGetDealsQuery(tenantId);
    const { dealsOverTime } = useCrmAnalytics(deals);

    const chartData = useMemo(() => {
        return Object.entries(dealsOverTime)
            .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
            .map(([date, count]) => ({
                date: new Date(date),
                label: formatDate(date),
                count
            }));
    }, [dealsOverTime]);

    if (chartData.length === 0) {
        return null;
    }

    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle>Deal Volume Forecast</CardTitle>
                <CardDescription>
                    New deals created over time
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={CHART_COLORS.info} stopOpacity={0.1} />
                                    <stop offset="95%" stopColor={CHART_COLORS.info} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={CHART_COLORS.grid} />
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: CHART_COLORS.axis }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: CHART_COLORS.axis }}
                                allowDecimals={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: CHART_COLORS.tooltipBg,
                                    borderColor: CHART_COLORS.tooltipBorder,
                                    color: CHART_COLORS.tooltipText,
                                    borderRadius: '8px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke={CHART_COLORS.info}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorDeals)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}