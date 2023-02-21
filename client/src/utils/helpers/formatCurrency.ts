export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0
  }).format(value);
};
