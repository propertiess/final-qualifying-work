import { useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';

import { TableContainer } from '@/components';
import { PredictService } from '@/services';
import { getCompaniesStore } from '@/store';

export const MovingAveragePage = observer(() => {
  const companies = getCompaniesStore();
  const { data, isFetching } = useQuery({
    queryKey: ['moving-average'],
    enabled: !!companies.formData,
    staleTime: 10_000,
    queryFn: () => PredictService.getPredictByMovingAverage(companies.formData!)
  });

  return <TableContainer isLoading={isFetching} companies={data ?? []} />;
});
