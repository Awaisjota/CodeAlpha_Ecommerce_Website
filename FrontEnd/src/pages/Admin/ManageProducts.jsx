import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from "../../features/productSlice";

import ProductForm from "../../components/product/ProductForm";
import Button from "../../components/common/Button";

const ManageProducts = () => {
  const dispatch = useDispatch();

  const { products = [], isLoading, error } = useSelector(
    (state) => state.product
  );

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const closeModal = () => {
    setShowModal(false);
    setEditData(null);
    setModalError("");
  };

  const handleAdd = async (data) => {
    setModalError("");
    try {
      await dispatch(createProduct(data)).unwrap();
      closeModal();
    } catch (err) {
      setModalError(err?.message || err || "Failed to add product.");
    }
  };

  const handleEdit = (product) => {
    setEditData(product);
    setShowModal(true);
  };

  const handleUpdate = async (data) => {
    setModalError("");
    try {
      await dispatch(editProduct({ id: editData._id, data })).unwrap();
      closeModal();
    } catch (err) {
      setModalError(err?.message || err || "Failed to update product.");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!ok) return;

    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manage Products
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit, or remove products from your store catalog.
          </p>
        </div>

        <Button
          text="+ Add Product"
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
          className="w-full md:w-auto"
        />
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {typeof error === "string" ? error : error?.message || "Failed to load products."}
        </div>
      )}

      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{p.name}</td>
                    <td className="p-3 font-medium text-green-600">
                      Rs. {p.price}
                    </td>
                    <td className="p-3">{p.stock}</td>
                    <td className="p-3">{p.category}</td>

                    <td className="p-3">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleEdit(p)}
                          className="px-3 py-1 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p._id)}
                          className="px-3 py-1 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editData ? "Edit Product" : "Add Product"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editData
                    ? "Update existing product details."
                    : "Create a new product listing."}
                </p>
              </div>
            </div>

            {modalError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {modalError}
              </div>
            )}

            <ProductForm
              onSubmit={editData ? handleUpdate : handleAdd}
              initialData={editData || {}}
            />

            <Button
              type="button"
              text="Close"
              onClick={closeModal}
              className="mt-4 w-full bg-gray-700 text-white hover:bg-gray-800"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;