import { PropsWithChildren } from 'react';
import Link from 'next/link';

type Props = PropsWithChildren & {
  href: string;
};

export const A = ({ href, children }: Props) => {
  return (
    <Link
      className='block text-[#4dabf7d7] transition-colors duration-300 hover:text-[#4dabf7]'
      href={href}
    >
      {children}
    </Link>
  );
};
