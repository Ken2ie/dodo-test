export interface Tenant {
    id: string;
    name: string;
    domain?: string;
    avatar?: string; 
    plan: 'starter' | 'pro' | 'enterprise';
}