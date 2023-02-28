import {
  Center,
  clsx,
  Loader,
  ScrollArea,
  Stack,
  Table,
  Text
} from '@mantine/core';
import Link from 'next/link';

import { TCompanies, TCompaniesByMA } from '@/types';
import { dictionary, propIndicator } from '@/utils/consts';
import { formatCurrency } from '@/utils/helpers';

type Props = {
  companies: TCompanies | TCompaniesByMA;
  isLoading: boolean;
  details: 'moving-average' | 'linear-regression';
};

export const TableContainer = ({ companies, isLoading, details }: Props) => {
  return (
    <ScrollArea mx='auto'>
      <Stack mt='md'>
        <>
          {isLoading && (
            <Center mt='xl'>
              <Loader />
            </Center>
          )}
          {companies.map(([companyName, data], idx) => (
            <Stack mt='lg' key={companyName}>
              <div>
                <Text weight={500} component='span'>
                  Компания {companyName.toUpperCase()}
                </Text>
                <Link href={`${details}/${idx}`}>
                  <Text className='text-[#4dabf7d7] transition-colors hover:text-[#4dabf7]'>
                    Ознакомиться с графиками
                  </Text>
                </Link>
              </div>
              <Table horizontalSpacing='xl' highlightOnHover>
                <thead>
                  <tr>
                    {propIndicator.map(prop => (
                      <th key={prop}>{dictionary[prop]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((properties, index) => {
                    return (
                      <tr key={properties.year}>
                        {propIndicator.map(prop => {
                          const style = clsx(
                            index === data.length - 1 && 'font-bold'
                          );
                          if (prop === 'year') {
                            return (
                              <td key={prop} className={style}>
                                {properties[prop]}
                              </td>
                            );
                          }
                          return (
                            <td key={prop} className={style}>
                              {formatCurrency(properties[prop])}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Stack>
          ))}
        </>
      </Stack>
    </ScrollArea>
  );
};
