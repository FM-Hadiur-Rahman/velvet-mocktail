import { useMemo } from "react";
import { useCart } from "../../kiosk/context/CartContext";

function StatCard({ title, value, subtext }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="text-sm uppercase tracking-[0.2em] text-white/45">
        {title}
      </p>
      <h3 className="mt-3 text-4xl font-bold">{value}</h3>
      {subtext && <p className="mt-2 text-sm text-white/55">{subtext}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { orders } = useCart();

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const preparing = orders.filter((o) => o.status === "preparing").length;
    const ready = orders.filter((o) => o.status === "ready").length;
    const completed = orders.filter((o) => o.status === "completed").length;

    const totalRevenue = orders
      .filter((o) => o.status === "completed")
      .reduce((sum, order) => sum + order.total, 0);

    const activeOrders = orders.filter((o) =>
      ["pending", "preparing", "ready"].includes(o.status),
    ).length;

    return {
      totalOrders,
      pending,
      preparing,
      ready,
      completed,
      totalRevenue,
      activeOrders,
    };
  }, [orders]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-300">
            Admin Overview
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Dashboard Summary
          </h1>
          <p className="mt-3 max-w-2xl text-white/60">
            Monitor live kiosk activity, order flow, and revenue performance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            subtext="All orders recorded in the system"
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            subtext="Orders waiting for staff action"
          />

          <StatCard
            title="Preparing"
            value={stats.preparing}
            subtext="Orders currently being prepared"
          />

          <StatCard
            title="Ready"
            value={stats.ready}
            subtext="Orders ready for pickup or serving"
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            subtext="Orders marked as fully completed"
          />

          <StatCard
            title="Revenue"
            value={`€${stats.totalRevenue.toFixed(2)}`}
            subtext="Revenue from completed orders only"
          />
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-white/45">
            Quick Insight
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <h3 className="text-lg font-semibold">Active Orders</h3>
              <p className="mt-2 text-3xl font-bold">{stats.activeOrders}</p>
              <p className="mt-2 text-sm text-white/55">
                Pending + preparing + ready
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <h3 className="text-lg font-semibold">Completion Rate</h3>
              <p className="mt-2 text-3xl font-bold">
                {stats.totalOrders > 0
                  ? `${Math.round((stats.completed / stats.totalOrders) * 100)}%`
                  : "0%"}
              </p>
              <p className="mt-2 text-sm text-white/55">
                Completed orders compared to total
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <h3 className="text-lg font-semibold">Avg. Order Value</h3>
              <p className="mt-2 text-3xl font-bold">
                €
                {stats.completed > 0
                  ? (stats.totalRevenue / stats.completed).toFixed(2)
                  : "0.00"}
              </p>
              <p className="mt-2 text-sm text-white/55">
                Based on completed orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
