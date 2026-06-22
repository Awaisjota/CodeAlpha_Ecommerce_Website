import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    stock: initialData.stock || "",
    category: initialData.category || "",
    brand: initialData.brand || "",
    imageUrl: initialData.imageUrl || "",
    discount:
      initialData.discount === 0
        ? 0
        : initialData.discount || "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Product name is required.";
    }
    if (!formData.description.trim()) {
      nextErrors.description = "Description is required.";
    }
    if (!formData.price || Number(formData.price) <= 0) {
      nextErrors.price = "Enter a valid price.";
    }
    if (formData.stock === "" || Number(formData.stock) < 0) {
      nextErrors.stock = "Enter available stock.";
    }
    if (!formData.category.trim()) {
      nextErrors.category = "Category is required.";
    }
    if (!formData.brand.trim()) {
      nextErrors.brand = "Brand is required.";
    }
    if (!formData.imageUrl.trim()) {
      nextErrors.imageUrl = "Image URL is required.";
    }
    if (
      formData.discount !== "" &&
      (Number(formData.discount) < 0 || Number(formData.discount) > 100)
    ) {
      nextErrors.discount = "Discount must be 0-100%.";
    }

    return nextErrors;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "stock", "discount"].includes(name)
        ? value.replace(/[^0-9.]/g, "")
        : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      discount: Number(formData.discount || 0),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Name
          <Input
            id="name"
            name="name"
            placeholder="Product name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Description
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm transition duration-200 outline-none hover:border-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:shadow-md"
            rows={4}
          />
          {errors.description && (
            <p className="text-xs text-red-600 mt-1">{errors.description}</p>
          )}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              className="appearance-none"
              min="0"
              step="0.01"
            />
            {errors.price && (
              <p className="text-xs text-red-600 mt-1">{errors.price}</p>
            )}
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Stock
            <Input
              id="stock"
              name="stock"
              type="number"
              placeholder="Enter stock"
              value={formData.stock}
              onChange={handleChange}
              className="appearance-none"
              min="0"
              step="1"
            />
            {errors.stock && (
              <p className="text-xs text-red-600 mt-1">{errors.stock}</p>
            )}
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
            <Input
              id="category"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
            />
            {errors.category && (
              <p className="text-xs text-red-600 mt-1">{errors.category}</p>
            )}
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Brand
            <Input
              id="brand"
              name="brand"
              placeholder="Enter brand"
              value={formData.brand}
              onChange={handleChange}
            />
            {errors.brand && (
              <p className="text-xs text-red-600 mt-1">{errors.brand}</p>
            )}
          </label>
        </div>

        <label className="block text-sm font-medium text-gray-700">
          Image URL
          <Input
            id="imageUrl"
            name="imageUrl"
            placeholder="Enter image URL"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          {errors.imageUrl && (
            <p className="text-xs text-red-600 mt-1">{errors.imageUrl}</p>
          )}
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Discount %
          <Input
            id="discount"
            name="discount"
            type="number"
            placeholder="0"
            value={formData.discount}
            onChange={handleChange}
            className="appearance-none"
            min="0"
            max="100"
            step="1"
          />
          {errors.discount && (
            <p className="text-xs text-red-600 mt-1">{errors.discount}</p>
          )}
        </label>
      </div>

      <Button
        type="submit"
        text="Save Product"
        className="w-full bg-black text-white"
      />
    </form>
  );
};

export default ProductForm;