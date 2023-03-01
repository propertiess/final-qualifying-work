import { Indicators } from '@/types';

export const propIndicator: Exclude<keyof Indicators, ''>[] = [
  'year',
  'profit',
  'net_profit',
  'net_loss'
];

export const indicatorDictionary = {
  net_profit: 'Чистая прибыль, ₽',
  profit: 'Выручка, ₽',
  net_loss: 'Чистый убыток, ₽',
  year: 'Год'
};

export const routes = {
  moving_average: 'moving-average',
  linear_regression: 'linear-regression'
};

export const titleDictionary = {
  'moving-average': 'Метод скользящей средней',
  'linear-regression': 'Линейная регрессия'
};
