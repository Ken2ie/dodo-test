import { Deal } from "@/types/crm";

export const MOCK_DEALS: Deal[] = [
    // John Mark (u1) Deals
    {
        id: 'd1',
        title: 'Acme Corp Enterprise License',
        value: 50000,
        stage: 'negotiation',
        companyName: 'Acme Corp',
        contactName: 'Alice Johnson',
        source: 'outbound',
        closingDate: '2025-12-15',
        createdAt: '2025-11-01',
        userId: 'u1'
    },
    {
        id: 'd2',
        title: 'Globex Startups Package',
        value: 12000,
        stage: 'closed_won',
        companyName: 'Globex',
        contactName: 'Bob Smith',
        source: 'referral',
        closingDate: '2025-11-20',
        createdAt: '2025-10-15',
        userId: 'u1'
    },
    {
        id: 'd3',
        title: 'Soylent Corp Renewal',
        value: 25000,
        stage: 'proposal',
        companyName: 'Soylent Corp',
        contactName: 'Carol White',
        source: 'linkedin',
        closingDate: '2026-02-10',
        createdAt: '2026-01-01',
        userId: 'u1'
    },
    {
        id: 'd4',
        title: 'Initech Consultation',
        value: 5000,
        stage: 'lead',
        companyName: 'Initech',
        contactName: 'Dave Brown',
        source: 'website',
        closingDate: '2026-03-01',
        createdAt: '2026-01-10',
        userId: 'u1'
    },
    {
        id: 'd5',
        title: 'Umbrella Corp Security Audit',
        value: 75000,
        stage: 'negotiation',
        companyName: 'Umbrella Corp',
        contactName: 'Eve Black',
        source: 'outbound',
        closingDate: '2025-12-20',
        createdAt: '2025-10-01',
        userId: 'u1'
    },

    // Kofi Mensah (u2) Deals
    {
        id: 'd6',
        title: 'Stark Ind Prototype',
        value: 150000,
        stage: 'closed_won',
        companyName: 'Stark Industries',
        contactName: 'Tony S.',
        source: 'referral',
        closingDate: '2025-10-30',
        createdAt: '2025-09-01',
        userId: 'u2'
    },
    {
        id: 'd7',
        title: 'Wayne Ent Logistics',
        value: 80000,
        stage: 'proposal',
        companyName: 'Wayne Enterprises',
        contactName: 'Bruce W.',
        source: 'linkedin',
        closingDate: '2025-12-05',
        createdAt: '2025-11-10',
        userId: 'u2'
    },
    {
        id: 'd8',
        title: 'Cyberdyne Systems AI',
        value: 200000,
        stage: 'lead',
        companyName: 'Cyberdyne',
        contactName: 'Miles Dyson',
        source: 'website',
        closingDate: '2026-04-01',
        createdAt: '2026-01-15',
        userId: 'u2'
    }
];
