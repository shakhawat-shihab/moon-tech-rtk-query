import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { toggle, toggleBrands } from "../../features/filter/filterSlice";



const Home = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => {
    // console.log(state);
    return state?.filter
  });
  const { brands, stock } = filter;


  // const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery(null, {
  //   refetchOnMountOrArgChange: true
  // });
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();
  // console.log('data ', data);
  const products = data?.data;

  let content;
  if (isLoading) {
    content = <h1>Loading...</h1>
  }

  if (isError) {
    content = <h1>Something went wrong.</h1>
  }

  if (products?.length) {
    content = products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))
  }

  if (products?.length && (stock || brands?.length)) {
    content = products
      .filter(product => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter(product => {
        if (brands?.length) {
          return brands.includes(product?.brand?.toLowerCase())
        }
        return product;
      })
      .map((product) => (
        <ProductCard key={product._id} product={product} />
      ))
  }
  const activeClass = "text-white  bg-indigo-500 border-white";

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>

        <button
          className={`border px-3 py-2 rounded-full font-semibold  `}
        // onClick={() => dispatch(toggleAllFilter())}
        >
          Clear
        </button>

        <button
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null} `}
          onClick={() => dispatch(toggle())}
        >
          In Stock
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('amd') ? activeClass : null}  `}
          onClick={() => dispatch(toggleBrands('amd'))}
        >
          AMD
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('intel') ? activeClass : null}   `}
          onClick={() => dispatch(toggleBrands('intel'))}
        >
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {
          content
        }
      </div>
    </div>
  );
};

export default Home;
