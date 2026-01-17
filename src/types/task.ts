export interface Task {
    id: string;
    title: string;
    status: 'pending' | 'in_progress' | 'blocked' | 'done';
    createdAt: string;
    tenantId: string;
    projectId: string;
    projectName: string;
}