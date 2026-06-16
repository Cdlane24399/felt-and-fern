export const formatPrice = (n) =>
  Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`
