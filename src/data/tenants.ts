import { Tenant } from "@/types/tenant";

export const TENANTS: Tenant[] = [
    {
        id: "u1",
        name: "John Mark",
        domain: "john.mark",
        avatar: "https://i.pravatar.cc/150?u=u1",
        plan: "enterprise"
    },
    {
        id: "u2",
        name: "Kofi Mensah",
        domain: "kofi.dev",
        avatar: "https://i.pravatar.cc/150?u=u2",
        plan: "pro"
    },
    {
        id: "u3",
        name: "Ama Serwaa",
        domain: "ama.design",
        avatar: "https://i.pravatar.cc/150?u=u3",
        plan: "starter"
    }
];
