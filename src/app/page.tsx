"use client";

import Link from "next/link";
import { SIDEBAR_ROUTES } from "@/config/routes";
import { formatCurrency } from "@/utils/format";
import { RevenueStats } from "@/components/dashboard/RevenueStats";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { DealStageChart } from "@/components/charts/DealStageChart";
import { DealsBySourceChart } from "@/components/charts/DealsBySourceChart";
import { RevenueForecastChart } from "@/components/charts/RevenueForecastChart";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function Home() {
  const { revenue } = useDashboardStats();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-gray-500 text-sm font-medium mb-1">Total Pipeline Value</div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {revenue ? formatCurrency(revenue.totalRevenue) : "..."}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Placeholders for future filters */}
        </div>
      </div>

      <RevenueStats />

      {/* Revenue Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <RevenueChart />
        </div>

        {/* Pipeline Health */}
        <div className="col-span-1">
          <DealStageChart />
        </div>
      </div>

      {/* Pipeline Analytics Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Pipeline Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DealsBySourceChart />
          <div className="md:col-span-2">
            <RevenueForecastChart />
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="space-y-4 pt-4 border-t">
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
                    className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg hover:shadow-md transition-all hover:-translate-y-0.5 group gap-3"
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
