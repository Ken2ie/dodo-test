import { useTenantStore } from "@/store/tenant.store";
import { TENANTS } from "@/data/tenants";
import { useMemo } from "react";

export const useTenant = () => {
    const { tenantId, setTenantId } = useTenantStore();

    const tenant = useMemo(() =>
        TENANTS.find(t => t.id === tenantId) || TENANTS[0],
        [tenantId]);

    return {
        tenantId: tenant.id, 
        tenant,
        tenants: TENANTS,
        setTenantId,
        isActive: (id: string) => tenantId === id
    };
};