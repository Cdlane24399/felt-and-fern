import { formatPrice } from './formatPrice.js'

describe('formatPrice', () => {
  it('formats zero as an integer (no decimals)', () => {
    expect(formatPrice(0)).toBe('$0')
  })

  it('formats 9.99 with two decimal places', () => {
    expect(formatPrice(9.99)).toBe('$9.99')
  })

  it('formats 1234567.89 with two decimal places', () => {
    expect(formatPrice(1234567.89)).toBe('$1234567.89')
  })

  it('formats whole-number prices without decimals', () => {
    expect(formatPrice(100)).toBe('$100')
  })

  it('pads a single-decimal float to two places', () => {
    expect(formatPrice(5.5)).toBe('$5.50')
  })
})
