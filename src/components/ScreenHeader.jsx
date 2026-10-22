import { IconBack } from './Icons.jsx';
import useGoBack from '../hooks/useGoBack.js';

/** Back arrow, centred title and an optional right-hand action (24px slot). */
export default function ScreenHeader({ title, right = null, fallback }) {
  const goBack = useGoBack(fallback);

  return (
    <header className="flex h-[56px] shrink-0 items-center justify-between px-6">
      <button
        type="button"
        onClick={goBack}
        aria-label="Go back"
        className="-ml-1 flex h-8 w-8 items-center justify-center rounded-full text-ink transition active:scale-90"
      >
        <IconBack size={24} />
      </button>
      <h1 className="text-base font-semibold text-ink">{title}</h1>
      <div className="flex h-8 w-8 items-center justify-center">{right}</div>
    </header>
  );
}
