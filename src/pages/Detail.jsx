import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import PageTransition from '../components/PageTransition.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import { IconBean, IconBox, IconHeart, IconScooter, IconStar } from '../components/Icons.jsx';
import { getCoffee } from '../data/coffees.js';
import { SIZES, money, unitPrice } from '../lib/pricing.js';
import { useApp } from '../context/AppContext.jsx';

const FEATURES = [IconScooter, IconBean, IconBox];

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, buyNow } = useApp();
  const [size, setSize] = useState('M');
  const [expanded, setExpanded] = useState(false);

  const coffee = getCoffee(id);
  if (!coffee) return <Navigate to="/home" replace />;

  const isFavorite = favorites.includes(coffee.id);

  const handleBuy = () => {
    buyNow(coffee.id, size);
    navigate('/order');
  };

  return (
    <PageTransition bg="bg-white">
      <ScreenHeader
        title="Detail"
        right={
          <motion.button
            type="button"
            aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
            aria-pressed={isFavorite}
            onClick={() => toggleFavorite(coffee.id)}
            whileTap={{ scale: 0.8 }}
            className={isFavorite ? 'text-danger' : 'text-ink'}
          >
            <IconHeart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
          </motion.button>
        }
      />

      <main className="no-scrollbar flex-1 overflow-y-auto px-6 pb-6">
        <img
          src={coffee.detailImage ?? coffee.image}
          alt={coffee.name}
          draggable="false"
          className="mt-2 h-[202px] w-full rounded-2xl object-cover"
        />

        <div className="mt-5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-ink">{coffee.name}</h2>
            <p className="mt-1 text-xs text-muted">{coffee.type}</p>
            <p className="mt-5 flex items-center gap-1 text-base font-semibold text-ink">
              <IconStar size={20} className="text-star" />
              {coffee.rating}
              <span className="ml-1 text-xs font-normal text-muted">({coffee.reviews})</span>
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            {FEATURES.map((Icon, i) => (
              <span
                key={i}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F9F2ED] text-primary"
              >
                <Icon size={22} />
              </span>
            ))}
          </div>
        </div>

        <hr className="my-4 border-line" />

        <h3 className="text-base font-semibold text-ink">Description</h3>
        <p
          className={`mt-2 text-sm leading-relaxed text-muted ${expanded ? '' : 'line-clamp-3'}`}
        >
          {coffee.description}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-sm font-semibold text-primary"
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>

        <h3 className="mt-5 text-base font-semibold text-ink">Size</h3>
        <div className="mt-3 flex gap-4" role="radiogroup" aria-label="Size">
          {SIZES.map((s) => {
            const active = s === size;
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSize(s)}
                className={`h-[41px] flex-1 rounded-xl border text-base transition active:scale-95 ${
                  active
                    ? 'border-primary bg-primary-soft font-medium text-primary'
                    : 'border-[#E3E3E3] bg-white text-ink'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </main>

      <footer className="flex shrink-0 items-center gap-8 rounded-t-3xl bg-white px-6 pb-[max(env(safe-area-inset-bottom),24px)] pt-5 shadow-sheet">
        <div>
          <p className="text-sm text-muted">Price</p>
          <motion.p
            key={`${coffee.id}-${size}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-semibold text-primary"
          >
            {money(unitPrice(coffee, size))}
          </motion.p>
        </div>
        <button
          type="button"
          onClick={handleBuy}
          className="h-14 flex-1 rounded-2xl bg-primary text-base font-semibold text-white transition active:scale-[0.98]"
        >
          Buy Now
        </button>
      </footer>
    </PageTransition>
  );
}
