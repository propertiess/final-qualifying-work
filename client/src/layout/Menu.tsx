import { Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { clsx, Navbar } from '@mantine/core';

import { links } from './menu-links';

type Props = {
  opened?: boolean;
  onChange?: () => void;
};

export const Menu = ({ opened, onChange }: Props) => {
  const { pathname } = useLocation();

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
            <NavLink
              className={clsx(
                'hover:text-opacity-100; mt-3 block rounded-md p-3 text-xl font-medium text-white text-opacity-70 hover:bg-gray-800',
                pathname === link.href && 'bg-gray-800 text-opacity-100'
              )}
              to={link.href}
              onClick={onChange}
            >
              {link.title}
            </NavLink>
          </Fragment>
        ))}
      </Navbar.Section>
    </Navbar>
  );
};
