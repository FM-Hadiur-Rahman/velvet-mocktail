import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KioskHeader from "../components/KioskHeader";
import { useCart } from "../context/CartContext";
import useIdleReset from "../../shared/hooks/useIdleReset";
export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, cartCount, placeOrder } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [orderType, setOrderType] = useState("takeaway");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handlePlaceOrder = () => {
    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/kiosk/categories");
      return;
    }

    placeOrder({
      customerName: customerName.trim(),
      orderType,
      paymentMethod,
    });

    navigate("/kiosk/success");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <KioskHeader title="Checkout" showBack />

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            Final Step
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-6xl">
            Complete your order
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
            Choose order type, enter customer name, select payment, and confirm.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <label className="block text-sm uppercase tracking-[0.2em] text-white/50">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-lg text-white outline-none placeholder:text-white/35 focus:border-pink-300"
              />
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Order Type
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setOrderType("takeaway")}
                  className={`rounded-2xl border px-6 py-5 text-left transition ${
                    orderType === "takeaway"
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/5 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  <h3 className="text-xl font-semibold">Takeaway</h3>
                  <p className="mt-2 text-sm opacity-75">
                    Pick up your order at the counter
                  </p>
                </button>

                <button
                  onClick={() => setOrderType("dine-in")}
                  className={`rounded-2xl border px-6 py-5 text-left transition ${
                    orderType === "dine-in"
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/5 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  <h3 className="text-xl font-semibold">Dine-in</h3>
                  <p className="mt-2 text-sm opacity-75">
                    Enjoy your order inside the shop
                  </p>
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Payment Method
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`rounded-2xl border px-6 py-5 text-left transition ${
                    paymentMethod === "cash"
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/5 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  <h3 className="text-xl font-semibold">Cash</h3>
                  <p className="mt-2 text-sm opacity-75">Pay at the counter</p>
                </button>

                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-2xl border px-6 py-5 text-left transition ${
                    paymentMethod === "card"
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/5 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  <h3 className="text-xl font-semibold">Card</h3>
                  <p className="mt-2 text-sm opacity-75">
                    Pay by card at the terminal
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Order Summary
            </p>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"
                >
                  <div>
                    <h4 className="text-lg font-medium">{item.name}</h4>
                    <p className="text-sm text-white/50">
                      {item.quantity} × €{item.price.toFixed(2)}
                    </p>
                  </div>

                  <p className="text-base font-medium">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-white/70">
                <span>Total Items</span>
                <span>{cartCount}</span>
              </div>

              <div className="flex items-center justify-between text-white/70">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-8 w-full rounded-full bg-white px-6 py-4 text-lg font-semibold text-black transition hover:scale-[1.02]"
            >
              Place Order
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
