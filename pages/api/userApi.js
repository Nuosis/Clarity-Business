import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the RTK Query service
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    // Fetch user details
    getUser: builder.query({
      query: (userId) => `user/${userId}`,
    }),
    // Update user details
    updateUser: builder.mutation({
      query: (user) => ({
        url: `user/${user.id}`,
        method: 'PUT',
        body: user,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetUserQuery, useUpdateUserMutation } = userApi;
