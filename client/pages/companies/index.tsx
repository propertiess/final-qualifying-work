import { Breadcrumbs } from '@mantine/core';
import { useRouter } from 'next/router';

import { A, TableContainer } from '@/components';
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
      <Breadcrumbs>
        <A href='/'>Главная</A>
        <A href='#'>Таблицы - {titleDictionary[type]}</A>
      </Breadcrumbs>

      {data && (
        <TableContainer
          companies={data}
          isLoading={isFetching}
          details={type}
        />
      )}
    </Layout>
  );
};

export default Companies;
