"use client";

import { StatCard } from "@/components/ui/StatCard";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export function RevenueStats() {
    const { revenue, isLoading } = useDashboardStats();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-xl" />
                ))}
            </div>
        );
    }

    if (!revenue) return null;

    return (
        <div className="col-span-3">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-gray-100">
                    {revenue.stats.map((stat, index) => (
                        <div key={index} className="p-6">
                            <StatCard
                                title={stat.label}
                                value={stat.value}
                                trend={stat.trendValue}
                                trendDirection={stat.trendDirection}
                                comparedTo={stat.comparedToLabel}
                                sparklineData={stat.sparklineData}
                                variant="clean"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
