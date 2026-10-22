import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import hero from '../assets/images/hero.jpg';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <PageTransition bg="bg-black">
      <img
        src={hero}
        alt=""
        draggable="false"
        className="absolute inset-x-0 top-0 h-[68%] w-full object-cover object-top"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 36%, rgba(0,0,0,0.82) 56%, #000 68%)',
        }}
      />

      <main className="relative mt-auto px-6 pb-[max(env(safe-area-inset-bottom),32px)] text-center">
        <h1 className="text-[32px] font-semibold leading-[1.5] text-white">
          Fall in Love with Coffee in Blissful Delight!
        </h1>
        <p className="mx-auto mt-2 text-sm leading-normal text-[#A9A9A9]">
          Welcome to our cozy coffee corner, where every cup is a delightful for you.
        </p>

        <button
          type="button"
          onClick={() => navigate('/home')}
          className="mt-8 h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white transition active:scale-[0.98]"
        >
          Get Started
        </button>
      </main>
    </PageTransition>
  );
}
