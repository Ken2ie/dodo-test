import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = {
    label: string;
    href: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">
                <Home className="w-4 h-4" />
            </Link>

            {items.map((item, index) => (
                <div key={item.href} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <Link
                        href={item.href}
                        className={`hover:text-gray-900 transition-colors capitalize ${index === items.length - 1 ? "font-medium text-gray-900" : ""
                            }`}
                    >
                        {item.label}
                    </Link>
                </div>
            ))}
        </nav>
    );
}
