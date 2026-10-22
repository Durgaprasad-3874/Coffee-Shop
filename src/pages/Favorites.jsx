import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import PageTransition from '../components/PageTransition.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { IconHeart, IconStar } from '../components/Icons.jsx';
import { coffees } from '../data/coffees.js';
import { money } from '../lib/pricing.js';
import { useApp } from '../context/AppContext.jsx';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const items = coffees.filter((c) => favorites.includes(c.id));

  return (
    <PageTransition>
      <header className="flex h-[56px] shrink-0 items-center justify-center">
        <h1 className="text-base font-semibold text-ink">Favorites</h1>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto px-6 pb-6">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary">
              <IconHeart size={30} />
            </span>
            <h2 className="text-base font-semibold text-ink">No favourites yet</h2>
            <p className="text-sm text-muted">Tap the heart on a coffee to save it here.</p>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="mt-2 h-12 rounded-2xl bg-primary px-8 text-sm font-semibold text-white transition active:scale-95"
            >
              Browse menu
            </button>
          </div>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {items.map((c) => (
                <motion.li
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-card"
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/coffee/${c.id}`)}
                    className="flex min-w-0 flex-1 items-center gap-4 text-left"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      draggable="false"
                      className="h-[62px] w-[62px] shrink-0 rounded-xl object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-base font-semibold text-ink">{c.name}</span>
                      <span className="block text-xs text-muted">{c.subtitle}</span>
                      <span className="mt-1 flex items-center gap-2 text-sm font-semibold text-primary">
                        {money(c.price)}
                        <span className="flex items-center gap-1 text-xs font-medium text-ink">
                          <IconStar size={11} className="text-star" />
                          {c.rating}
                        </span>
                      </span>
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${c.name} from favourites`}
                    onClick={() => toggleFavorite(c.id)}
                    className="flex h-9 w-9 items-center justify-center text-danger transition active:scale-90"
                  >
                    <IconHeart size={22} fill="currentColor" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </main>

      <BottomNav />
    </PageTransition>
  );
}
