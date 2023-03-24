import { KeysIndicators, TCompany } from '@/types';

import { calculateMAE, calculateMAPE, calculateMSE } from './metrics';

export const getDataForChart = (
  company: TCompany,
  indicator: KeysIndicators
) => {
  const factData = [];
  const predictData = [];

  for (let i = 0; i < company[1].length; i++) {
    const factValues = company[1];
    const predictValues = company[2];

    const predictValue = {
      x: predictValues[i].year,
      y: +predictValues[i][indicator] / 1_000_000_000
    };

    if (i === factValues.length - 1) {
      predictData.push(predictValue);
      break;
    }

    const factValue = {
      x: factValues[i].year,
      y: +factValues[i][indicator] / 1_000_000_000
    };

    factData.push(factValue);
    predictData.push(predictValue);
  }

  const mse = calculateMSE('y', factData, predictData);
  const mae = calculateMAE('y', factData, predictData);
  const mape = calculateMAPE(indicator, company[1], company[2]);

  const min =
    Math.min(...factData.map(el => el.y)) >
    Math.min(...predictData.map(el => el.y))
      ? Math.min(...predictData.map(el => el.y))
      : Math.min(...factData.map(el => el.y));

  const max =
    Math.max(...factData.map(el => el.y)) >
    Math.max(...predictData.map(el => el.y))
      ? Math.max(...factData.map(el => el.y))
      : Math.max(...predictData.map(el => el.y));

  return {
    factData,
    predictData,
    mse,
    mae,
    mape,
    min,
    max
  };
};
