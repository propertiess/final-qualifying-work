import { Fragment } from 'react';
import { clsx, Navbar } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { links } from './menu-links';

type Props = {
  opened?: boolean;
  onChange?: () => void;
};

export const Menu = ({ opened, onChange }: Props) => {
  const { asPath } = useRouter();

  return (
    <Navbar
      width={{
        xs: '100%',
        sm: 300,
        lg: 300
      }}
      hiddenBreakpoint={768}
      hidden={!opened}
      p='xs'
    >
      <Navbar.Section>
        {links.map(link => (
          <Fragment key={link.href}>
            <Link
              className={clsx(
                'hover:text-opacity-100; mt-3 block rounded-md p-3 text-xl font-medium text-white text-opacity-70 hover:bg-gray-800',
                asPath === link.href && 'bg-gray-800 text-opacity-100'
              )}
              href={link.href}
              onClick={onChange}
            >
              {link.title}
            </Link>
          </Fragment>
        ))}
      </Navbar.Section>
    </Navbar>
  );
};
