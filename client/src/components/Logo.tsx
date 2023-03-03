import { Flex, Title } from '@mantine/core';
import Image from 'next/image';

import logo from '@/../public/logo.png';

import { A } from './A';

export const Logo = () => {
  return (
    <Flex align='center' gap='sm'>
      <A href='/'>
        <Image width={32} height={32} src={logo} alt='logo' />
      </A>
      <Title className='text-center text-sm sm:text-lg md:text-2xl'>
        Система прогнозирования
      </Title>
    </Flex>
  );
};
