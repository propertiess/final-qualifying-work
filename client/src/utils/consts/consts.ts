import { KeysIndicators, Methods } from '@/types';

export const propIndicator: KeysIndicators[] = [
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
} as const;

export const titleDictionary: Record<Methods, string> = {
  'moving-average': 'Метод скользящей средней',
  'linear-regression': 'Линейная регрессия',
  ffnn: 'Нейронная сеть прямого распространения',
  rnn: 'Рекуррентная нейронная сеть',
  cnn: 'Свёрточная нейронная сеть'
} as const;

export const routes = Object.fromEntries(
  Object.keys(titleDictionary).map(key => [key, key])
) as Record<Methods, Methods>;
