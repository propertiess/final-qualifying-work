import { PropsWithChildren, useState } from 'react';
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

type Props = PropsWithChildren;

export const Layout = ({ children }: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      header={
        <Header height={{ base: 50, md: 70 }} p='md'>
          <div className='flex h-full items-center'>
            {/* <NavLink to='/'>
              <Title className='text-center'>Xlsx filter</Title>
            </NavLink> */}
            <Title className='text-center text-sm sm:text-lg md:text-2xl'>
              Система прогнозирования
            </Title>

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
      // navbar={<MyNavbar opened={opened} />}
      footer={
        <Footer height='auto' p='xs' className='text-center'>
          &copy; 2023
        </Footer>
      }
    >
      <Container>
        <>
          <FileContainer />
          {children}
        </>
      </Container>
    </AppShell>
  );
};
