import { api } from './api';
import { Task } from '@/types/task';

import { MOCK_TASKS } from '@/data/tasks';

export const tasksApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], string>({
            queryFn: async (tenantId) => {
                // Filter mock data by tenantId (simulating backend)
                const data = MOCK_TASKS.filter(t => t.tenantId === tenantId || !t.tenantId);
                return { data };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Task' as const, id })),
                        { type: 'Task', id: 'LIST' },
                    ]
                    : [{ type: 'Task', id: 'LIST' }],
        }),
    }),
    overrideExisting: true,
});

export const { useGetTasksQuery } = tasksApi;