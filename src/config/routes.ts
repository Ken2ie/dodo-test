import { LayoutDashboard, CheckSquare, Settings, PieChart, MessageCircle, HelpCircleIcon, BadgeDollarSignIcon, FolderArchiveIcon } from "lucide-react";


// Sidebar routes


export const SIDEBAR_ROUTES = {
    mainMenu: [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Campaigns", href: "/tasks", icon: PieChart },
    { label: "Chat", href: "/chat", icon: MessageCircle },
    { label: "Support Center", href: "/support", icon: HelpCircleIcon },
    { label: "Leads", href: "/leads", icon: BadgeDollarSignIcon },
    { label: "Archive", href: "/archive", icon: FolderArchiveIcon },
],
    favorites: [
    { label: "Technical Docs", href: "/technical-docs", icon: LayoutDashboard },
    { label: "Campaign Guidelines", href: "/campaign-guidelines", icon: CheckSquare },
    { label: "Important Rules", href: "/rules", icon: Settings },
    { label: "Onboarding", href: "/onboarding", icon: Settings },
],
};