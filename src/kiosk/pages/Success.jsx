import KioskHeader from "../components/KioskHeader";

export default function Success() {
  return (
    <div className="min-h-screen bg-black text-white">
      <KioskHeader title="Order Confirmed" />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-4xl font-bold">Success page coming next</h2>
      </div>
    </div>
  );
}
