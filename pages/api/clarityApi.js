import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clarityApi = createApi({
  reducerPath: 'clarityApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),  // Your base URL
  endpoints: (builder) => ({
    // Subroutine for `findRecord`
    findRecord: builder.query({
      query: ({ server, database, layout, query }) => ({
        url: '/clarityDataApi',
        method: 'POST',
        body: {
          server: server || process.env.NEXT_PUBLIC_API_URL,  // Fallback to default server
          database: database || 'clarityData',                // Default database
          layout,
          method: 'findRecord',                               // Method name
          params: {query},
        },
      }),
    }),
    
    // Subroutine for `createRecord`
    createRecord: builder.mutation({
      query: ({ server, database, layout, fieldData }) => ({
        url: '/clarityDataApi',
        method: 'POST',
        body: {
          server: server || process.env.NEXT_PUBLIC_API_URL,
          database: database || 'clarityData',
          layout,
          method: 'createRecord',  // Use createRecord method
          params: {fieldData},
        },
      }),
    }),

    // Subroutine for `editRecord`
    editRecord: builder.mutation({
      query: ({ server, database, layout, recordID, fieldData }) => ({
        url: '/clarityDataApi',
        method: 'POST',
        body: {
          server: server || process.env.NEXT_PUBLIC_API_URL,
          database: database || 'clarityData',
          layout,
          method: 'editRecord',  // Use editRecord method
          recordID,
          params: {fieldData},
        },
      }),
    }),

    // Subroutine for `deleteRecord`
    deleteRecord: builder.mutation({
      query: ({ server, database, layout, recordID }) => ({
        url: '/clarityDataApi',
        method: 'POST',
        body: {
          server: server || process.env.NEXT_PUBLIC_API_URL,
          database: database || 'clarityData',
          layout,
          method: 'deleteRecord',  // Use deleteRecord method
          recordID,
        },
      }),
    }),
    
    // Subroutine for `duplicateRecord`
    duplicateRecord: builder.mutation({
      query: ({ server, database, layout, recordID }) => ({
        url: '/clarityDataApi',
        method: 'POST',
        body: {
          server: server || process.env.NEXT_PUBLIC_API_URL,
          database: database || 'clarityData',
          layout,
          method: 'duplicateRecord',  // Use duplicateRecord method
          recordID,
        },
      }),
    }),
  }),
});

// Export hooks for each operation
export const {
  useFindRecordQuery,
  useCreateRecordMutation,
  useEditRecordMutation,
  useDeleteRecordMutation,
  useDuplicateRecordMutation,
} = clarityApi;
