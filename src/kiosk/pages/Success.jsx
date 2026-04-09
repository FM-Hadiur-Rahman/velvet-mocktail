import { useNavigate } from "react-router-dom";
import KioskHeader from "../components/KioskHeader";
import { useCart } from "../context/CartContext";

export default function Success() {
  const navigate = useNavigate();
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <div className="min-h-screen bg-black text-white">
        <KioskHeader title="Order Confirmed" />
        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-4xl font-bold">No recent order found</h2>
          <p className="mt-4 text-white/65">
            Start a new order from the kiosk home screen.
          </p>
          <button
            onClick={() => navigate("/kiosk")}
            className="mt-8 rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-105"
          >
            Back to Home
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <KioskHeader title="Order Confirmed" />

      <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl md:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-black text-3xl">
            ✓
          </div>

          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-pink-300">
            Thank You
          </p>

          <h2 className="mt-3 text-4xl font-bold md:text-6xl">
            Your order is confirmed
          </h2>

          <p className="mt-4 text-lg text-white/65">
            Please note your order number and proceed according to your payment
            method.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Order Number
              </p>
              <h3 className="mt-2 text-3xl font-bold">
                {lastOrder.orderNumber}
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Total
              </p>
              <h3 className="mt-2 text-3xl font-bold">
                €{lastOrder.total.toFixed(2)}
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Customer
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                {lastOrder.customerName}
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Type / Payment
              </p>
              <h3 className="mt-2 text-2xl font-semibold capitalize">
                {lastOrder.orderType} / {lastOrder.paymentMethod}
              </h3>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Ordered Items
            </p>

            <div className="mt-4 space-y-3">
              {lastOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <div>
                    <h4 className="text-lg font-medium">{item.name}</h4>
                    <p className="text-sm text-white/50">
                      {item.quantity} × €{item.price.toFixed(2)}
                    </p>
                  </div>

                  <p className="font-medium">
                    €{(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/kiosk")}
            className="mt-10 rounded-full bg-white px-10 py-4 text-lg font-semibold text-black transition hover:scale-105"
          >
            Start New Order
          </button>
        </div>
      </section>
    </div>
  );
}
