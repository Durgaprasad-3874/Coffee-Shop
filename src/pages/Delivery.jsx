import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageTransition from '../components/PageTransition.jsx';
import MapView from '../components/MapView.jsx';
import { IconBack, IconPhone, IconScooter, IconTarget } from '../components/Icons.jsx';
import useGoBack from '../hooks/useGoBack.js';
import { useApp } from '../context/AppContext.jsx';
import courier from '../assets/images/courier.jpg';

// One "minute" of the ETA. Lower this (e.g. 3000) to preview the delivered state quickly.
const TICK_MS = 60_000;
const SEGMENTS = 4;

export default function Delivery() {
  const navigate = useNavigate();
  const goBack = useGoBack('/order');
  const { address, orderType } = useApp();
  const [minutes, setMinutes] = useState(10);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setMinutes((m) => Math.max(m - 1, 0)), TICK_MS);
    return () => clearInterval(id);
  }, []);

  const delivered = minutes === 0;
  const filled = delivered ? SEGMENTS : 3;
  const isPickup = orderType === 'pickup';

  return (
    <PageTransition bg="bg-white">
      <div className="relative flex-1 overflow-hidden">
        <MapView key={mapKey} />

        <button
          type="button"
          onClick={goBack}
          aria-label="Go back"
          className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ink shadow-card transition active:scale-90"
        >
          <IconBack size={22} />
        </button>
        <button
          type="button"
          onClick={() => setMapKey((k) => k + 1)}
          aria-label="Re-centre map"
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ink shadow-card transition active:scale-90"
        >
          <IconTarget size={22} />
        </button>
      </div>

      <section
        aria-label="Delivery status"
        className="relative z-10 -mt-6 shrink-0 rounded-t-[24px] bg-white px-6 pb-[max(env(safe-area-inset-bottom),24px)] pt-3 shadow-sheet"
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-[#E3E3E3]" />

        <h2 className="mt-5 text-center text-lg font-semibold text-ink" aria-live="polite">
          {delivered ? 'Order delivered' : `${minutes} minutes left`}
        </h2>
        <p className="mt-1 text-center text-xs text-muted">
          {isPickup ? 'Pick up at' : 'Delivery to'}{' '}
          <span className="font-semibold text-ink">
            {isPickup ? 'Coffee Corner' : address.title}
          </span>
        </p>

        <div className="mt-4 flex gap-2" role="progressbar" aria-valuemin={0} aria-valuemax={SEGMENTS} aria-valuenow={filled}>
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                i < filled ? 'bg-success' : 'bg-[#E3E3E3]'
              }`}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#EDEDED] p-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <IconScooter size={26} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">
              {delivered ? 'Your order has arrived' : 'Delivered your order'}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-muted">
              We will deliver your goods to you in the shortes possible time.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <img
            src={courier}
            alt="Brooklyn Simmons"
            draggable="false"
            className="h-[54px] w-[54px] shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">Brooklyn Simmons</p>
            <p className="text-xs text-muted">Personal Courier</p>
          </div>
          <a
            href="tel:+15550100"
            aria-label="Call courier"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E3E3E3] text-ink transition active:scale-90"
          >
            <IconPhone size={20} />
          </a>
        </div>

        {delivered && (
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="mt-5 h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white transition active:scale-[0.98]"
          >
            Back to Home
          </button>
        )}
      </section>
    </PageTransition>
  );
}
