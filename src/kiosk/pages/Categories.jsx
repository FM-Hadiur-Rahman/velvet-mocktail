import { useNavigate } from "react-router-dom";
import KioskHeader from "../components/KioskHeader";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/products";
import useIdleReset from "../../shared/hooks/useIdleReset";
import useKioskLanguage from "../i18n/useKioskLanguage";

export default function Categories() {
  const navigate = useNavigate();
  const { t } = useKioskLanguage();

  useIdleReset({
    timeout: 60000,
    onIdle: () => navigate("/kiosk"),
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <KioskHeader title={t.categoriesTitle} showBack />

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            {t.categoriesTag}
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-6xl">
            {t.categoriesTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
            {t.categoriesText}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              t={t}
              onClick={() => navigate(`/kiosk/products/${category.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
