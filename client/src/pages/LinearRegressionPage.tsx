import { useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';

import { TableContainer } from '@/components';
import { PredictService } from '@/services';
import { getCompaniesStore } from '@/store';

export const LinearRegressionPage = observer(() => {
  const companies = getCompaniesStore();
  const { data, isFetching } = useQuery({
    queryKey: ['linear-regression'],
    enabled: !!companies.formData,
    staleTime: 10_000,
    queryFn: () =>
      PredictService.getPredictByLinearRegression(companies.formData!)
  });

  return <TableContainer isLoading={isFetching} companies={data ?? []} />;
});
