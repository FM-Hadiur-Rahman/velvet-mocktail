import MenuCard from "./MenuCard";
import { motion } from "framer-motion";

export default function MenuGrid({ items, onAdd }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <MenuCard item={item} onAdd={onAdd} />
        </motion.div>
      ))}
    </div>
  );
}
