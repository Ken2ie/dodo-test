import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export interface StatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendDirection?: 'up' | 'down' | 'neutral';
    comparedTo?: string;
    className?: string;
    variant?: 'card' | 'clean';
    sparklineData?: number[];
}

export function StatCard({ title, value, trend, trendDirection, comparedTo, className, variant = 'card' }: StatCardProps) {
    const content = (
        <div className={cn("flex flex-col gap-1", variant === 'card' && "p-6")}>
            <span className="text-sm font-medium text-muted-foreground">
                {title}
            </span>
            <div className="flex items-end justify-between mt-2">
                <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold tracking-tight">{value}</span>
                    {(trend || comparedTo) && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {trend && (
                                <span className={cn(
                                    "flex items-center font-medium px-1.5 py-0.5 rounded-md",
                                    trendDirection === 'up' && "text-green-700 bg-green-50",
                                    trendDirection === 'down' && "text-red-700 bg-red-50",
                                    trendDirection === 'neutral' && "text-gray-700 bg-gray-50",
                                )}>
                                    {trendDirection === 'up' && <ArrowUpIcon className="w-3 h-3 mr-1" />}
                                    {trendDirection === 'down' && <ArrowDownIcon className="w-3 h-3 mr-1" />}
                                    {trendDirection === 'neutral' && <MinusIcon className="w-3 h-3 mr-1" />}
                                    {trend}
                                </span>
                            )}
                            {comparedTo && <span className="opacity-80">{comparedTo}</span>}
                        </div>
                    )}
                </div>
               
                <div className="mb-1">
                    <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                        {trendDirection === 'up' && (
                            <>
                                <path d="M0 25 L10 20 L20 22 L30 10 L40 15 L50 5 L60 0" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <defs>
                                    <linearGradient id="gradUp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#15803d" stopOpacity={0.2} />
                                        <stop offset="100%" stopColor="#15803d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <path d="M0 25 L10 20 L20 22 L30 10 L40 15 L50 5 L60 0 V30 H0 Z" fill="url(#gradUp)" stroke="none" />
                            </>
                        )}
                        {trendDirection === 'down' && (
                            <path d="M0 5 L10 10 L20 8 L30 18 L40 15 L50 25 L60 28" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                        {(!trendDirection || trendDirection === 'neutral') && (
                            <path d="M0 15 L10 12 L20 18 L30 15 L40 12 L50 15 L60 15" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );

    if (variant === 'clean') {
        return <div className={cn("", className)}>{content}</div>;
    }

    return (
        <Card className={cn("overflow-hidden", className)}>
            {content}
        </Card>
    );
}
