import { useMemo } from 'react';
import { useGetTasksQuery } from '@/services/tasks.api';
import { useTenant } from './useTenant';
import { Task } from '@/types/task';

interface UseTasksFilters {
    status?: Task['status'];
}

export const useTasks = (filters?: UseTasksFilters) => {
    const { tenantId } = useTenant();

    const { data: tasks = [], isLoading, error } = useGetTasksQuery(tenantId, {
        skip: !tenantId,
    });

    const filteredTasks = useMemo(() => {
        if (!filters?.status) return tasks;
        return tasks.filter((task) => task.status === filters.status);
    }, [tasks, filters?.status]);

    return {
        tasks: filteredTasks,
        isLoading,
        error,
        isEmpty: !isLoading && tasks.length === 0,
    };
};