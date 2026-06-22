import Input from "../common/Input";

const ProductFilter = ({
  search,
  setSearch,
  category,
  setCategory,
}) => {
  return (
    <div className="
      flex flex-col sm:flex-row
      gap-3 sm:gap-4
      bg-white
      p-3 sm:p-4
      rounded-2xl
      shadow-sm
      border border-gray-100
    ">

      {/* SEARCH */}
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            px-4 py-2.5
            rounded-xl

            bg-gray-50
            border border-transparent

            focus:bg-white
            focus:border-gray-200
            focus:ring-2 focus:ring-black/5

            outline-none
            transition
          "
        />
      </div>

      {/* CATEGORY */}
      <div className="w-full sm:w-52">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            w-full
            px-4 py-2.5
            rounded-xl

            bg-gray-50
            border border-transparent

            focus:bg-white
            focus:border-gray-200
            focus:ring-2 focus:ring-black/5

            outline-none
            text-sm
            transition
          "
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="food">Food</option>
        </select>
      </div>

    </div>
  );
};

export default ProductFilter;