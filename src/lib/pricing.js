export const SIZES = ['S', 'M', 'L'];

// M is the base price shown in the design ($ 4.53 for Caffe Mocha).
const SIZE_DELTA = { S: -0.6, M: 0, L: 0.8 };

export const DELIVERY_FEE = 2.0;
export const DELIVERY_DISCOUNT = 1.0;

const round2 = (n) => Math.round(n * 100) / 100;

export const unitPrice = (coffee, size) => round2(coffee.price + SIZE_DELTA[size]);

export function calcTotals({ coffee, size, qty, orderType, discountOn }) {
  const items = round2(unitPrice(coffee, size) * qty);
  const isDelivery = orderType === 'deliver';
  const fee = isDelivery ? DELIVERY_FEE : 0;
  const discount = isDelivery && discountOn ? DELIVERY_DISCOUNT : 0;
  return {
    items,
    fee,
    discount,
    feeAfterDiscount: round2(fee - discount),
    payable: round2(items + fee - discount),
  };
}

// "$ 4.53" (prices) and "$ 1.0" (delivery fee) match the design's formatting.
export const money = (n) => `$ ${n.toFixed(2)}`;
export const moneyShort = (n) => `$ ${n.toFixed(1)}`;
