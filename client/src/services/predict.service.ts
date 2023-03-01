import { Methods, TCompanies } from '@/types';

import { instance } from './instance';

export const PredictService = {
  async getByType(formData: FormData, type: Methods) {
    const { data } = await instance.post<TCompanies>('/predict', formData, {
      params: {
        type
      }
    });
    return data;
  }
};
