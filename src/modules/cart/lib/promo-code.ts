const promoCodeDiscountPercentMap: Record<string, number> = {
  ZIMA10: 10,
  VESNA20: 20,
  LETO30: 30,
  OSEN40: 40,
};

export const normalizePromoCode = (value: string): string => {
  return value.trim().toUpperCase();
};

export const getPromoDiscountPercent = (value: string): number => {
  const normalizedCode = normalizePromoCode(value);

  return promoCodeDiscountPercentMap[normalizedCode] ?? 0;
};

export const calculatePromoDiscountTotal = (
  baseTotal: number,
  value: string,
): number => {
  const discountPercent = getPromoDiscountPercent(value);

  if (baseTotal <= 0 || discountPercent <= 0) {
    return 0;
  }

  return Math.round(baseTotal * (discountPercent / 100));
};
