import { PropsWithChildren, useState } from 'react';
import {
  AppShell,
  Burger,
  Flex,
  Footer,
  Header,
  MediaQuery,
  Stack
} from '@mantine/core';
import Head from 'next/head';

import { Logo } from '@/components';

import { Menu } from './Menu';

type Props = PropsWithChildren & {
  title: string;
  description?: string;
};

export const Layout = ({ title, description, children }: Props) => {
  const [opened, setOpened] = useState(false);

  const toggleMenu = () => {
    setOpened(prev => !prev);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        {description ? (
          <meta name='description' content={description} />
        ) : (
          <meta name='robots' content='noindex' />
        )}
      </Head>
      <AppShell
        header={
          <Header height={{ base: 50, md: 70 }} p='md'>
            <Flex className='h-full items-center'>
              <Logo />
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={toggleMenu}
                  size='sm'
                  ml='auto'
                  mr='xl'
                />
              </MediaQuery>
            </Flex>
          </Header>
        }
        navbar={<Menu opened={opened} onChange={toggleMenu} />}
        footer={
          <Footer height='auto' p='xs' className='text-center'>
            &copy; 2023
          </Footer>
        }
      >
        <Stack className='pl-4 pb-20 md:pl-0'>{children}</Stack>
      </AppShell>
    </>
  );
};
