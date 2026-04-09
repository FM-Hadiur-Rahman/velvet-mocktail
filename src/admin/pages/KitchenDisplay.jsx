import { useEffect, useMemo, useRef, useState } from "react";
import { Maximize, Minimize } from "lucide-react";
import { useCart } from "../../kiosk/context/CartContext";

const URGENT_AFTER_MINUTES = 10;

function formatTime(dateString) {
  if (!dateString) return "--";
  return new Date(dateString).toLocaleTimeString("en-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getMinutesAgo(dateString) {
  if (!dateString) return 0;
  const created = new Date(dateString).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - created) / 60000));
}

function statusClasses(status) {
  switch (status) {
    case "pending":
      return "border-yellow-300/20 bg-yellow-400/15 text-yellow-200";
    case "preparing":
      return "border-blue-300/20 bg-blue-400/15 text-blue-200";
    case "ready":
      return "border-green-300/20 bg-green-400/15 text-green-200";
    default:
      return "border-white/10 bg-white/10 text-white/70";
  }
}

function urgencyClasses(minutes) {
  if (minutes >= URGENT_AFTER_MINUTES) {
    return "border-red-500/40 bg-red-500/10 shadow-[0_0_0_1px_rgba(239,68,68,0.15)]";
  }
  if (minutes >= URGENT_AFTER_MINUTES - 3) {
    return "border-orange-400/30 bg-orange-400/5";
  }
  return "border-white/10 bg-white/5";
}

function waitingTextClasses(minutes) {
  if (minutes >= URGENT_AFTER_MINUTES) return "text-red-300";
  if (minutes >= URGENT_AFTER_MINUTES - 3) return "text-orange-300";
  return "text-white";
}

export default function KitchenDisplay() {
  const { orders, updateOrderStatus } = useCart();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [, forceUpdate] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevCountRef = useRef(0);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      forceUpdate((n) => n + 1);
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, []);

  const activeOrders = useMemo(() => {
    return orders
      .filter((order) =>
        ["pending", "preparing", "ready"].includes(order.status),
      )
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [orders]);

  const urgentCount = useMemo(() => {
    return activeOrders.filter(
      (order) => getMinutesAgo(order.createdAt) >= URGENT_AFTER_MINUTES,
    ).length;
  }, [activeOrders, currentTime]);

  useEffect(() => {
    if (activeOrders.length > prevCountRef.current) {
      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
      );
      audio.play().catch(() => {});
    }
    prevCountRef.current = activeOrders.length;
  }, [activeOrders.length]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black px-6 py-6 text-white xl:px-8">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-8 flex flex-col gap-4 2xl:flex-row 2xl:items-end 2xl:justify-between">
          <div>
            <p className="text-base uppercase tracking-[0.45em] text-pink-300">
              Kitchen Screen
            </p>
            <h1 className="mt-3 text-5xl font-bold md:text-7xl">
              Active Orders
            </h1>
            <p className="mt-4 text-xl text-white/60">
              Live view for kitchen and counter staff
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                Active Count
              </p>
              <p className="mt-3 text-4xl font-bold">{activeOrders.length}</p>
            </div>

            <div className="rounded-3xl border border-red-500/30 bg-red-500/10 px-6 py-5">
              <p className="text-sm uppercase tracking-[0.2em] text-red-200/80">
                Urgent Orders
              </p>
              <p className="mt-3 text-4xl font-bold text-red-200">
                {urgentCount}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                Current Time
              </p>
              <p className="mt-3 text-3xl font-semibold">
                {currentTime.toLocaleTimeString("en-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>

            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-left transition hover:bg-white hover:text-black"
            >
              {isFullscreen ? (
                <Minimize className="h-6 w-6" />
              ) : (
                <Maximize className="h-6 w-6" />
              )}
              <div>
                <p className="text-sm uppercase tracking-[0.2em] opacity-70">
                  Display
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </p>
              </div>
            </button>
          </div>
        </div>

        {activeOrders.length === 0 ? (
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-20 text-center">
            <h2 className="text-4xl font-bold">No active orders</h2>
            <p className="mt-4 text-xl text-white/60">
              New kiosk orders will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {activeOrders.map((order) => {
              const waitingMinutes = getMinutesAgo(order.createdAt);
              const urgent = waitingMinutes >= URGENT_AFTER_MINUTES;

              return (
                <div
                  key={order.orderNumber}
                  className={`animate-fadeIn rounded-[2rem] border p-6 shadow-2xl backdrop-blur-xl transition ${urgencyClasses(
                    waitingMinutes,
                  )}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-4xl font-bold">
                        #{order.orderNumber}
                      </h2>
                      <p className="mt-3 text-2xl font-medium text-white/85">
                        {order.customerName}
                      </p>
                      <p className="mt-2 text-base capitalize text-white/50">
                        {order.orderType} • {order.paymentMethod}
                      </p>
                    </div>

                    <div
                      className={`rounded-full border px-4 py-2 text-base font-semibold capitalize ${statusClasses(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                        Created
                      </p>
                      <p className="mt-3 text-2xl font-semibold">
                        {formatTime(order.createdAt)}
                      </p>
                    </div>

                    <div
                      className={`rounded-2xl border p-4 ${
                        urgent
                          ? "border-red-500/40 bg-red-500/10"
                          : "border-white/10 bg-black/25"
                      }`}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                        Waiting
                      </p>
                      <p
                        className={`mt-3 text-2xl font-semibold ${waitingTextClasses(waitingMinutes)}`}
                      >
                        {waitingMinutes} min
                      </p>
                    </div>
                  </div>

                  {urgent && (
                    <div className="mt-4 rounded-2xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-200">
                      Urgent attention needed
                    </div>
                  )}

                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                      Items
                    </p>

                    <div className="mt-4 space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={`${order.orderNumber}-${item.id}`}
                          className="flex items-center justify-between border-b border-white/10 pb-3"
                        >
                          <div className="pr-4">
                            <p className="text-2xl font-medium">{item.name}</p>
                            <p className="text-base text-white/50">
                              {item.quantity} × €{item.price.toFixed(2)}
                            </p>
                          </div>

                          <p className="text-xl font-semibold">
                            €{(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                    <p className="text-xl text-white/60">Total</p>
                    <p className="text-4xl font-bold">
                      €{order.total.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {order.status === "pending" && (
                      <button
                        onClick={() =>
                          updateOrderStatus(order.orderNumber, "preparing")
                        }
                        className="rounded-full bg-white px-6 py-4 text-base font-semibold text-black transition hover:scale-105"
                      >
                        Start Preparing
                      </button>
                    )}

                    {order.status === "preparing" && (
                      <button
                        onClick={() =>
                          updateOrderStatus(order.orderNumber, "ready")
                        }
                        className="rounded-full bg-white px-6 py-4 text-base font-semibold text-black transition hover:scale-105"
                      >
                        Mark Ready
                      </button>
                    )}

                    {order.status === "ready" && (
                      <button
                        onClick={() =>
                          updateOrderStatus(order.orderNumber, "completed")
                        }
                        className="rounded-full bg-white px-6 py-4 text-base font-semibold text-black transition hover:scale-105"
                      >
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
