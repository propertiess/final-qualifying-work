import { PropsWithChildren, useState } from 'react';
import {
  AppShell,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Stack,
  Title
} from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';

import { Menu } from './Menu';

type Props = PropsWithChildren & {
  title: string;
  description: string;
};

export const Layout = ({ title, description, children }: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <AppShell
        header={
          <Header height={{ base: 50, md: 70 }} p='md'>
            <div className='flex h-full items-center'>
              <Link href='/'>
                <Title className='text-center text-sm sm:text-lg md:text-2xl'>
                  Система прогнозирования
                </Title>
              </Link>

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
        <Stack className='pb-40'>{children}</Stack>
      </AppShell>
    </>
  );
};
