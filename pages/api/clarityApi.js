import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the RTK Query API
export const clarityApi = createApi({
  reducerPath: 'clarityApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    // Define the 'findRecord' method
    findRecord: builder.query({
      query: (filemakerId) => ({
        url: '/clarityDataApi',  // API route
        method: 'POST',
        body: {
          server: process.env.NEXT_PUBLIC_API_URL,  // Set default server
          database: 'clarityData',                  // Set default database
          layout: 'dapiPartyObject',                // Set default layout
          method: 'findRecord',                     // FileMaker method
          params: {
            query: [
              {
                __ID: filemakerId,                  // Use filemakerId from Redux state
              }
            ]
          }
        }
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useFindRecordQuery } = clarityApi;
