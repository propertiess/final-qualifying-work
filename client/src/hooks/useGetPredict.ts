import { useQuery } from '@/hooks';
import { PredictService } from '@/services';

export const useGetPredictByMovingAverage = (formData: FormData | null) => {
  return useQuery({
    enabled: !!formData,
    queryFn: () => PredictService.getPredictByMovingAverage(formData!)
  });
};

export const useGetPredictByLinearRegression = (formData: FormData | null) => {
  return useQuery({
    enabled: !!formData,
    queryFn: () => PredictService.getPredictByLinearRegression(formData!)
  });
};
