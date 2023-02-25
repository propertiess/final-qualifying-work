import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Container,
  Footer,
  Header,
  MediaQuery,
  Title
} from '@mantine/core';

import { FileContainer } from '../components/FileContainer';

import { Menu } from './Menu';

export const Layout = () => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      header={
        <Header height={{ base: 50, md: 70 }} p='md'>
          <div className='flex h-full items-center'>
            <NavLink to='/'>
              <Title className='text-center text-sm sm:text-lg md:text-2xl'>
                Система прогнозирования
              </Title>
            </NavLink>

            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened(o => !o)}
                size='sm'
                ml='auto'
                mr='xl'
              />
            </MediaQuery>
          </div>
        </Header>
      }
      navbar={<Menu opened={opened} onChange={() => setOpened(o => !o)} />}
      footer={
        <Footer height='auto' p='xs' className='text-center'>
          &copy; 2023
        </Footer>
      }
    >
      <Container className='pb-14'>
        <FileContainer />
        <Outlet />
      </Container>
    </AppShell>
  );
};
