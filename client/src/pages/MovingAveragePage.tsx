import { observer } from 'mobx-react-lite';

import { TableContainer } from '@/components';
import { getCompaniesStore } from '@/store';

export const MovingAveragePage = observer(() => {
  const companies = getCompaniesStore();

  return (
    <TableContainer
      isLoading={companies.isLoading}
      companies={companies.byMA}
    />
  );
});
