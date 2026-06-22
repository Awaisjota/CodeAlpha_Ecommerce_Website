import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import { addToCart } from "../../features/cartSlice";
import { FiEye } from "react-icons/fi";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const [imgLoaded, setImgLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

const handleAddToCart = async () => {
  // User login nahi hai
  if (!user) {
    navigate("/login");
    return;
  }

  try {
    setLoading(true);

    await dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
      })
    );

  } catch (error) {
    console.error("Add to cart error:", error);
  } finally {
    setLoading(false);
  }
};
  const discountedPrice =
    product.originalPrice ||
    Math.round(product.price / (1 - (product.discount || 0) / 100));

  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        border border-gray-100
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-2
        hover:border-gray-200
        transition-all duration-300
        overflow-hidden
        flex flex-col
        h-full
      "
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">

        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        <img
          src={product.imageUrl}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-105
            opacity-100
          "
        />

        {/* DARK OVERLAY */}
        <div className="
          absolute inset-0
          bg-black/0
          group-hover:bg-black/30
          transition-all duration-300
        " />

        {/* VIEW BUTTON */}
        <div className="
          absolute inset-0
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-all duration-300
        ">
          <Link to={`/products/${product._id}`}>
            <button className="
              flex items-center justify-center
              bg-white
              text-black
              p-3
              rounded-full
              shadow-lg
              hover:scale-110
              transition
            ">
              <FiEye size={20} />
            </button>
          </Link>
        </div>

        {/* DISCOUNT BADGE */}
        {product.discount > 0 && (
          <span className="
            absolute top-3 left-3
            bg-red-500 text-white
            text-[11px]
            px-2 py-1
            rounded-full
            shadow
          ">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">

        {/* TITLE */}
        <h2 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h2>

        {/* CATEGORY */}
        <p className="text-[11px] sm:text-xs text-gray-400 mt-1">
          {product.category}
        </p>

        {/* RATING + STOCK */}
        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="text-yellow-500 font-medium">
            {"⭐".repeat(Math.round(product.rating || 0))}
          </span>

          <span
            className={`font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-3">
          <p className="text-lg font-bold text-gray-900">
            Rs. {product.price}
          </p>

          {product.discount > 0 && (
            <>
              <p className="text-xs text-gray-400 line-through">
                Rs. {discountedPrice}
              </p>

              <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            </>
          )}
        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || loading}
          className={`
            mt-4
            w-full
            py-2.5
            rounded-xl
            text-sm font-medium
            transition
            active:scale-[0.98]

            ${
              product.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }
          `}
        >
          {loading
            ? "Adding..."
            : product.stock === 0
            ? "Out of Stock"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;