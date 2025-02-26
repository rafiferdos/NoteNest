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
      query: (userInfo) => ({
        url: '/users/:userId/deactive',
        method: 'PATCH',
        body: userInfo,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useGetAllUserDataQuery, useDeactiveAccountMutation } =
  userManagementApi
