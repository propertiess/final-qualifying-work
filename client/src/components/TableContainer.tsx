import {
  Center,
  clsx,
  Loader,
  ScrollArea,
  Stack,
  Table,
  Text
} from '@mantine/core';

import { Methods, TCompanies } from '@/types';
import { indicatorDictionary, propIndicator } from '@/utils/consts';
import { formatCurrency } from '@/utils/helpers';

import { A } from './A';

type Props = {
  companies: TCompanies;
  isLoading: boolean;
  details: Methods;
};

export const TableContainer = ({ companies, isLoading, details }: Props) => {
  return (
    <ScrollArea>
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
                <A href={`/companies/${idx}?type=${details}`}>
                  Ознакомиться с графиками
                </A>
              </div>
              <Table horizontalSpacing='xl' highlightOnHover>
                <thead>
                  <tr>
                    {propIndicator.map(prop => (
                      <th key={prop}>{indicatorDictionary[prop]}</th>
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
