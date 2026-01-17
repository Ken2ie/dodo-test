import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Task', 'Deal'],
    endpoints: () => ({}), // Endpoints will be injected from other files
});