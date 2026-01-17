import { create } from 'zustand';

interface TenantState {
    tenantId: string;
    setTenantId: (id: string) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
    tenantId: "u1", // Default tenant
    setTenantId: (id) => set({ tenantId: id }),
}));