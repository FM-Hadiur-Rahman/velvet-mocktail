import { useMemo } from "react";
import { useParams } from "react-router-dom";
import KioskHeader from "../components/KioskHeader";
import ProductCard from "../components/ProductCard";
import CartSidebar from "../components/CartSidebar";
import { categories, products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { categoryId } = useParams();
  const { addToCart } = useCart();

  const currentCategory = categories.find((cat) => cat.id === categoryId);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.category === categoryId);
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-black text-white">
      <KioskHeader
        title={currentCategory ? currentCategory.name : "Products"}
        showBack
      />

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
              Kiosk Products
            </p>
            <h2 className="mt-3 text-4xl font-bold md:text-6xl">
              {currentCategory ? currentCategory.name : "Menu Items"}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
              Tap your favorite item to add it to the order. Built for smooth,
              fast, touch-friendly kiosk interaction.
            </p>
          </div>

          <CartSidebar />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-white/70">
            No products found in this category.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
