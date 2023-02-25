import { clsx, Stack, Table, Tabs, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { TableContainer } from '@/components';
import { getCompaniesStore } from '@/store';
import { Indicators } from '@/types';
import { formatCurrency } from '@/utils/helpers';

import { Layout } from './layout';

const propIndicator: Exclude<keyof Indicators, ''>[] = [
  'year',
  'profit',
  'net_profit',
  'net_loss'
];

const dictionary = {
  net_profit: 'Чистая прибыль, ₽',
  profit: 'Выручка, ₽',
  net_loss: 'Чистый убыток, ₽',
  year: 'Год'
};

export const App = observer(() => {
  const companies = getCompaniesStore();

  return (
    <Layout>
      <Tabs defaultValue='ma' mt='lg'>
        <Tabs.List>
          <Tabs.Tab value='ma'>Метод скользящей средней</Tabs.Tab>
          <Tabs.Tab value='lr'>Линейная регрессия</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='ma'>
          {companies.byMA && (
            <TableContainer>
              {companies.byMA.map(([companyName, data]) => (
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
            </TableContainer>
          )}
        </Tabs.Panel>
        <Tabs.Panel value='lr'>
          {companies.byLR && <TableContainer></TableContainer>}
        </Tabs.Panel>
      </Tabs>
    </Layout>
  );
});
