import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/common/Loader";
import ProductList from "../components/product/ProductList";
import ProductFilter from "../components/product/ProductFilter";

import { getAllProducts } from "../features/productSlice";

const ProductPage = () => {
  const dispatch = useDispatch();

  const { products, isLoading, error } = useSelector(
    (state) => state.product
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = safeProducts
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      category ? p.category === category : true
    );

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="
        text-center
        py-20
        text-red-500
        bg-white
        rounded-2xl
        shadow-sm
        max-w-xl mx-auto
      ">
        <p className="font-medium">
          {typeof error === "string"
            ? error
            : error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div className="
      max-w-[90rem]
      mx-auto
      px-4 sm:px-6 lg:px-8
      py-8 sm:py-12
    ">

      {/* HEADER (clean + premium feel) */}
      <div className="mb-6 sm:mb-10">

        <h1 className="
          text-2xl sm:text-4xl
          font-bold
          text-gray-900
          tracking-tight
        ">
          🛍️ All Products
        </h1>

        <p className="
          text-gray-500
          text-sm sm:text-base
          mt-2
          max-w-xl
        ">
          Discover premium products at unbeatable prices with smart filtering and fast search.
        </p>

      </div>

      {/* FILTER (NO EXTRA WRAPPER = cleaner UI) */}
      <div className="mb-6 sm:mb-10">
        <ProductFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />
      </div>

      {/* RESULTS BAR (more modern layout) */}
      <div className="
        flex
        flex-col sm:flex-row
        sm:items-center
        sm:justify-between
        gap-2
        mb-5
      ">

        <p className="
          text-sm
          text-gray-600
        ">
          <span className="font-semibold text-gray-900">
            {filteredProducts.length}
          </span>{" "}
          products found
        </p>

        {(search || category) && (
          <button
            onClick={() => {
              setSearch("");
              setCategory("");
            }}
            className="
              text-xs
              font-medium
              text-blue-600
              hover:text-blue-700
              hover:underline
              transition
              w-fit
            "
          >
            Clear filters
          </button>
        )}

      </div>

      {/* EMPTY STATE (more premium UX) */}
      {filteredProducts.length === 0 ? (
        <div className="
          text-center
          py-28
          bg-gradient-to-b from-white to-gray-50
          rounded-2xl
          border border-gray-100
        ">
          <div className="text-5xl mb-3">🛍️</div>

          <h3 className="text-gray-700 font-semibold">
            No products found
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            Try adjusting filters or search keywords
          </p>
        </div>
      ) : (
        <ProductList products={filteredProducts} />
      )}

    </div>
  );
};

export default ProductPage;