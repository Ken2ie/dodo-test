import { api } from './api';
import { Deal } from '@/types/crm';
import { MOCK_DEALS } from '@/data/deals';

export const crmApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDeals: build.query<Deal[], string>({
            queryFn: async (userId) => {
                // Filter mock data by userId (simulating backend)
                const data = MOCK_DEALS.filter(d => d.userId === userId || !d.userId);
                return { data };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Deal' as const, id })),
                        { type: 'Deal', id: 'LIST' },
                    ]
                    : [{ type: 'Deal', id: 'LIST' }],
        }),
    }),
    overrideExisting: true,
});

export const { useGetDealsQuery } = crmApi;
