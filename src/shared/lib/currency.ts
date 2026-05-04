const rubFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number): string => {
  if (!Number.isFinite(value)) {
    return '-';
  }

  return rubFormatter.format(value);
};
