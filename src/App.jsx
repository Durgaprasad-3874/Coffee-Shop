import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import AppShell from './components/AppShell.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Home from './pages/Home.jsx';
import Detail from './pages/Detail.jsx';
import Order from './pages/Order.jsx';
import Delivery from './pages/Delivery.jsx';
import Favorites from './pages/Favorites.jsx';
import Notifications from './pages/Notifications.jsx';
import DesignNotice from './pages/DesignNotice.jsx';

// Depth of each screen in the flow; used to slide forward or backward.
function routeLevel(pathname) {
  if (pathname === '/') return 0;
  if (pathname.startsWith('/coffee/')) return 2;
  if (pathname === '/order') return 3;
  if (pathname === '/delivery') return 4;
  return 1; // home, favorites, notifications
}

export default function App() {
  const location = useLocation();
  const level = routeLevel(location.pathname);
  const previousLevel = useRef(level);
  const direction = level >= previousLevel.current ? 1 : -1;

  useEffect(() => {
    previousLevel.current = level;
  }, [level]);

  return (
    <AppShell fullScreen={location.pathname === '/design-notice'}>
      <AnimatePresence custom={direction} initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/coffee/:id" element={<Detail />} />
          <Route path="/order" element={<Order />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/design-notice" element={<DesignNotice />} />
          <Route path="*" element={<Navigate to="/design-notice" replace />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  );
}
