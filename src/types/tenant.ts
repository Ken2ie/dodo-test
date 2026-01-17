export interface Tenant {
    id: string;
    name: string;
    domain?: string;
    avatar?: string; // URL to avatar image
    plan: 'starter' | 'pro' | 'enterprise';
}