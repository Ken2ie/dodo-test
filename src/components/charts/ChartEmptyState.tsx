import { LucideIcon, BarChart3 } from "lucide-react";

interface ChartEmptyStateProps {
    title?: string;
    description?: string;
    icon?: LucideIcon;
}

export function ChartEmptyState({
    title = "No data available",
    description = "There is no data to display for the selected period.",
    icon: Icon = BarChart3
}: ChartEmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center animate-in fade-in-50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 mb-4">
                <Icon className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground max-w-[180px]">{description}</p>
        </div>
    );
}
