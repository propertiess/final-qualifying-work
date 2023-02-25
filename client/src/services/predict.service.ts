import { TCompanies, TCompaniesByMA } from '@/types';

import { instance } from './instance';

export const PredictService = {
  async getPredictByMovingAverage(formData: FormData) {
    const { data } = await instance.post<TCompaniesByMA>('/predict', formData, {
      params: {
        type: 'moving_average'
      }
    });
    return data;
  },
  async getPredictByLinearRegression(formData: FormData) {
    const { data } = await instance.post<TCompanies>('/predict', formData, {
      params: {
        type: 'linear_regression'
      }
    });
    return data;
  }
};
