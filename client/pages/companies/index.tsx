import { Text } from '@mantine/core';
import { useRouter } from 'next/router';

import { TableContainer } from '@/components';
import { useGetPredict } from '@/hooks';
import { Layout } from '@/layout';
import { getCompaniesStore } from '@/store';
import { Methods } from '@/types';
import { titleDictionary } from '@/utils/consts';

const Companies = () => {
  const companies = getCompaniesStore();
  const router = useRouter();
  const type = router.query.type as Methods;

  const { data, isFetching } = useGetPredict(
    type,
    companies.formData,
    companies.file?.lastModified
  );

  return (
    <Layout
      title={titleDictionary[type]}
      description={`Прогнозы с помощью ${titleDictionary[type]}`}
    >
      {companies.formData ? (
        <TableContainer
          companies={data ?? []}
          isLoading={isFetching}
          details={type}
        />
      ) : (
        <Text weight='bold' size='lg'>
          Загрузите файл!
        </Text>
      )}
    </Layout>
  );
};

export default Companies;
