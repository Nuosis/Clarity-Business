import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clarityApi = createApi({
  reducerPath: 'clarityApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_CLARITY_URL }),  // Your base URL
  endpoints: (builder) => ({
    // Subroutine for `findRecord`
    findRecord: builder.query({
      query: ({ server, database, layout, query }) => ({
        url: '/clarityData',
        method: 'POST',
        body: {
          server: server || process.env.NEXT_PUBLIC_CLARITY_URL,  // Fallback to default server
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
        url: '/clarityData',
        method: 'POST',
        body: {
          server: server || process.env.NEXT_PUBLIC_CLARITY_URL,
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
        url: '/clarityData',
        method: 'POST',
        body: {
          server: server || process.env.NEXT_PUBLIC_CLARITY_URL,
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
        url: '/clarityData',
        method: 'POST',
        body: {
          server: server || process.env.NEXT_PUBLIC_CLARITY_URL,
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
        url: '/clarityData',
        method: 'POST',
        body: {
          server: server || process.env.NEXT_PUBLIC_CLARITY_URL,
          database: database || 'clarityData',
          layout,
          method: 'duplicateRecord',  // Use duplicateRecord method
          recordID,
        },
      }),
    }),

    findUser: builder.query({
      query: ({ userID, token }) => ({
        url: '/clarityData',
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: {
          server: process.env.NEXT_PUBLIC_CLARITY_URL,
          database: 'clarityData',
          layout: 'dapiPartyObject',
          method: 'findRecord',
          params: {
            query: [{ __ID: userID }],
          },
        },
      }),
      transformResponse: (response) => {
        // Process and filter the response data here as necessary
        const data = response.data[0];
        const fieldData = data.fieldData;
        const portalData = data.portalData;
    
        // Filter out keys starting with '~' or '_' except '__ID'
        const filteredFieldData = Object.keys(fieldData)
          .filter((key) => !key.startsWith('~') && (!key.startsWith('_') || key === '__ID'))
          .reduce((acc, key) => {
            acc[key] = fieldData[key];
            return acc;
          }, {});
    
        // Process portalData
        const filteredPortalData = Object.keys(portalData).reduce((acc, portalKey) => {
          const objectName = portalKey; 
          const portalEntries = portalData[portalKey].map(entry => {
            return Object.keys(entry)
              .filter(key => !key.startsWith('~') && (!key.startsWith('_') || key === '__ID'))
              .reduce((subAcc, subKey) => {
                const cleanKey = subKey.startsWith(objectName + '::') ? subKey.split('::')[1] : subKey;
                subAcc[cleanKey] = entry[subKey];
                return subAcc;
              }, {});
          });
          acc[portalKey.replace('dapiParty', '')] = portalEntries;
          return acc;
        }, {});
    
        return { ...filteredFieldData, ...filteredPortalData }; 
      },


    }),
  }),
});

// Export hooks for each operation
export const {
  useFindRecordQuery,
  useFindUserQuery,
  useCreateRecordMutation,
  useEditRecordMutation,
  useDeleteRecordMutation,
  useDuplicateRecordMutation,
} = clarityApi;
