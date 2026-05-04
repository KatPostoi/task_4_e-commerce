type CalculateFramePriceInput = {
  widthCm: number;
  heightCm: number;
  materialPricePerCm: number;
  styleCoefficient: number;
};

export const calculateFramePrice = ({
  widthCm,
  heightCm,
  materialPricePerCm,
  styleCoefficient,
}: CalculateFramePriceInput): number => {
  const perimeter = widthCm + heightCm;
  const rawPrice = perimeter * materialPricePerCm * styleCoefficient;

  return Math.max(0, Math.round(rawPrice));
};
