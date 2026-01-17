"use client";

import { useState } from "react";

import Link from "next/link";
import { SIDEBAR_ROUTES } from "@/config/routes";
import { Select } from "@/components/ui/Select";
import { formatCurrency } from "@/utils/format";
import { RevenueStats } from "@/components/dashboard/RevenueStats";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { DealStageChart } from "@/components/charts/DealStageChart";
import { DealsBySourceChart } from "@/components/charts/DealsBySourceChart";
import { RevenueForecastChart } from "@/components/charts/RevenueForecastChart";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { Calendar, CalendarClock, CalendarRange, Filter, Activity, Clock, CheckCircle2 } from "lucide-react";

import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { useGetDealsQuery } from "@/services/crm.api";
import { useTenant } from "@/hooks/useTenant";

export default function Home() {
  const [timeRange, setTimeRange] = useState<string>("this_month");
  const [status, setStatus] = useState<string>("all");
  const { tenantId } = useTenant();
  const { revenue, isFetching: isStatsLoading } = useDashboardStats(timeRange, status);
  const { isFetching: isDealsLoading } = useGetDealsQuery(tenantId);

  const isLoading = isStatsLoading || isDealsLoading;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Render Filter Placeholders to avoid layout shift, or just full skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-8 w-48 bg-muted animate-pulse rounded" />
            <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          </div>
          <div className="flex gap-2">
            <div className="w-[160px] h-10 bg-muted animate-pulse rounded" />
            <div className="w-[160px] h-10 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <DashboardSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="text-muted-foreground text-[30px] font-bold mb-1">Total Pipeline Value</div>
          <span className="text-[30px] mt-[-10px] bg-gradient-to-r from-orange-300 to-orange-600 text-transparent bg-clip-text font-bold tracking-tight text-foreground">
            {revenue ? formatCurrency(revenue.totalRevenue) : "..."}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:w-full">
          <Select
            // Time Range Filter
            value={timeRange}
            onChange={setTimeRange}
            options={[
              { label: "This Month", value: "this_month", icon: CalendarRange },
              { label: "Last Month", value: "last_month", icon: CalendarClock },
              { label: "This Quarter", value: "this_quarter", icon: Calendar },
              { label: "This Year", value: "this_year", icon: Calendar },
            ]}
            className="w-[160px] sm:w-full border-gray-300 rounded-lg border-2"
            placeholder="Time Range"
          />
          <Select
            value={status}
            onChange={setStatus}
            options={[
              { label: "All Statuses", value: "all", icon: Filter },
              { label: "Active", value: "active", icon: Activity },
              { label: "Pending", value: "pending", icon: Clock },
              { label: "Closed", value: "closed", icon: CheckCircle2 },
            ]}
            className="w-[160px] sm:w-full border-gray-300 rounded-lg border-2"
            placeholder="Status"
          />
        </div>
      </div>

      <RevenueStats timeRange={timeRange} status={status} />

      {/* Revenue Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <RevenueChart timeRange={timeRange} status={status} />
        </div>

        {/* Pipeline Health */}
        <div className="col-span-1">
          <DealStageChart timeRange={timeRange} status={status} />
        </div>
      </div>

      {/* Pipeline Analytics Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Pipeline Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DealsBySourceChart timeRange={timeRange} status={status} />
          <div className="md:col-span-2">
            <RevenueForecastChart timeRange={timeRange} status={status} />
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-semibold">Quick Access</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Main Menu</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {SIDEBAR_ROUTES.mainMenu.filter(r => r.href !== '/').map((route) => {
                const Icon = route.icon;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group gap-3"
                  >
                    <div className="p-2 rounded-full bg-gray-50 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Icon className="w-6 h-6 text-gray-600 group-hover:text-primary" />
                    </div>
                    <span className="font-medium text-sm text-gray-700 group-hover:text-gray-900">{route.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
