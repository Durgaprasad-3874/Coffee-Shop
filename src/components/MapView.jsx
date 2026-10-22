import { motion } from 'framer-motion';
import { ScooterShape } from './Icons.jsx';

// Hand-drawn street map (viewBox 375 x 560) so the app works without a map API.
const V_ROADS = [
  { x: 36, name: '97th St' },
  { x: 118, name: '95th St' },
  { x: 190, name: '1st Ave' },
  { x: 251, name: '11th Ave' },
  { x: 322, name: '2nd Ave' },
];
const H_ROADS = [
  { y: 70, name: '96th St' },
  { y: 150, name: '90th St' },
  { y: 262, name: '86th Street' },
  { y: 372, name: '84th St' },
  { y: 470, name: '82nd St' },
];

const ROUTE = 'M80 232 H100 V205 H251 V318';

export default function MapView() {
  return (
    <svg
      viewBox="0 0 375 560"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Map showing the courier's route to your address"
    >
      <rect width="375" height="560" fill="#F2F2F2" />

      {/* road casing, then road fill, so roads look outlined like the design */}
      <g stroke="#E2E2E2" strokeWidth="15">
        {V_ROADS.map((r) => (
          <line key={`vc${r.x}`} x1={r.x} y1="0" x2={r.x} y2="560" />
        ))}
        {H_ROADS.map((r) => (
          <line key={`hc${r.y}`} x1="0" y1={r.y} x2="375" y2={r.y} />
        ))}
      </g>
      <g stroke="#fff" strokeWidth="13">
        {V_ROADS.map((r) => (
          <line key={`vr${r.x}`} x1={r.x} y1="0" x2={r.x} y2="560" />
        ))}
        {H_ROADS.map((r) => (
          <line key={`hr${r.y}`} x1="0" y1={r.y} x2="375" y2={r.y} />
        ))}
      </g>

      {/* street names */}
      <g fill="#9A9A9A" fontSize="8" fontFamily="Sora, sans-serif" textAnchor="middle">
        {V_ROADS.map((r) => (
          <text key={`vt${r.x}`} transform={`translate(${r.x + 3} 410) rotate(-90)`}>
            {r.name}
          </text>
        ))}
        {H_ROADS.map((r) => (
          <text key={`ht${r.y}`} x="76" y={r.y + 3}>
            {r.name}
          </text>
        ))}
      </g>

      {/* route */}
      <motion.path
        d={ROUTE}
        fill="none"
        stroke="#C67C4E"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
      />

      {/* destination pin */}
      <g transform="translate(66 212)">
        <path
          d="M12 22s8-6.800 8-12.500a8 8 0 0 0-16 0C4 15.200 12 22 12 22z"
          fill="#C67C4E"
        />
        <circle cx="12" cy="9.500" r="3" fill="#fff" />
      </g>

      {/* courier */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 320, damping: 20 }}
        style={{ transformOrigin: '251px 330px' }}
      >
        <circle cx="251" cy="330" r="15" fill="#fff" stroke="#EAEAEA" />
        <g
          transform="translate(239 318)"
          fill="none"
          stroke="#C67C4E"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ScooterShape />
        </g>
      </motion.g>
    </svg>
  );
}
