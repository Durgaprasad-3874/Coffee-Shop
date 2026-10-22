# Coffee Shop: React + Tailwind CSS

A mobile-first coffee ordering app built from the five Figma screens
(Onboarding, Home, Detail, Order, Delivery) plus Favorites and Notifications tabs.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

Needs Node 18+.

## Stack

- React 18 + Vite
- Tailwind CSS 3 (design tokens in `tailwind.config.js`)
- React Router 6 (one route per screen)
- Framer Motion (page slide/fade transitions, sliding tabs, animated route on the map)
- Sora typeface via `@fontsource/sora` (bundled, works offline)

## Structure

```
src/
  assets/images/   photos cropped from the design (see below)
  components/      AppShell, BottomNav, CoffeeCard, ScreenHeader, MapView, Icons, PageTransition
  context/         AppContext: favourites, current order, address, toast
  data/            coffees.js: menu items
  hooks/           useGoBack
  lib/             pricing.js: size prices, totals, money formatting
  pages/           Onboarding, Home, Detail, Order, Delivery, Favorites, Notifications
```

The reference notice page is available at `/design-notice`.

## Design tokens

| Token      | Value     | Used for                          |
| ---------- | --------- | --------------------------------- |
| `primary`  | `#C67C4E` | buttons, prices, active states    |
| `ink`      | `#2F2D2C` | headings                          |
| `muted`    | `#A2A2A2` | secondary text                    |
| `surface`  | `#F9F9F9` | app background                    |
| `dark`     | `#131313` | home header                       |
| `danger`   | `#ED5151` | promo tag                         |
| `success`  | `#36C07E` | delivery progress                 |

Font: **Sora** 400 / 500 / 600 / 700.

## Images

The photos were cropped straight from the screenshot, so they are low resolution.
To replace them with the originals from Figma, export each one and overwrite the file
of the same name in `src/assets/images/`:

`hero.jpg`, `promo.jpg`, `mocha.jpg`, `flatwhite.jpg`, `detail-mocha.jpg`, `courier.jpg`

Only Caffe Mocha and Flat White appear in the design. The other four menu items reuse
those two photos as placeholders; edit `src/data/coffees.js` to point them at real ones.

## Interactions

- **Onboarding**: Get Started goes to Home.
- **Home**: search, category tabs, sort-by-rating (filter button), `+` quick-adds a medium cup, tap a card to open it.
- **Detail**: heart toggles favourite (saved in localStorage), S/M/L changes the price, Read More expands, Buy Now goes to Order.
- **Order**: Deliver / Pick Up, edit address, add note, quantity stepper, discount toggle, payment method picker, live totals.
- **Delivery**: animated route, ETA countdown with progress bar, call courier. Set `TICK_MS` in `Delivery.jsx` to a smaller number to preview the "delivered" state.

## Responsive behaviour

Phones use the full viewport (design width 375px). On wider screens the app is shown
as a centred 430px-max phone column so nothing stretches. Bottom padding respects the
iOS safe area. The status bar (9:41) and home indicator from the mock-up are device
chrome, so they are not drawn.
