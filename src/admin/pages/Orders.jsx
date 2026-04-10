import { useCart } from "../../kiosk/context/CartContext";
import AdminLayout from "../components/AdminLayout";

function formatDateTime(dateString) {
  if (!dateString) return "—";

  return new Date(dateString).toLocaleString("en-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Orders() {
  const { orders, clearOrders, updateOrderStatus } = useCart();

  return (
    <AdminLayout
      title="Orders"
      subtitle="Review order details, timestamps, and live status changes."
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <div />

        {orders.length > 0 && (
          <button
            onClick={clearOrders}
            className="rounded-full border border-red-400/30 bg-red-400/10 px-5 py-2 text-sm text-red-200 transition hover:bg-red-400 hover:text-black"
          >
            Clear Orders
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-white/60">No orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.orderNumber}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    #{order.orderNumber}
                  </h2>
                  <p className="text-white/60">
                    {order.customerName} • {order.orderType} •{" "}
                    {order.paymentMethod}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["pending", "preparing", "ready", "completed"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() =>
                          updateOrderStatus(order.orderNumber, status)
                        }
                        className={`rounded-full px-4 py-2 text-sm capitalize ${
                          order.status === status
                            ? "bg-white text-black"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        {status}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Created
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    {formatDateTime(order.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Completed
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    {order.completedAt
                      ? formatDateTime(order.completedAt)
                      : "Not completed yet"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {order.items.map((item) => (
                  <div
                    key={`${order.orderNumber}-${item.id}`}
                    className="flex justify-between text-white/80"
                  >
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span>€{(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between border-t border-white/10 pt-4">
                <span>Total</span>
                <span className="font-semibold">€{order.total.toFixed(2)}</span>
              </div>

              <div className="mt-3 text-sm text-white/50">
                Status: <span className="capitalize">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
