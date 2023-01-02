import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    endpoints: (builder) => ({
        // data er mo dde kono change ana lagtase na tai, builder.query
        getProducts: builder.query({
            query: () => ({
                url: "/products",
            })
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: "/product",
                method: "POST",
                body: data
            })
        })
    }),
})

export const { useGetProductsQuery, useAddProductMutation } = productApi; 