import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KioskHeader from "../components/KioskHeader";
import ProductCard from "../components/ProductCard";
import CartSidebar from "../components/CartSidebar";
import { categories } from "../data/products";
import { useCart } from "../context/CartContext";
import useIdleReset from "../../shared/hooks/useIdleReset";
import useKioskLanguage from "../i18n/useKioskLanguage";

export default function Products() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart, products } = useCart();
  const { t } = useKioskLanguage();

  const currentCategory = categories.find((cat) => cat.id === categoryId);

  useIdleReset({
    timeout: 60000,
    onIdle: () => navigate("/kiosk"),
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.category === categoryId);
  }, [products, categoryId]);

  return (
    <div className="min-h-screen bg-black text-white">
      <KioskHeader
        title={currentCategory ? t[currentCategory.nameKey] : "Products"}
        showBack
      />

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
              Kiosk Products
            </p>
            <h2 className="mt-3 text-4xl font-bold md:text-6xl">
              {currentCategory ? t[currentCategory.nameKey] : "Menu Items"}
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
