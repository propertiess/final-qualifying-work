import {
  Center,
  clsx,
  Loader,
  ScrollArea,
  Stack,
  Table,
  Text
} from '@mantine/core';

import { TCompanies, TCompaniesByMA } from '@/types';
import { dictionary, propIndicator } from '@/utils/consts';
import { formatCurrency } from '@/utils/helpers';

type Props = {
  companies: TCompanies | TCompaniesByMA;
  isLoading: boolean;
};

export const TableContainer = ({ companies, isLoading }: Props) => {
  return (
    <ScrollArea mx='auto'>
      <Stack mt='md'>
        <>
          {isLoading && (
            <Center mt='xl'>
              <Loader />
            </Center>
          )}
          {companies.map(([companyName, data]) => (
            <Stack mt='lg' key={companyName}>
              <div>
                <Text weight={500} component='span'>
                  Компания {companyName.toUpperCase()}
                </Text>
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
