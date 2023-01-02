import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        // data er modde kono change ana lagtase na tai, builder.query
        getProducts: builder.query({
            query: () => ({
                url: "/products",
            }),
            providesTags: ["Products"],

        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: "/product",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation({
            query: (_id) => ({
                url: `/product/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Products"],
        })
    }),
})

export const { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } = productApi; 