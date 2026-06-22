import ProductCard from "./ProductCard";

const ProductList = ({ products, loading = false }) => {
  // LOADING STATE (optional future-proof)
  if (loading) {
    return (
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-5 sm:gap-6 lg:gap-8
      ">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="
              h-72
              bg-gray-100
              animate-pulse
              rounded-2xl
            "
          />
        ))}
      </div>
    );
  }

  // EMPTY STATE
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 sm:py-28">
        <div className="text-center max-w-md px-4">

          <div className="text-5xl mb-3">🛍️</div>

          <h3 className="text-gray-700 font-semibold text-base">
            No products found
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  // PRODUCT GRID
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4

        gap-5 sm:gap-6 lg:gap-8

        items-stretch
      "
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;