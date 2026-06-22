import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllProducts } from "../features/productSlice";
import ProductList from "../components/product/ProductList";

// ── Hero slides ───────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    tag:      "New Arrivals",
    headline: "Shop Smart.\nLive Better.",
    sub:      "Premium electronics, fashion & daily essentials at unbeatable prices.",
    cta:      "Shop Now",
    ctaPath:  "/products",
    bg:       "from-gray-900 via-gray-800 to-slate-900",
    accent:   "bg-white text-black hover:bg-gray-100",
    img:      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    imgAlt:   "Premium watch",
  },
  {
    tag:      "Electronics",
    headline: "Tech That\nMoves You.",
    sub:      "Laptops, phones, accessories — the gear you need, delivered fast.",
    cta:      "Explore Tech",
    ctaPath:  "/products?category=electronics",
    bg:       "from-blue-950 via-blue-900 to-indigo-900",
    accent:   "bg-blue-400 text-blue-950 hover:bg-blue-300",
    img:      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    imgAlt:   "Laptop on a desk",
  },
  {
    tag:      "Fashion",
    headline: "Dress for\nEvery Moment.",
    sub:      "Trending styles for men and women, at prices that make sense.",
    cta:      "Browse Fashion",
    ctaPath:  "/products?category=fashion",
    bg:       "from-rose-950 via-rose-900 to-pink-900",
    accent:   "bg-rose-300 text-rose-950 hover:bg-rose-200",
    img:      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    imgAlt:   "Fashion clothing rack",
  },
];

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: "Electronics", emoji: "📱", value: "electronics" },
  { name: "Fashion",     emoji: "👕", value: "fashion"     },
  { name: "Food",        emoji: "🍔", value: "food"        },
  { name: "Home",        emoji: "🏠", value: "home"        },
  { name: "Sports",      emoji: "⚽", value: "sports"      },
  { name: "Beauty",      emoji: "💄", value: "beauty"      },
];

const TESTIMONIALS = [
  { quote: "Best shopping experience ever. Fast delivery and amazing quality products.", author: "Ayesha K.", location: "Lahore" },
  { quote: "Prices are unbeatable and the checkout was super smooth. Will order again!", author: "Bilal R.", location: "Karachi" },
  { quote: "Got my order in less than 24 hours. Absolutely love this store.", author: "Sara M.", location: "Islamabad" },
];

const WHY_US = [
  { title: "Fast Delivery",   desc: "Get your order in 24–48 hours.",  emoji: "🚚" },
  { title: "Best Prices",     desc: "Unbeatable deals, every day.",     emoji: "💰" },
  { title: "Secure Checkout", desc: "100% safe & encrypted payments.",  emoji: "🔒" },
];

// ── Product skeleton ──────────────────────────────────────────────────────────
const ProductSkeleton = () => (
  <div className="animate-pulse bg-white border rounded-2xl overflow-hidden">
    <div className="bg-gray-200 h-48 w-full" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

// ── Hero Carousel ─────────────────────────────────────────────────────────────
const HeroCarousel = ({ onExplore }) => {
  const navigate  = useNavigate();
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const timerRef  = useRef(null);

  const go = useCallback((idx) => {
    setCurrent((idx + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  const slide = HERO_SLIDES[current];

  return (
    <div
      className={`relative mt-6 sm:mt-10 rounded-3xl overflow-hidden bg-gradient-to-r ${slide.bg} text-white transition-colors duration-700`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid md:grid-cols-2 items-center min-h-[340px] sm:min-h-[400px]">

        {/* Text */}
        <div className="p-7 sm:p-10 lg:p-14 space-y-5">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 border border-white/20">
            {slide.tag}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight whitespace-pre-line">
            {slide.headline}
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-sm">
            {slide.sub}
          </p>
          <div className="flex gap-3 flex-wrap pt-1">
            <button
              onClick={() => navigate(slide.ctaPath)}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${slide.accent}`}
            >
              {slide.cta}
            </button>
            <button
              onClick={onExplore}
              className="px-6 py-2.5 rounded-xl text-sm border border-white/30 hover:bg-white/10 transition-colors"
            >
              Explore ↓
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:flex items-center justify-center p-8">
          <img
            src={slide.img}
            alt={slide.imgAlt}
            className="rounded-2xl object-cover w-full h-72 lg:h-[22rem] shadow-2xl"
          />
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-colors text-white text-xl leading-none"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-colors text-white text-xl leading-none"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div
          key={current}
          className="absolute bottom-0 left-0 h-[3px] bg-white/30 rounded-full"
          style={{ animation: "heroProgress 5s linear forwards" }}
        />
      )}

      <style>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const featuredRef = useRef(null);

  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const safeProducts = Array.isArray(products) ? products : [];
  const featured     = safeProducts.slice(0, 8);

  // Testimonial carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  const scrollToFeatured = () =>
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-20">

      {/* ── Hero Carousel ────────────────────────────────────────────────── */}
      <HeroCarousel onExplore={scrollToFeatured} />

      {/* ── Trust strip ──────────────────────────────────────────────────── */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {WHY_US.map((w) => (
          <div key={w.title} className="flex items-center gap-2.5 bg-gray-50 border rounded-2xl px-4 py-3">
            <span className="text-xl shrink-0">{w.emoji}</span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">{w.title}</p>
              <p className="text-[11px] text-gray-400 leading-snug hidden sm:block">{w.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <div className="mt-14">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Browse Categories</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/products?category=${cat.value}`)}
              className="group bg-white border rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-gray-300 transition-all"
            >
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-200">
                {cat.emoji}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <div className="mt-14" ref={featuredRef}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">🔥 Featured Products</h2>
            <p className="text-sm text-gray-400 mt-0.5">Handpicked just for you</p>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            View All →
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : featured.length > 0 ? (
          <ProductList products={featured} />
        ) : (
          <div className="py-16 text-center text-gray-400 bg-gray-50 rounded-2xl border">
            <p className="text-lg">No products available right now.</p>
            <p className="text-sm mt-1">Check back soon!</p>
          </div>
        )}
      </div>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <div className="mt-16 bg-gray-900 text-white rounded-3xl p-8 sm:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-6">
            What customers say
          </p>

          <div className="relative min-h-[110px]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  i === activeTestimonial
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 absolute inset-0 pointer-events-none"
                }`}
              >
                <p className="text-lg sm:text-xl font-medium leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-5 flex items-center justify-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-xs font-bold border border-white/10">
                    {t.author[0]}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8 items-center">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === activeTestimonial
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;