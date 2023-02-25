import { PropsWithChildren } from 'react';
import { Center, Loader, ScrollArea, Stack } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { getCompaniesStore } from '@/store';

type Props = PropsWithChildren;

export const TableContainer = observer(({ children }: Props) => {
  const companies = getCompaniesStore();

  return (
    <ScrollArea mx='auto'>
      <Stack mt='md'>
        <>
          {companies.isLoading && (
            <Center mt='xl'>
              <Loader />
            </Center>
          )}
          {children}
        </>
      </Stack>
    </ScrollArea>
  );
});
