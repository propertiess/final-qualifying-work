import { useQuery } from '@tanstack/react-query';

import { queryClient } from '@/../pages/_app';
import { PredictService } from '@/services';
import { TCompanies, TCompaniesByMA } from '@/types';
import { routes } from '@/utils/consts';

export const useGetMovingAverageData = () => {
  const data = queryClient.getQueriesData<TCompaniesByMA>([
    routes.moving_average
  ]);

  if (!data.length) return [];

  return data[data.length - 1][1];
};

export const useGetLinearRegressionData = () => {
  const data = queryClient.getQueriesData<TCompanies>([
    routes.linear_regression
  ]);

  if (!data.length) return [];

  return data[data.length - 1][1];
};

export const useGetPredictByMovingAverage = (
  formData?: FormData,
  lastModified?: number
) => {
  return useQuery({
    queryKey: [routes.moving_average, lastModified],
    enabled: !!formData,
    queryFn: () => PredictService.getPredictByMovingAverage(formData!),
    staleTime: formData ? Infinity : undefined
  });
};

export const useGetPredictByLinearRegression = (
  formData?: FormData,
  lastModified?: number
) => {
  return useQuery({
    queryKey: [routes.linear_regression, lastModified],
    enabled: !!formData,
    queryFn: () => PredictService.getPredictByLinearRegression(formData!),
    staleTime: formData ? Infinity : undefined
  });
};
