import { describe, expect, it } from 'vitest';
import {
  normalizeDimensionValue,
  normalizeDimensions,
} from './normalize-dimensions';

describe('normalizeDimensionValue', () => {
  it('supports comma-separated decimals and rounds the result', () => {
    expect(normalizeDimensionValue('10,6')).toBe(11);
  });

  it('returns null for empty or non-positive values', () => {
    expect(normalizeDimensionValue('')).toBeNull();
    expect(normalizeDimensionValue('0')).toBeNull();
    expect(normalizeDimensionValue('-12')).toBeNull();
  });
});

describe('normalizeDimensions', () => {
  it('returns normalized dimensions when both values are valid', () => {
    expect(
      normalizeDimensions({
        widthInput: '29.8',
        heightInput: '40',
      }),
    ).toEqual({
      widthCm: 30,
      heightCm: 40,
    });
  });

  it('returns null when one of the dimensions is invalid', () => {
    expect(
      normalizeDimensions({
        widthInput: '18',
        heightInput: 'abc',
      }),
    ).toBeNull();
  });
});
