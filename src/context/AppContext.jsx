import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { getCoffee } from '../data/coffees.js';

const AppContext = createContext(null);

const FAV_KEY = 'coffee-shop:favorites';

const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) ?? [];
  } catch {
    return [];
  }
};

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);
  // The current order: { coffeeId, size, qty } or null
  const [selection, setSelection] = useState(null);
  const [orderType, setOrderType] = useState('deliver'); // 'deliver' | 'pickup'
  const [address, setAddress] = useState({
    title: 'Jl. Kpg Sutoyo',
    detail: 'Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.',
  });
  const [note, setNote] = useState('');
  // Popup shown after cart / favourite actions: { id, kind, coffee, qty? }
  const [popup, setPopup] = useState(null);
  const popupTimer = useRef();

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch {
      /* storage unavailable (private mode): favourites just won't persist */
    }
  }, [favorites]);

  const dismissPopup = useCallback(() => {
    clearTimeout(popupTimer.current);
    setPopup(null);
  }, []);

  const showPopup = useCallback((data) => {
    setPopup({ ...data, id: Date.now() });
    clearTimeout(popupTimer.current);
    popupTimer.current = setTimeout(() => setPopup(null), 3500);
  }, []);

  const toggleFavorite = useCallback(
    (id) => {
      const coffee = getCoffee(id);
      const added = !favorites.includes(id);
      setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
      if (coffee) showPopup({ kind: added ? 'favorite-added' : 'favorite-removed', coffee });
    },
    [favorites, showPopup],
  );

  // "Buy Now" on the detail page
  const buyNow = useCallback((coffeeId, size) => {
    setSelection({ coffeeId, size, qty: 1 });
  }, []);

  // "+" on a home card: quick add one medium cup
  const quickAdd = useCallback(
    (coffee) => {
      const qty =
        selection && selection.coffeeId === coffee.id ? Math.min(selection.qty + 1, 9) : 1;
      setSelection(
        selection && selection.coffeeId === coffee.id
          ? { ...selection, qty }
          : { coffeeId: coffee.id, size: 'M', qty },
      );
      showPopup({ kind: 'cart', coffee, qty });
    },
    [selection, showPopup],
  );

  const setQty = useCallback((qty) => {
    setSelection((prev) => (prev ? { ...prev, qty: Math.min(Math.max(qty, 1), 9) } : prev));
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      selection,
      buyNow,
      quickAdd,
      setQty,
      orderType,
      setOrderType,
      address,
      setAddress,
      note,
      setNote,
      popup,
      dismissPopup,
    }),
    [favorites, toggleFavorite, selection, buyNow, quickAdd, setQty, orderType, address, note, popup, dismissPopup],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
};
