import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getFileMakerToken, releaseFileMakerToken } from '../fileMaker/fileMakerToken';

const server = process.env.NEXT_PUBLIC_CLARITY_URL;
const username = process.env.CLARITYun;
const password = process.env.CLARITYpw;

export const clarityApi = createApi({
  reducerPath: 'clarityApi',
  baseQuery: async (args, api, extraOptions) => {
    let token;
    const state = api.getState();
    const orgID = state.auth.orgID;
    const userID = state.auth.userID;

    try {
      token = await getFileMakerToken(server, 'clarityData', username, password);
      const newArgs = {
        ...args,
        headers: {
          ...args.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          ...args.body,
        },
      };

      const baseQuery = fetchBaseQuery({ baseUrl: '/api' });
      const result = await baseQuery(newArgs, api, extraOptions);

      await releaseFileMakerToken(server, 'clarityData', token);

      return result;
    } catch (error) {
      if (token) {
        await releaseFileMakerToken(server, 'clarityData', token);
      }
      return { error: { status: 500, data: 'Token error: ' + error.message } };
    }
  },
  endpoints: (builder) => ({
    // Find record endpoint
    findRecord: builder.query({
      query: ({ layout, query }) => ({
        url: '/findRecord',
        method: 'POST',
        body: { 
          server: process.env.NEXT_PUBLIC_CLARITY_URL, 
          database: 'clarityData', 
          layout, 
          query 
        },
      }),
      transformResponse: (response) => response.data,
    }),

    // Create record endpoint and then update with the recordId
    createRecord: builder.mutation({
      async queryFn({ layout, fieldData }, _queryApi, _extraOptions, fetchWithBQ) {
        // Generate UTC and formatted timestamps
        const utc = Date.now();  
        const vancouverDate = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Vancouver" }));
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(vancouverDate);
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(vancouverDate);
        const fileMakerDate = `${formattedDate} ${formattedTime}`;

        // Add metadata to fieldData
        fieldData = {
          ...fieldData,
          "_orgID": orgID,
          "~ModifiedBy": userID,
          "~CreatedBy": userID,
          "~modifiedUTC": utc,
          "~syncUTC": utc,
          "~CreationTimestamp": fileMakerDate,
          "~ModificationTimestamp": fileMakerDate,
        };

        // First create the record
        const createResponse = await fetchWithBQ({
          url: '/createRecord',
          method: 'POST',
          body: {
            server: process.env.NEXT_PUBLIC_CLARITY_URL,
            database: 'clarityData',
            layout,
            fieldData,
          },
        });

        // Check if record creation was successful
        if (createResponse.error) {
          return { error: createResponse.error };
        }

        const recordID = createResponse.data.response.recordId;

        // Now call editRecord to update with recordID
        const editResponse = await fetchWithBQ({
          url: '/editRecord',
          method: 'POST',
          body: {
            server: process.env.NEXT_PUBLIC_CLARITY_URL,
            database: 'clarityData',
            layout,
            recordID,
            fieldData: {
              ...fieldData,
              recordID,  // Update the record with its own recordID
            },
          },
        });

        if (editResponse.error) {
          return { error: editResponse.error };
        }

        return { data: editResponse.data };
      },
      transformResponse: (response) => response.data,
    }),

    // Edit record endpoint
    editRecord: builder.mutation({
      query: ({ layout, recordID, fieldData }) => ({
        url: '/editRecord',
        method: 'POST',
        body: { 
          server: process.env.NEXT_PUBLIC_CLARITY_URL, 
          database: 'clarityData', 
          layout, 
          recordID, 
          fieldData 
        },
      }),
      transformResponse: (response) => response.data,
    }),

    // Delete record endpoint
    deleteRecord: builder.mutation({
      query: ({ layout, recordID }) => ({
        url: '/deleteRecord',
        method: 'POST',
        body: { 
          server: process.env.NEXT_PUBLIC_CLARITY_URL, 
          database: 'clarityData', 
          layout, 
          recordID 
        },
      }),
      transformResponse: (response) => response.data,
    }),

    // Upload to container field endpoint
    uploadToContainer: builder.mutation({
      query: ({ layout, recordID, fieldName, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('server', process.env.NEXT_PUBLIC_CLARITY_URL);
        formData.append('database', 'clarityData');
        formData.append('layout', layout);
        formData.append('recordID', recordID);
        formData.append('fieldName', fieldName);

        return {
          url: '/uploadToContainer',
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response) => response.data,
    }),
  }),
});

// Export the hooks for each operation
export const {
  useFindRecordQuery,
  useCreateAndUpdateRecordMutation,
  useEditRecordMutation,
  useDeleteRecordMutation,
  useUploadToContainerMutation,
} = clarityApi;
