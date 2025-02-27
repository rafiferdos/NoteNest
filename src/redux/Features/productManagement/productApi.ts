import { baseApi } from '@/redux/api/baseApi'

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: '/api/products',
        method: 'POST',
        body: productInfo,
      }),
      invalidatesTags: ['Product'],
    }),

    getAllProductData: builder.query({
      query: (args) => {
        const params = new URLSearchParams()
        if (args)
          args.forEach((item: { name: string; value: string }) =>
            params.append(item.name, item.value)
          )
        return {
          url: `/api/products/`,
          params: params,
        }
      },
      providesTags: ['Product'],
    }),

    getOneProductData: builder.query({
      query: (productId) => {
        return {
          url: `/api/products/${productId}`,
        }
      },
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, productInfo }) => ({
        url: `/api/products/${productId}`,
        method: 'PUT',
        body: productInfo,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useAddProductMutation,
  useGetAllProductDataQuery,
  useGetOneProductDataQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi
