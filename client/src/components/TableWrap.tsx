import { PropsWithChildren } from 'react';
import { ScrollArea, Stack } from '@mantine/core';

type Props = PropsWithChildren;

export const TableWrap = ({ children }: Props) => {
  return (
    <ScrollArea mx='auto'>
      <Stack mt='md'>{children}</Stack>
    </ScrollArea>
  );
};
