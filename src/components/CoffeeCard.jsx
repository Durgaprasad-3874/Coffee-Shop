import { motion } from 'framer-motion';
import { IconPlus, IconStar } from './Icons.jsx';
import { money } from '../lib/pricing.js';

export default function CoffeeCard({ coffee, onOpen, onAdd }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.25 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(coffee)}
      className="cursor-pointer rounded-[16px] bg-white p-2 pb-3 shadow-card"
    >
      <div className="relative h-[128px] overflow-hidden rounded-[14px] bg-line">
        <img
          src={coffee.image}
          alt={coffee.name}
          loading="lazy"
          draggable="false"
          className="h-full w-full object-cover"
        />
        <span className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-[14px] bg-black/40 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
          <IconStar size={10} className="text-star" />
          {coffee.rating}
        </span>
      </div>

      <h3 className="mt-3 truncate text-base font-semibold leading-snug text-ink">{coffee.name}</h3>
      <p className="truncate text-xs text-muted">{coffee.subtitle}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-ink">{money(coffee.price)}</span>
        <button
          type="button"
          aria-label={`Add ${coffee.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onAdd(coffee);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-white transition active:scale-90"
        >
          <IconPlus size={16} />
        </button>
      </div>
    </motion.article>
  );
}
