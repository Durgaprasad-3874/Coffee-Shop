import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconBag, IconBell, IconHeart, IconHome } from './Icons.jsx';
import { useApp } from '../context/AppContext.jsx';

const tabs = [
  { to: '/home', label: 'Home', Icon: IconHome },
  { to: '/favorites', label: 'Favorites', Icon: IconHeart },
  { to: '/order', label: 'Order', Icon: IconBag },
  { to: '/notifications', label: 'Notifications', Icon: IconBell },
];

export default function BottomNav() {
  const { selection, favorites } = useApp();
  const cartCount = selection?.qty ?? 0;
  const badgeFor = (to) => (to === '/order' ? cartCount : to === '/favorites' ? favorites.length : 0);

  return (
    <nav
      aria-label="Main"
      className="relative z-10 shrink-0 rounded-t-[24px] bg-white pb-[max(env(safe-area-inset-bottom),12px)] pt-4 shadow-sheet"
    >
      <ul className="flex items-center justify-around px-6">
        {tabs.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              aria-label={badgeFor(to) > 0 ? `${label}, ${badgeFor(to)}` : label}
              className={({ isActive }) =>
                `relative flex h-10 w-10 flex-col items-center justify-center transition-colors active:scale-90 ${
                  isActive ? 'text-primary' : 'text-[#A2A2A2]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={24} fill={isActive ? 'currentColor' : 'none'} />
                  {badgeFor(to) > 0 && (
                    <motion.span
                      key={badgeFor(to)}
                      initial={{ scale: 0.4 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                      className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-none text-white"
                    >
                      {badgeFor(to)}
                    </motion.span>
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-1.5 h-1 w-2.5 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
