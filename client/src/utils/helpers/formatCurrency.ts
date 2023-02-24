export const formatCurrency = (value: number) => {
  return value === -1
    ? '-'
    : new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 0
      }).format(value);
};
