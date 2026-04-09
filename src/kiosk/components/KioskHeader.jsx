import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function KioskHeader({
  title = "Velvet Bar Kiosk",
  showBack = false,
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-2">
            <Sparkles className="h-5 w-5 text-pink-300" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white md:text-2xl">
              {title}
            </h1>
            <p className="text-xs text-white/50 md:text-sm">
              Premium self-order kiosk
            </p>
          </div>
        </div>

        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-white transition hover:bg-white hover:text-black"
          >
            Back
          </button>
        )}
      </div>
    </header>
  );
}
