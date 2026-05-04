import type { ConstructorNormalizedDimensions } from '../model/constructor-types';

type RawDimensionsInput = {
  widthInput: string;
  heightInput: string;
};

export const normalizeDimensionValue = (value: string): number | null => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const parsedValue = Number(trimmedValue.replace(',', '.'));

  if (Number.isNaN(parsedValue) || parsedValue <= 0) {
    return null;
  }

  return Math.round(parsedValue);
};

export const normalizeDimensions = ({
  widthInput,
  heightInput,
}: RawDimensionsInput): ConstructorNormalizedDimensions | null => {
  const widthCm = normalizeDimensionValue(widthInput);
  const heightCm = normalizeDimensionValue(heightInput);

  if (widthCm === null || heightCm === null) {
    return null;
  }

  return {
    widthCm,
    heightCm,
  };
};
