import { Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { TableContainer } from '@/components';
import { useGetPredictByLinearRegression } from '@/hooks/useGetPredict';
import { Layout } from '@/layout';
import { getCompaniesStore } from '@/store';

const LinearRegressionPage = observer(() => {
  const companies = getCompaniesStore();
  const { data, isFetching } = useGetPredictByLinearRegression(
    companies.formData
  );

  return (
    <Layout
      title='Линейная регрессия'
      description='Прогнозы с помощью линейной регрессии'
    >
      {companies.formData ? (
        <TableContainer
          companies={data ?? []}
          isLoading={isFetching}
          details='linear-regression'
        />
      ) : (
        <Text weight='bold' size='lg'>
          Загрузите файл!
        </Text>
      )}
    </Layout>
  );
});

export default LinearRegressionPage;
