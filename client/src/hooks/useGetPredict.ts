import { useQuery } from '@tanstack/react-query';

import { queryClient } from '@/../pages/_app';
import { PredictService } from '@/services';
import { Methods, TCompanies } from '@/types';

export const useGetDataByType = (type: Methods) => {
  const data = queryClient.getQueriesData<TCompanies>([type]);

  if (!data.length) return [];

  return data[data.length - 1][1];
};

export const useGetPredict = (
  type: Methods,
  formData?: FormData,
  lastModified?: number
) => {
  return useQuery({
    queryKey: [type, lastModified],
    enabled: !!formData,
    queryFn: () => PredictService.getByType(formData!, type),
    staleTime: formData ? Infinity : undefined
  });
};
