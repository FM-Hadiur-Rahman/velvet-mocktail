import { useState } from "react";
import { useCart } from "../../kiosk/context/CartContext";
import AdminLayout from "../components/AdminLayout";

const initialForm = {
  id: null,
  name: "",
  category: "mocktail",
  price: "",
  image: "",
};

export default function ProductsAdmin() {
  const { products, addProduct, deleteProduct, updateProduct } = useCart();

  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.image) {
      alert("Please fill all fields.");
      return;
    }

    const payload = {
      id: form.id,
      name: form.name,
      category: form.category,
      price: Number(form.price),
      image: form.image,
    };

    if (isEditing) {
      updateProduct(payload);
    } else {
      addProduct({
        name: payload.name,
        category: payload.category,
        price: payload.price,
        image: payload.image,
      });
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: String(product.price),
      image: product.image,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AdminLayout
      title="Products"
      subtitle="Add, edit, and delete kiosk menu items."
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.4fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>

            {isEditing && (
              <button
                onClick={resetForm}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/60">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Strawberry Bliss"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
              >
                <option value="mocktail">Mocktail</option>
                <option value="ice">Ice Cream</option>
                <option value="smoothie">Smoothie</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 7.90"
                step="0.01"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-white px-6 py-4 text-lg font-semibold text-black transition hover:scale-[1.02]"
            >
              {isEditing ? "Save Changes" : "Add Product"}
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold">Current Products</h2>

          {products.length === 0 ? (
            <p className="mt-6 text-white/60">No products available.</p>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-pink-300">
                      {product.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-white/70">
                      €{Number(product.price).toFixed(2)}
                    </p>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-full border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-200 transition hover:bg-red-400 hover:text-black"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
