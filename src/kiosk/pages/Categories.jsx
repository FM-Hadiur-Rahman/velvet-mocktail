import { useNavigate } from "react-router-dom";
import KioskHeader from "../components/KioskHeader";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/products";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <KioskHeader title="Choose Category" showBack />

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            Kiosk Menu
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-6xl">
            What would you like today?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
            Choose a category to start your order. Designed for fast, elegant,
            touch-friendly kiosk ordering.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => navigate(`/kiosk/products/${category.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
