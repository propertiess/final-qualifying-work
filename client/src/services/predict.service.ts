import { AxiosRequestConfig } from 'axios';

import { Methods, TCompany } from '@/types';

import { instance } from './instance';

export const PredictService = {
  async getByType(
    formData: FormData,
    type: Methods,
    config?: AxiosRequestConfig
  ) {
    const { data } = await instance.post<TCompany[]>('/predict', formData, {
      params: {
        type
      },
      ...config
    });
    return data;
  }
};
