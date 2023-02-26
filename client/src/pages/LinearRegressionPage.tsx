import { Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { TableContainer } from '@/components';
import { useGetPredictByLinearRegression } from '@/hooks/useGetPredict';
import { getCompaniesStore } from '@/store';

export const LinearRegressionPage = observer(() => {
  const companies = getCompaniesStore();
  const { data, isLoading } = useGetPredictByLinearRegression(
    companies.formData
  );

  if (!companies.formData) {
    return (
      <Text weight='bold' size='lg'>
        Загрузите файл!
      </Text>
    );
  }

  return <TableContainer isLoading={isLoading} companies={data ?? []} />;
});
