import { Skeleton } from "@/components/ui/Skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";

export function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header Stats Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-[160px]" />
                    <Skeleton className="h-10 w-[160px]" />
                </div>
            </div>

            {/* Revenue Stats Skeleton */}
            <div className="rounded-xl bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="p-6">
                            <div className="flex items-center justify-between space-y-0 pb-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-4" />
                            </div>
                            <div className="flex items-baseline space-x-2 mt-2">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                            <div className="mt-4">
                                <Skeleton className="h-16 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card className="col-span-1">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
            </div>

            {/* Pipeline Analytics Skeleton */}
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[300px] w-full" />
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[300px] w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
