import { instance } from './instance';

export const PredictService = {
  async getPredictByMovingAverage(formData: FormData) {
    const { data } = await instance.post('/predict', formData, {
      params: {
        type: 'moving_average'
      }
    });
    return data;
  }
};
