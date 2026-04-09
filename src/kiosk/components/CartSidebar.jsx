import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const navigate = useNavigate();
  const { cartCount, subtotal } = useCart();

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <p className="text-sm uppercase tracking-[0.2em] text-white/50">
        Current Order
      </p>
      <h3 className="mt-2 text-2xl font-bold">
        {cartCount} item{cartCount !== 1 ? "s" : ""}
      </h3>
      <p className="mt-1 text-lg text-white/70">€{subtotal.toFixed(2)}</p>

      <button
        onClick={() => navigate("/kiosk/cart")}
        className="mt-4 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
      >
        View Cart
      </button>
    </div>
  );
}
