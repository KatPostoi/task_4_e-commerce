import { describe, expect, it } from 'vitest';
import { calculateFramePrice } from './calculate-frame-price';

describe('calculateFramePrice', () => {
  it('calculates price from dimensions, material price, and style coefficient', () => {
    expect(
      calculateFramePrice({
        widthCm: 40,
        heightCm: 60,
        materialPricePerCm: 15,
        styleCoefficient: 1.5,
      }),
    ).toBe(2250);
  });

  it('clamps negative raw values to zero', () => {
    expect(
      calculateFramePrice({
        widthCm: 40,
        heightCm: 60,
        materialPricePerCm: 15,
        styleCoefficient: -1,
      }),
    ).toBe(0);
  });
});
