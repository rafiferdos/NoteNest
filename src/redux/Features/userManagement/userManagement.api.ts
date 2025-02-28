import { baseApi } from '@/redux/api/baseApi'

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserData: builder.query({
      query: () => ({
        url: '/api/auth/register/register',
      }),
      providesTags: ['User'],
    }),

    deactiveAccount: builder.mutation({
      query: (userId) => ({
        // url: '/users/:userId/deactive', //* This is previous
        url: `/api/admin/users/${userId}/deactive`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useGetAllUserDataQuery, useDeactiveAccountMutation } =
  userManagementApi
