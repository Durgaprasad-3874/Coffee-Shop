import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconCheck, IconHeart } from './Icons.jsx';
import { useApp } from '../context/AppContext.jsx';
import { money } from '../lib/pricing.js';

/**
 * Mobile screens fill the viewport. On tablets/desktops the app is shown as a
 * centred 375-430px phone-width column so the design is never stretched.
 */
export default function AppShell({ children, fullScreen = false }) {
  const { popup, dismissPopup } = useApp();
  const navigate = useNavigate();
  const isCart = popup?.kind === 'cart';
  const isAdded = popup?.kind === 'favorite-added';

  return (
    <div
      className={
        fullScreen
          ? 'min-h-full bg-[#efefef]'
          : 'flex min-h-full items-center justify-center sm:p-6'
      }
    >
      <div
        className={
          fullScreen
            ? 'relative h-[100dvh] w-full overflow-hidden bg-[#efefef]'
            : 'relative h-[100dvh] w-full max-w-[430px] overflow-hidden bg-surface sm:h-[min(860px,calc(100dvh-48px))] sm:rounded-[40px] sm:shadow-[0_30px_80px_rgba(60,35,20,0.28)] sm:ring-8 sm:ring-[#1c1a19]'
        }
      >
        {children}

        <AnimatePresence>
          {popup && (
            <motion.div
              key={popup.id}
              role="status"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-4 bottom-24 z-50 flex items-center gap-3 rounded-2xl bg-ink p-3 text-white shadow-card"
            >
              <img
                src={popup.coffee.image}
                alt=""
                className="h-12 w-12 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                      isCart || isAdded ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    {isCart ? <IconCheck size={10} /> : <IconHeart size={10} fill="currentColor" />}
                  </span>
                  {isCart
                    ? 'Added to cart'
                    : isAdded
                      ? 'Added to favourites'
                      : 'Removed from favourites'}
                </p>
                <p className="truncate text-xs text-[#B7B7B7]">
                  {isCart
                    ? `${popup.coffee.name} × ${popup.qty} · ${money(popup.coffee.price * popup.qty)}`
                    : popup.coffee.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  dismissPopup();
                  navigate(isCart ? '/order' : '/favorites');
                }}
                className="shrink-0 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white active:scale-95"
              >
                {isCart ? 'View Cart' : 'View'}
              </button>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={dismissPopup}
                className="shrink-0 px-1 text-lg leading-none text-[#B7B7B7]"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
