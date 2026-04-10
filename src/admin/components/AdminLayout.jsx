import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Kitchen", path: "/admin/kitchen" },
  { name: "Products", path: "/admin/products" },
];

export default function AdminLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.35em] text-pink-300">
              Admin Panel
            </p>
            <h2 className="mt-3 text-3xl font-bold">Velvet Mocktail</h2>
            <p className="mt-2 text-white/50">Control center</p>
          </div>

          <nav className="space-y-3">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-base font-medium transition ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-white/5 text-white/75 hover:bg-white hover:text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="p-6 md:p-8">
          {(title || subtitle) && (
            <div className="mb-8">
              {title && (
                <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
              )}
              {subtitle && <p className="mt-3 text-white/60">{subtitle}</p>}
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
