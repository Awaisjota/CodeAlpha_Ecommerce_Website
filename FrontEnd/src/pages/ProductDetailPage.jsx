import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/common/Button";
import { addToCart } from "../features/cartSlice";
import { getAllProducts } from "../features/productSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.product);
  const product = Array.isArray(products)
    ? products.find((item) => item._id === id)
    : null;

  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <h2 className="text-xl font-semibold text-gray-600">
          Product Not Found
        </h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
      })
    );
  };

  if (isLoading && !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-600">
            Product Not Found
          </h2>
          <p className="text-sm text-gray-500 mt-3">
            The product may not exist or could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* IMAGE SECTION (NO BORDER, FULL HERO STYLE) */}
        <div className="flex items-center justify-center lg:sticky lg:top-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="
              w-full
              max-h-[420px] sm:max-h-[500px]
              object-contain
              rounded-2xl
              transition-transform duration-300 hover:scale-[1.03]
            "
          />
        </div>

        {/* INFO SECTION */}
        <div className="flex flex-col gap-5">

          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* META */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>
              Brand: <b className="text-gray-800">{product.brand}</b>
            </span>
            <span>
              Category: <b className="text-gray-800">{product.category}</b>
            </span>
          </div>

          {/* RATING */}
          <div className="flex items-center gap-2 text-yellow-500 text-base">
            <span className="text-lg">⭐</span>
            <span className="font-medium">{product.rating}</span>
          </div>

          {/* PRICE BLOCK */}
          <div className="flex items-end gap-4 mt-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-600">
              Rs. {product.price}
            </h2>

            {product.discount > 0 && (
              <span className="text-sm font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-md">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* STOCK STATUS */}
          <div className="text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                ✓ In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-red-500 font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="mt-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* CTA BOX (MODERN BUY SECTION) */}
          <div className="mt-6 p-5 rounded-2xl border border-gray-100 bg-gray-50">

            <Button
              type="button"
              text="Add To Cart"
              onClick={handleAddToCart}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 text-base"
            />

            <p className="text-xs text-gray-400 mt-3 text-center">
              Secure checkout • Fast delivery • Easy returns
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;