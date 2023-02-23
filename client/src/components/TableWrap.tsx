import { PropsWithChildren } from 'react';
import { ScrollArea, Stack, Text } from '@mantine/core';

type Props = PropsWithChildren & {
  title: string;
};

export const TableWrap = ({ title, children }: Props) => {
  return (
    <ScrollArea mx='auto'>
      <Stack mt='md'>
        <Text component='h3' size='lg' weight={500} className='text-center'>
          {title}
        </Text>
        {children}
      </Stack>
    </ScrollArea>
  );
};
