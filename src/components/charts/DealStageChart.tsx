import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCrmAnalytics } from "@/hooks/useCrmAnalytics";
import { useGetDealsQuery } from "@/services/crm.api";
import { useTenant } from "@/hooks/useTenant";
import { useMemo } from "react";
import { STAGE_COLORS, CHART_COLORS } from "@/config/colors";

export function DealStageChart() {
    const { tenantId } = useTenant();
    const { data: deals = [] } = useGetDealsQuery(tenantId);
    const { dealsByStage, totalDeals } = useCrmAnalytics(deals);

    const chartData = useMemo(() => {
        return Object.entries(dealsByStage).map(([stage, count]) => ({
            name: stage.replace('_', ' ').toUpperCase(),
            value: count,
            fill: STAGE_COLORS[stage as keyof typeof STAGE_COLORS] || '#E5E7EB'
        })).filter(item => item.value > 0);
    }, [dealsByStage]);

    if (!totalDeals) {
        return (
            <Card className="col-span-1 min-h-[300px] flex items-center justify-center">
                <p className="text-gray-400">No deals in pipeline</p>
            </Card>
        );
    }

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Deal Stages</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: CHART_COLORS.tooltipBg,
                                    borderColor: CHART_COLORS.tooltipBorder,
                                    color: CHART_COLORS.tooltipText,
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
