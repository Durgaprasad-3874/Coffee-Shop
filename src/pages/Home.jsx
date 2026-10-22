import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import PageTransition from '../components/PageTransition.jsx';
import BottomNav from '../components/BottomNav.jsx';
import CoffeeCard from '../components/CoffeeCard.jsx';
import { IconChevronDown, IconSearch, IconSliders } from '../components/Icons.jsx';
import { CATEGORIES, coffees } from '../data/coffees.js';
import { useApp } from '../context/AppContext.jsx';
import promo from '../assets/images/promo.jpg';

export default function Home() {
  const navigate = useNavigate();
  const { quickAdd, address } = useApp();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [query, setQuery] = useState('');
  const [sortByRating, setSortByRating] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = coffees.filter(
      (c) =>
        (category === CATEGORIES[0] || c.category === category) &&
        (!q || c.name.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)),
    );
    return sortByRating ? [...list].sort((a, b) => b.rating - a.rating) : list;
  }, [category, query, sortByRating]);

  return (
    <PageTransition>
      <div className="no-scrollbar flex-1 overflow-y-auto">
        {/* dark header */}
        <header className="bg-gradient-to-b from-[#111111] to-[#2A2A2A] px-6 pb-[91px] pt-12">
          <p className="text-xs text-[#B7B7B7]">Location</p>
          <button
            type="button"
            className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#DDDDDD]"
          >
            Bilzen, Tanjungbalai
            <IconChevronDown size={14} />
          </button>
          <span className="sr-only">Delivering to {address.title}</span>

          <div className="mt-6 flex gap-4">
            <label className="flex h-[52px] flex-1 items-center gap-3 rounded-2xl bg-dark-2 px-4 text-white focus-within:ring-1 focus-within:ring-primary">
              <IconSearch size={20} className="shrink-0 text-white" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search coffee"
                aria-label="Search coffee"
                className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#989898]"
              />
            </label>
            <button
              type="button"
              aria-label="Sort by rating"
              aria-pressed={sortByRating}
              onClick={() => setSortByRating((v) => !v)}
              className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl text-white transition active:scale-90 ${
                sortByRating ? 'bg-[#A8643B] ring-2 ring-white/60' : 'bg-primary'
              }`}
            >
              <IconSliders size={22} />
            </button>
          </div>
        </header>

        {/* promo banner overlaps the header */}
        <section
          aria-label="Promotion"
          className="relative z-[1] mx-6 -mt-[66px] h-[140px] overflow-hidden rounded-3xl"
          style={{ background: 'linear-gradient(90deg, #3B2A20 0%, #7A5238 55%, #B88458 100%)' }}
        >
          <img
            src={promo}
            alt=""
            draggable="false"
            className="absolute right-0 top-0 h-full w-[48%] object-cover"
            style={{
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 38%)',
              maskImage: 'linear-gradient(90deg, transparent 0%, #000 38%)',
            }}
          />
          <div className="relative flex h-full flex-col items-start justify-center gap-2 pl-4">
            <span className="rounded-lg bg-danger px-2.5 py-1 text-xs font-medium text-white">
              Promo
            </span>
            <p className="text-[32px] font-semibold leading-[1.1] text-white">
              Buy one get
              <br />
              one FREE
            </p>
          </div>
        </section>

        {/* categories */}
        <div
          role="tablist"
          aria-label="Coffee categories"
          className="no-scrollbar mt-6 flex gap-3 overflow-x-auto px-6"
        >
          {CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setCategory(c)}
                className={`relative h-8 shrink-0 rounded-md px-3 text-sm transition-colors active:scale-95 ${
                  active ? 'font-semibold text-white' : 'text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="chip-bg"
                    className="absolute inset-0 rounded-md bg-primary"
                    transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            );
          })}
        </div>

        {/* menu */}
        <motion.div layout className="grid grid-cols-2 gap-4 px-6 pb-6 pt-4">
          <AnimatePresence mode="popLayout">
            {visible.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                onOpen={(c) => navigate(`/coffee/${c.id}`)}
                onAdd={quickAdd}
              />
            ))}
          </AnimatePresence>
          {visible.length === 0 && (
            <p className="col-span-2 py-10 text-center text-sm text-muted">
              No coffee found. Try a different search.
            </p>
          )}
        </motion.div>
      </div>

      <BottomNav />
    </PageTransition>
  );
}
