import { PropsWithChildren } from 'react';
import { Anchor } from '@mantine/core';
import Link from 'next/link';

type Props = PropsWithChildren & {
  href: string;
};

export const A = ({ href, children }: Props) => {
  return (
    <Anchor
      component={Link}
      className='block transition-colors duration-300'
      href={href}
    >
      {children}
    </Anchor>
  );
};
