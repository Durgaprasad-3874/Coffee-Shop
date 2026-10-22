import mocha from '../assets/images/mocha.jpg';
import flatWhite from '../assets/images/flatwhite.jpg';
import detailMocha from '../assets/images/detail-mocha.jpg';

// Only two product photos are visible in the design (Caffe Mocha, Flat White).
// The other menu items reuse them as placeholders: drop your own photos into
// src/assets/images and change the imports below.
const MOCHA_DESC =
  'A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the foam on top is soft, velvety and thick enough to hold latte art.';
const WHITE_DESC =
  'A flat white is a smooth espresso drink made with a double shot and steamed micro-foam milk, giving a strong coffee flavour with a silky, velvety texture.';

export const CATEGORIES = ['All Coffee', 'Machiato', 'Latte', 'Americano'];

export const coffees = [
  {
    id: 'caffe-mocha',
    name: 'Caffe Mocha',
    subtitle: 'Deep Foam',
    type: 'Ice/Hot',
    price: 4.53,
    rating: 4.8,
    reviews: 230,
    category: 'Latte',
    image: mocha,
    detailImage: detailMocha,
    description: MOCHA_DESC,
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    subtitle: 'Espresso',
    type: 'Ice/Hot',
    price: 3.53,
    rating: 4.8,
    reviews: 185,
    category: 'Latte',
    image: flatWhite,
    description: WHITE_DESC,
  },
  {
    id: 'caramel-machiato',
    name: 'Caramel Machiato',
    subtitle: 'Sweet Caramel',
    type: 'Ice/Hot',
    price: 4.2,
    rating: 4.7,
    reviews: 142,
    category: 'Machiato',
    image: flatWhite,
    description:
      'Freshly steamed milk with vanilla-flavoured syrup, marked with espresso and finished with a caramel drizzle.',
  },
  {
    id: 'classic-machiato',
    name: 'Classic Machiato',
    subtitle: 'Milk Mark',
    type: 'Hot',
    price: 3.9,
    rating: 4.6,
    reviews: 98,
    category: 'Machiato',
    image: mocha,
    detailImage: detailMocha,
    description:
      'A bold espresso shot "marked" with a small spoonful of steamed milk foam for a rich, concentrated cup.',
  },
  {
    id: 'americano',
    name: 'Americano',
    subtitle: 'Black Coffee',
    type: 'Ice/Hot',
    price: 2.99,
    rating: 4.5,
    reviews: 311,
    category: 'Americano',
    image: mocha,
    detailImage: detailMocha,
    description:
      'Espresso diluted with hot water for a clean, long black coffee with a light crema and a smooth finish.',
  },
  {
    id: 'iced-americano',
    name: 'Iced Americano',
    subtitle: 'Cold Brew',
    type: 'Ice',
    price: 3.25,
    rating: 4.6,
    reviews: 120,
    category: 'Americano',
    image: flatWhite,
    description:
      'Chilled espresso poured over ice and cold water: crisp, refreshing and full of roasted flavour.',
  },
];

export const getCoffee = (id) => coffees.find((c) => c.id === id);
