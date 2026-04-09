import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import MenuFilter from "../components/menu/MenuFilter";
import MenuGrid from "../components/menu/MenuGrid";
import { drinks } from "../data/drinks";

export default function Menu() {
  const [active, setActive] = useState("all");
  const [cart, setCart] = useState([]);

  const filtered =
    active === "all" ? drinks : drinks.filter((d) => d.category === active);

  const handleAdd = (item) => {
    setCart((prev) => [...prev, item]);
    console.log("Cart:", [...cart, item]);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-bold mb-6">Our Menu</h1>

        <MenuFilter active={active} setActive={setActive} />

        <MenuGrid items={filtered} onAdd={handleAdd} />
      </div>
    </div>
  );
}
