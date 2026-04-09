import { useNavigate } from "react-router-dom";
import KioskHeader from "../components/KioskHeader";
import { useCart } from "../context/CartContext";
import useIdleReset from "../../shared/hooks/useIdleReset";
export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    subtotal,
    cartCount,
  } = useCart();
  useIdleReset({
    timeout: 60000,
    onIdle: () => navigate("/kiosk"),
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <KioskHeader title="Your Cart" showBack />

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            Current Order
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-6xl">
            Review your items
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
            Update quantities, remove products, and continue to checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
            <h3 className="text-2xl font-semibold">Your cart is empty</h3>
            <p className="mt-3 text-white/60">
              Add some premium drinks or desserts to continue.
            </p>
            <button
              onClick={() => navigate("/kiosk/categories")}
              className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
            >
              Back to Categories
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 w-full rounded-[1.5rem] object-cover md:w-40"
                  />

                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-[0.2em] text-pink-300">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">{item.name}</h3>
                    <p className="mt-2 text-white/70">
                      €{item.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 md:items-end">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="h-11 w-11 rounded-full border border-white/15 bg-white/10 text-xl transition hover:bg-white hover:text-black"
                      >
                        -
                      </button>

                      <span className="min-w-[40px] text-center text-xl font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="h-11 w-11 rounded-full border border-white/15 bg-white/10 text-xl transition hover:bg-white hover:text-black"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-lg font-medium text-white/85">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-300 transition hover:text-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Order Summary
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-white/75">
                  <span>Items</span>
                  <span>{cartCount}</span>
                </div>

                <div className="flex items-center justify-between text-white/75">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-white/75">
                  <span>Service</span>
                  <span>€0.00</span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/kiosk/checkout")}
                className="mt-8 w-full rounded-full bg-white px-6 py-4 text-lg font-semibold text-black transition hover:scale-[1.02]"
              >
                Continue to Checkout
              </button>

              <button
                onClick={() => navigate("/kiosk/categories")}
                className="mt-4 w-full rounded-full border border-white/15 bg-white/10 px-6 py-4 text-base font-medium text-white transition hover:bg-white hover:text-black"
              >
                Add More Items
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
