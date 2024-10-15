import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const appURL = process.env.NEXT_PUBLIC_APP_URL;

export const clarityApi = createApi({
  reducerPath: 'clarityApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${appURL}/api` }),
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

        const recordId = createResponse.data.response.recordId;

        // Now call editRecord to update with recordId
        const editResponse = await fetchWithBQ({
          url: '/editRecord',
          method: 'POST',
          body: {
            server: process.env.NEXT_PUBLIC_CLARITY_URL,
            database: 'clarityData',
            layout,
            recordId,
            fieldData: {
              recordId,  // Update the record with its own recordId
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
      query: ({ layout, recordId, fieldData }) => ({
        url: '/editRecord',
        method: 'POST',
        body: { 
          server: process.env.NEXT_PUBLIC_CLARITY_URL, 
          database: 'clarityData', 
          layout, 
          recordId, 
          fieldData 
        },
      }),
      transformResponse: (response) => response.data,
    }),

    // Delete record endpoint
    deleteRecord: builder.mutation({
      query: ({ layout, recordId }) => ({
        url: '/deleteRecord',
        method: 'POST',
        body: { 
          server: process.env.NEXT_PUBLIC_CLARITY_URL, 
          database: 'clarityData', 
          layout, 
          recordId
        },
      }),
      transformResponse: (response) => response.data,
    }),

    // Upload to container field endpoint
    uploadToContainer: builder.mutation({
      query: ({ layout, recordId, fieldName, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('server', process.env.NEXT_PUBLIC_CLARITY_URL);
        formData.append('database', 'clarityData');
        formData.append('layout', layout);
        formData.append('recordId', recordId);
        formData.append('fieldName', fieldName);

        return {
          url: '/uploadToContainer',
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response) => response.data,
    }),

    findUser: builder.query({
      query: ({ userID }) => ({
        url: '/findRecord',
        method: 'POST',
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

// Export the hooks for each operation
export const {
  useFindRecordQuery,
  useFindUserQuery,
  useCreateRecordMutation,
  useEditRecordMutation,
  useDeleteRecordMutation,
  useUploadToContainerMutation,
} = clarityApi;
