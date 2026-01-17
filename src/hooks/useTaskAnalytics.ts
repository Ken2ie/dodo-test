import { useMemo } from 'react';
import { Task } from '@/types/task';

interface TasksAnalytics {
    tasksByStatus: Record<string, number>;
    tasksByProject: Record<string, number>;
    tasksOverTime: Record<string, number>;
    totalTasks: number;
}

export const useTaskAnalytics = (tasks: Task[] = []): TasksAnalytics => {
    return useMemo(() => {
        const tasksByStatus: Record<string, number> = {
            pending: 0,
            in_progress: 0,
            blocked: 0,
            done: 0,
        };

        const tasksByProject: Record<string, number> = {};
        const tasksOverTime: Record<string, number> = {};

        tasks.forEach((task) => {
           
            if (tasksByStatus[task.status] !== undefined) {
                tasksByStatus[task.status]++;
            } else {
                tasksByStatus[task.status] = 1;
            }

           
            if (task.projectName) {
                tasksByProject[task.projectName] = (tasksByProject[task.projectName] || 0) + 1;
            }


          
            const date = new Date(task.createdAt).toISOString().split('T')[0];
            tasksOverTime[date] = (tasksOverTime[date] || 0) + 1;
        });

        return {
            tasksByStatus,
            tasksByProject,
            tasksOverTime,
            totalTasks: tasks.length
        };
    }, [tasks]);
};