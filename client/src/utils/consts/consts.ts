import { Indicators } from '@/types';

export const propIndicator: Exclude<keyof Indicators, ''>[] = [
  'year',
  'profit',
  'net_profit',
  'net_loss'
];

export const dictionary = {
  net_profit: 'Чистая прибыль, ₽',
  profit: 'Выручка, ₽',
  net_loss: 'Чистый убыток, ₽',
  year: 'Год'
};
