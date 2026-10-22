import { motion } from 'framer-motion';

import PageTransition from '../components/PageTransition.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { IconDiscount, IconScooter, IconStar } from '../components/Icons.jsx';

const NOTIFICATIONS = [
  {
    id: 1,
    Icon: IconDiscount,
    title: 'Buy one get one FREE',
    body: 'Your promo is live on all coffees today.',
    time: 'Just now',
  },
  {
    id: 2,
    Icon: IconScooter,
    title: 'Your courier is on the way',
    body: 'Brooklyn Simmons will arrive in about 10 minutes.',
    time: '5 min ago',
  },
  {
    id: 3,
    Icon: IconStar,
    title: 'How was your Caffe Mocha?',
    body: 'Rate your last order and help us brew better.',
    time: 'Yesterday',
  },
];

export default function Notifications() {
  return (
    <PageTransition>
      <header className="flex h-[56px] shrink-0 items-center justify-center">
        <h1 className="text-base font-semibold text-ink">Notifications</h1>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto px-6 pb-6">
        <ul className="space-y-3">
          {NOTIFICATIONS.map(({ id, Icon, title, body, time }, i) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-card"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted">{body}</p>
              </div>
              <span className="shrink-0 text-[10px] text-muted">{time}</span>
            </motion.li>
          ))}
        </ul>
      </main>

      <BottomNav />
    </PageTransition>
  );
}
