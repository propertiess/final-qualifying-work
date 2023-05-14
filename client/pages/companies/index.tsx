import { useEffect } from 'react';
import { Breadcrumbs } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { A, TableContainer } from '@/components';
import { Layout } from '@/layout';
import { useCompaniesStore } from '@/store';
import { Methods } from '@/types';
import { titleDictionary } from '@/utils/consts';

const Companies = observer(() => {
  const companies = useCompaniesStore();
  const router = useRouter();
  const type = router.query.type as Methods;

  useEffect(() => {
    if (!type) {
      return;
    }

    if (companies.methods[type].length || companies.isLoading[type]) {
      return;
    }

    companies.setMethod(type);
  }, [type, companies]);

  return (
    <Layout
      title={titleDictionary[type]}
      description={`Прогнозы с помощью ${titleDictionary[type]}`}
    >
      <Breadcrumbs>
        <A href='/'>Главная</A>
        <A href='#'>Таблицы - {titleDictionary[type]}</A>
      </Breadcrumbs>

      <TableContainer
        companies={companies.methods[type] ?? []}
        isLoading={companies.isLoading[type]}
        details={type}
      />
    </Layout>
  );
});

export default Companies;
