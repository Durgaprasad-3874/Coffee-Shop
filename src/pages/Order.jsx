import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import PageTransition from '../components/PageTransition.jsx';
import ScreenHeader from '../components/ScreenHeader.jsx';
import BottomNav from '../components/BottomNav.jsx';
import {
  IconChevronDown,
  IconChevronRight,
  IconDiscount,
  IconEdit,
  IconMinus,
  IconNote,
  IconPlus,
  IconWallet,
} from '../components/Icons.jsx';
import { getCoffee } from '../data/coffees.js';
import { calcTotals, money, moneyShort } from '../lib/pricing.js';
import { useApp } from '../context/AppContext.jsx';

const PAYMENT_METHODS = ['Cash/Wallet', 'Credit Card', 'UPI'];

function PillButton({ icon: Icon, children, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-7 items-center gap-1.5 rounded-full border px-3 text-xs transition active:scale-95 ${
        active ? 'border-primary text-primary' : 'border-[#DEDEDE] text-ink'
      }`}
    >
      <Icon size={14} />
      {children}
    </button>
  );
}

export default function Order() {
  const navigate = useNavigate();
  const { selection, setQty, orderType, setOrderType, address, setAddress, note, setNote } = useApp();

  const [discountOn, setDiscountOn] = useState(true);
  const [editingAddress, setEditingAddress] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [payment, setPayment] = useState(PAYMENT_METHODS[0]);

  const coffee = selection ? getCoffee(selection.coffeeId) : null;

  if (!coffee) {
    return (
      <PageTransition>
        <ScreenHeader title="Order" />
        <main className="flex flex-1 flex-col items-center justify-center gap-3 px-10 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary">
            <IconWallet size={30} />
          </span>
          <h2 className="text-base font-semibold text-ink">Your order is empty</h2>
          <p className="text-sm text-muted">Pick a coffee from the menu and it will show up here.</p>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="mt-2 h-12 rounded-2xl bg-primary px-8 text-sm font-semibold text-white transition active:scale-95"
          >
            Browse menu
          </button>
        </main>
        <BottomNav />
      </PageTransition>
    );
  }

  const isDelivery = orderType === 'deliver';
  const totals = calcTotals({
    coffee,
    size: selection.size,
    qty: selection.qty,
    orderType,
    discountOn,
  });

  return (
    <PageTransition>
      <ScreenHeader title="Order" />

      <main className="no-scrollbar flex-1 overflow-y-auto">
        <div className="px-6">
          {/* Deliver / Pick Up */}
          <div
            role="tablist"
            aria-label="Order type"
            className="flex rounded-xl bg-[#EDEDED] p-1"
          >
            {[
              ['deliver', 'Deliver'],
              ['pickup', 'Pick Up'],
            ].map(([value, label]) => {
              const active = orderType === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setOrderType(value)}
                  className={`relative h-10 flex-1 rounded-[10px] text-base transition-colors ${
                    active ? 'font-semibold text-white' : 'text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="order-type"
                      className="absolute inset-0 rounded-[10px] bg-primary"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>

          {/* address */}
          <h2 className="mt-6 text-base font-semibold text-ink">
            {isDelivery ? 'Delivery Address' : 'Pick Up Location'}
          </h2>

          {isDelivery ? (
            <div className="mt-4">
              {editingAddress ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={address.title}
                    onChange={(e) => setAddress({ ...address, title: e.target.value })}
                    aria-label="Address title"
                    className="h-10 rounded-xl border border-line bg-white px-3 text-sm font-semibold outline-none focus:border-primary"
                  />
                  <input
                    value={address.detail}
                    onChange={(e) => setAddress({ ...address, detail: e.target.value })}
                    aria-label="Full address"
                    className="h-10 rounded-xl border border-line bg-white px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
              ) : (
                <>
                  <p className="text-sm font-semibold text-ink">{address.title}</p>
                  <p className="mt-1 text-xs text-muted">{address.detail}</p>
                </>
              )}
              <div className="mt-4 flex gap-2">
                <PillButton
                  icon={IconEdit}
                  active={editingAddress}
                  onClick={() => setEditingAddress((v) => !v)}
                >
                  {editingAddress ? 'Save Address' : 'Edit Address'}
                </PillButton>
                <PillButton icon={IconNote} active={noteOpen} onClick={() => setNoteOpen((v) => !v)}>
                  Add Note
                </PillButton>
              </div>
              <AnimatePresence initial={false}>
                {noteOpen && (
                  <motion.textarea
                    key="note"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 64 }}
                    exit={{ opacity: 0, height: 0 }}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note for the courier"
                    aria-label="Note for the courier"
                    className="mt-3 w-full resize-none rounded-xl border border-line bg-white px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm font-semibold text-ink">Coffee Corner</p>
              <p className="mt-1 text-xs text-muted">Kpg. Sutoyo No. 12, Bilzen, Tanjungbalai.</p>
            </div>
          )}

          <hr className="my-4 border-line" />

          {/* item */}
          <div className="flex items-center gap-4">
            <img
              src={coffee.image}
              alt={coffee.name}
              draggable="false"
              className="h-[54px] w-[54px] shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-ink">{coffee.name}</p>
              <p className="text-xs text-muted">
                {coffee.subtitle} · {selection.size}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty(selection.qty - 1)}
                disabled={selection.qty <= 1}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DEDEDE] text-ink transition active:scale-90 disabled:opacity-40"
              >
                <IconMinus size={14} />
              </button>
              <span className="w-3 text-center text-sm font-semibold" aria-live="polite">
                {selection.qty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty(selection.qty + 1)}
                disabled={selection.qty >= 9}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DEDEDE] text-ink transition active:scale-90 disabled:opacity-40"
              >
                <IconPlus size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 h-[6px] bg-[#F1F1F1]" />

        <div className="px-6 pb-6 pt-4">
          {/* discount */}
          {isDelivery && (
            <button
              type="button"
              onClick={() => setDiscountOn((v) => !v)}
              aria-pressed={discountOn}
              className="flex h-[56px] w-full items-center gap-3 rounded-2xl border border-[#EDEDED] bg-white px-4 text-left transition active:scale-[0.99]"
            >
              <IconDiscount size={22} className="text-primary" />
              <span className="flex-1 text-sm font-semibold text-ink">
                {discountOn ? '1 Discount is Applies' : 'Apply delivery discount'}
              </span>
              <IconChevronRight size={18} className="text-ink" />
            </button>
          )}

          {/* payment summary */}
          <h2 className="mt-5 text-base font-semibold text-ink">Payment Summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-ink">Price</dt>
              <dd className="font-semibold text-ink">{money(totals.items)}</dd>
            </div>
            {isDelivery && (
              <div className="flex items-center justify-between">
                <dt className="text-ink">Delivery Fee</dt>
                <dd className="flex items-center gap-2 font-semibold text-ink">
                  {totals.discount > 0 && (
                    <span className="text-muted line-through">{moneyShort(totals.fee)}</span>
                  )}
                  {moneyShort(totals.feeAfterDiscount)}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </main>

      {/* payment method + order */}
      <footer className="relative shrink-0 rounded-t-3xl bg-white px-6 pb-[max(env(safe-area-inset-bottom),24px)] pt-4 shadow-sheet">
        <AnimatePresence>
          {paymentOpen && (
            <motion.ul
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-6 bottom-full mb-2 overflow-hidden rounded-2xl border border-line bg-white shadow-card"
            >
              {PAYMENT_METHODS.map((m) => (
                <li key={m}>
                  <button
                    type="button"
                    onClick={() => {
                      setPayment(m);
                      setPaymentOpen(false);
                    }}
                    className={`flex h-12 w-full items-center px-4 text-sm ${
                      m === payment ? 'font-semibold text-primary' : 'text-ink'
                    }`}
                  >
                    {m}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setPaymentOpen((v) => !v)}
          aria-expanded={paymentOpen}
          className="flex w-full items-center gap-4 text-left"
        >
          <span className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-primary-soft text-primary">
            <IconWallet size={16} />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-ink">{payment}</span>
            <span className="block text-xs font-semibold text-primary">{money(totals.payable)}</span>
          </span>
          <IconChevronDown
            size={18}
            className={`text-ink transition-transform ${paymentOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <button
          type="button"
          onClick={() => navigate('/delivery')}
          className="mt-4 h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white transition active:scale-[0.98]"
        >
          Order
        </button>
      </footer>
    </PageTransition>
  );
}
