import { Task } from "@/types/task";

export const MOCK_TASKS: Task[] = [
    { id: '1', title: 'Update landing page', status: 'done', createdAt: '2023-01-10', tenantId: 'u1', projectId: 'p1', projectName: 'Marketing' },
    { id: '2', title: 'Fix login bug', status: 'in_progress', createdAt: '2023-01-12', tenantId: 'u1', projectId: 'p2', projectName: 'Platform' },
    { id: '3', title: 'Write Q1 report', status: 'pending', createdAt: '2023-01-15', tenantId: 'u1', projectId: 'p1', projectName: 'Marketing' },
    { id: '4', title: 'Design new logo', status: 'done', createdAt: '2023-01-05', tenantId: 'u1', projectId: 'p3', projectName: 'Branding' },
    { id: '5', title: 'Refactor auth', status: 'blocked', createdAt: '2023-01-20', tenantId: 'u1', projectId: 'p2', projectName: 'Platform' },
    { id: '6', title: 'Update deps', status: 'pending', createdAt: '2023-01-22', tenantId: 'u1', projectId: 'p2', projectName: 'Platform' },
    { id: '7', title: 'Client meeting', status: 'done', createdAt: '2023-01-18', tenantId: 'u1', projectId: 'p4', projectName: 'Sales' },
    { id: '8', title: 'Prepare invoice', status: 'pending', createdAt: '2023-01-25', tenantId: 'u1', projectId: 'p4', projectName: 'Sales' },
    { id: '9', title: 'Deploy to staging', status: 'in_progress', createdAt: '2023-01-25', tenantId: 'u1', projectId: 'p5', projectName: 'DevOps' },
    { id: '10', title: 'Run security scan', status: 'done', createdAt: '2023-01-08', tenantId: 'u1', projectId: 'p6', projectName: 'Security' },

    // Some data for other tenants/dates
    { id: '11', title: 'Task A', status: 'pending', createdAt: '2023-02-01', tenantId: 'u2', projectId: 'p1', projectName: 'Marketing' },
    { id: '12', title: 'Task B', status: 'done', createdAt: '2023-02-05', tenantId: 'u2', projectId: 'p2', projectName: 'Platform' },
];
