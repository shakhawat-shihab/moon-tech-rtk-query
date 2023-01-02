import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrEdit } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDeleteProductMutation, useGetProductsQuery } from "../../features/api/apiSlice";


const ProductList = () => {
  const [deleteProduct, result] = useDeleteProductMutation();
  const { isLoading, isSuccess } = result;
  const { pathname } = useLocation();

  const { data } = useGetProductsQuery();
  const products = data?.data;

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Successfully removed", { id: "removeProduct" })
    }
  }, [isLoading, isSuccess])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div class='flex flex-col justify-center items-center h-full w-full '>
      <div class='w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200'>
        <header class='px-5 py-4 border-b border-gray-100'>
          <div class='font-semibold text-gray-800'>Products</div>
        </header>

        <div class='overflow-x-auto p-3'>
          <table class='table-auto w-full'>
            <thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
              <tr>
                <th></th>
                <th class='p-2'>
                  <div class='font-semibold text-left'>Product Name</div>
                </th>
                <th class='p-2'>
                  <div class='font-semibold text-left'>Brand</div>
                </th>
                <th class='p-2'>
                  <div class='font-semibold text-left'>In Stock</div>
                </th>
                <th class='p-2'>
                  <div class='font-semibold text-left'>Price</div>
                </th>
                <th class='p-2'>
                  <div class='font-semibold text-center'>Edit</div>
                </th>
                <th class='p-2'>
                  <div class='font-semibold text-center'>Delete</div>
                </th>
              </tr>
            </thead>

            <tbody class='text-sm divide-y divide-gray-100'>
              {products?.map(({ model, brand, price, status, _id }) => (
                <tr>
                  <td class='p-2'>
                    <input type='checkbox' class='w-5 h-5' value='id-1' />
                  </td>
                  <td class='p-2'>
                    <div class='font-medium text-gray-800'>{model}</div>
                  </td>
                  <td class='p-2'>
                    <div class='text-left capitalize'>{brand}</div>
                  </td>
                  <td class='p-2'>
                    <div class='text-left'>
                      {status ? (
                        <p className='text-green-500 font-medium'>Available</p>
                      ) : (
                        <p className='text-red-500 font-medium'>Stock out</p>
                      )}
                    </div>
                  </td>
                  <td class='p-2'>
                    <div class='text-left font-medium text-indigo-500'>
                      {price}
                    </div>
                  </td>
                  <td class='p-2'>
                    <div class='flex justify-center'>
                      <button>
                        <Link to={`${pathname}/update-product/${_id}`}>
                          <GrEdit />
                        </Link>
                      </button>
                    </div>
                  </td>
                  <td class='p-2'>
                    <div class='flex justify-center'>
                      <button
                        onClick={() => {
                          deleteProduct(_id)
                        }}
                      >
                        <svg
                          class='w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
    // </section>
  );
};

export default ProductList;
