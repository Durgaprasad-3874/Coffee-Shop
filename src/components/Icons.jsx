// Small stroke icon set (24x24 grid) drawn to match the design's line icons.
const make = (children, defaults = {}) =>
  function Icon({ size = 24, className = '', ...rest }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        {...defaults}
        {...rest}
      >
        {children}
      </svg>
    );
  };

export const IconBack = make(<path d="M15 5l-7 7 7 7" />, { strokeWidth: 1.8 });
export const IconChevronRight = make(<path d="M9 5l7 7-7 7" />, { strokeWidth: 1.8 });
export const IconChevronDown = make(<path d="M5 9l7 7 7-7" />, { strokeWidth: 1.8 });
export const IconPlus = make(<path d="M12 5v14M5 12h14" />, { strokeWidth: 2 });
export const IconMinus = make(<path d="M5 12h14" />, { strokeWidth: 2 });
export const IconCheck = make(<path d="M5 12.5l4.5 4.5L19 7.5" />, { strokeWidth: 2 });

export const IconSearch = make(
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </>,
);

export const IconSliders = make(
  <>
    <path d="M4 7h8M18 7h2M4 17h2M12 17h8" />
    <circle cx="15" cy="7" r="2.2" />
    <circle cx="9" cy="17" r="2.2" />
  </>,
);

export const IconHeart = make(
  <path d="M12 20s-7.6-4.6-9.3-9.5C1.6 7.300 3.600 4.500 6.800 4.500c2 0 3.600 1 5.200 3 1.600-2 3.200-3 5.200-3 3.200 0 5.200 2.800 4.100 6C19.600 15.400 12 20 12 20z" />,
);

export const IconHome = make(
  <path d="M4 11.200L12 4l8 7.200V19a1 1 0 0 1-1 1h-4.500v-5.500h-5V20H5a1 1 0 0 1-1-1v-7.800z" />,
);

export const IconBag = make(
  <>
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6.500a3 3 0 0 1 6 0V8" />
  </>,
);

export const IconBell = make(
  <>
    <path d="M6 16.500V11a6 6 0 0 1 12 0v5.500l1.500 1.800h-15L6 16.500z" />
    <path d="M10 20.500a2 2 0 0 0 4 0" />
  </>,
);

export const IconStar = make(
  <path
    d="M12 2.800l2.800 5.900 6.400.9-4.700 4.500 1.200 6.400L12 17.400l-5.700 3.100 1.200-6.400L2.800 9.600l6.400-.9L12 2.800z"
    fill="currentColor"
    stroke="none"
  />,
);

export const IconPin = make(
  <>
    <path
      d="M12 21s7-6.100 7-11.500A7 7 0 0 0 5 9.500C5 14.900 12 21 12 21z"
      fill="currentColor"
      stroke="none"
    />
    <circle cx="12" cy="9.500" r="2.600" fill="#fff" stroke="none" />
  </>,
);

export const IconTarget = make(
  <>
    <circle cx="12" cy="12" r="6.500" />
    <circle cx="12" cy="12" r="2.200" fill="currentColor" stroke="none" />
    <path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3" />
  </>,
);

export const IconEdit = make(
  <>
    <path d="M4 20h4L19.500 8.500a2 2 0 0 0 0-2.800l-1.200-1.200a2 2 0 0 0-2.800 0L4 16v4z" />
    <path d="M13.500 6.500l4 4" />
  </>,
);

export const IconNote = make(
  <>
    <path d="M5 4h14v11l-5.500 5H5V4z" />
    <path d="M13.500 20v-5H19M8.500 9h7M8.500 12.500h4" />
  </>,
);

export const IconWallet = make(
  <>
    <path d="M17.500 8V6a1.500 1.500 0 0 0-1.500-1.500H6A2 2 0 0 0 4 6.500" />
    <rect x="3.500" y="7.500" width="17" height="12" rx="2.500" />
    <circle cx="16.500" cy="13.500" r="1.100" fill="currentColor" stroke="none" />
  </>,
);

export const IconPhone = make(
  <path d="M5.500 4h3l1.600 4-2 1.300a11 11 0 0 0 5.600 5.600l1.300-2 4 1.600v3A2 2 0 0 1 17 19.500C10 19.500 4.500 14 4.500 7A2 2 0 0 1 5.500 4z" />,
);

export const IconDiscount = make(
  <>
    <path d="M9 15l6-6" />
    <circle cx="9.200" cy="9.200" r="1.200" />
    <circle cx="14.800" cy="14.800" r="1.200" />
    <path d="M4 12c0-1 .6-1.800 1.300-2.300-.3-.9-.2-1.800.5-2.500s1.600-.8 2.500-.5C9 6 9.800 5.500 10.800 5.500 11.800 5.500 12.600 6 13.200 6.700c.9-.3 1.800-.2 2.500.5s.8 1.600.5 2.500c.7.500 1.300 1.300 1.300 2.300s-.6 1.800-1.300 2.300c.3.900.2 1.800-.5 2.500s-1.600.8-2.500.5c-.6.700-1.400 1.200-2.400 1.200s-1.800-.5-2.400-1.200c-.9.300-1.800.2-2.500-.5s-.8-1.600-.5-2.500C4.600 13.800 4 13 4 12z" />
  </>,
);

// Scooter shape is shared by the icon and the map's courier marker.
export const ScooterShape = () => (
  <>
    <circle cx="6" cy="17" r="2.500" />
    <circle cx="18" cy="17" r="2.500" />
    <path d="M8.500 17h6.200l-2.400-7.500H9.500M12.300 9.500L11.500 7H9M15.500 12l1.500-4.500h2" />
  </>
);
export const IconScooter = make(<ScooterShape />);

export const IconBean = make(
  <>
    <ellipse cx="12" cy="12" rx="5.500" ry="8" transform="rotate(35 12 12)" />
    <path d="M8.500 6.500c3 1.500 1 4.500 3.500 5.500s1 4 3.500 5.500" />
  </>,
);

export const IconDrop = make(
  <path d="M12 3.500s6 6.200 6 10.500a6 6 0 0 1-12 0C6 9.700 12 3.500 12 3.500z" />,
);

export const IconBox = make(
  <>
    <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" />
    <path d="M4 8l8 4 8-4M12 12v8" />
  </>,
);
