import { formatPrice } from './formatPrice.js';

describe('formatPrice', () => {
  test('formats zero as $0.00', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  test('formats 9.99 as $9.99', () => {
    expect(formatPrice(9.99)).toBe('$9.99');
  });

  test('formats 1234567.89 with thousands separators', () => {
    expect(formatPrice(1234567.89)).toBe('$1,234,567.89');
  });

  test('supports a different currency', () => {
    expect(formatPrice(9.99, 'EUR', 'de-DE')).toBe('9,99 €');
  });
});
