import { Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { TableContainer } from '@/components';
import { useGetPredictByMovingAverage } from '@/hooks/useGetPredict';
import { Layout } from '@/layout';
import { getCompaniesStore } from '@/store';

const MovingAveragePage = observer(() => {
  const companies = getCompaniesStore();
  const { data, isFetching } = useGetPredictByMovingAverage(
    companies.formData,
    companies.file?.lastModified
  );

  return (
    <Layout
      title='Метод скользящей средней'
      description='Прогнозы с помощью метода скользящей средней'
    >
      {companies.formData ? (
        <TableContainer
          companies={data ?? []}
          isLoading={isFetching}
          details='moving-average'
        />
      ) : (
        <Text weight='bold' size='lg'>
          Загрузите файл!
        </Text>
      )}
    </Layout>
  );
});

export default MovingAveragePage;
