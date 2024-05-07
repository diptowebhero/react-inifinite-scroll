import { useEffect, useRef, useState } from "react";

import { Product } from "./Product";
const productPerPage = 10;
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productPerPage}&skip=${
          pageNo * productPerPage
        }`
      );

      const data = await response.json();
      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProduct) => [...prevProduct, ...data.products]);
        setPageNo((prevPage) => prevPage + 1);
      }
    };
    const onIntersection = (items) => {
      const loaderItems = items[0];

      if (loaderItems.isIntersecting && hasMore) {
        fetchProducts();
      }
    };
    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    //cleanup
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, pageNo]);
  console.log(products);
  return (
    <div className='px-10'>
      <h2 className='text-center mt-12 text-4xl text-purple-500 font-semibold'>
        Product List
      </h2>

      <div className='grid grid-cols-4 place-items-center gap-4 mt-12'>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div
          ref={loaderRef}
          className='text-center my-5 text-2xl font-medium text-purple-600'>
          Loading More Product...
        </div>
      )}
    </div>
  );
}
