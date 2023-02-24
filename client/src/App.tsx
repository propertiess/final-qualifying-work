import { useState } from 'react';
import {
  Center,
  clsx,
  FileInput,
  Loader,
  Stack,
  Table,
  Tabs,
  Text
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { observer } from 'mobx-react-lite';

import { TableWrap } from '@/components';
import { PredictService } from '@/services';
import { getCompaniesStore } from '@/store';
import { Indicators } from '@/types';
import { formatCurrency } from '@/utils/helpers';

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
  const [isLoadingCompaniesByMA, setIsLoadingCompaniesByMA] = useState(false);

  const onChangeFile = async (file: File | null) => {
    if (!file) {
      return;
    }

    if (!file.name.match(/.xlsx|.xls/g)) {
      showNotification({
        title: 'Ошибка',
        message: 'Неправильный тип файла!'
      });
      return;
    }

    const data = new FormData();
    data.append('file', file);

    setIsLoadingCompaniesByMA(true);
    try {
      const values = await PredictService.getPredictByMovingAverage(data);
      companies.setByMovingAverage(values);
    } catch (e) {
      e instanceof Error &&
        showNotification({
          title: 'Ошибка',
          message: e.message
        });
    }
    setIsLoadingCompaniesByMA(false);
  };

  return (
    <main className='p-10'>
      <FileInput
        placeholder='Загрузить dataset'
        withAsterisk
        accept='.xlsx,.xls'
        onChange={file => onChangeFile(file)}
      />
      <Tabs defaultValue='ma' mt='lg'>
        <Tabs.List>
          <Tabs.Tab value='ma'>Метод скользящей средней</Tabs.Tab>
          <Tabs.Tab value='lr'>Линейная регрессия</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='ma'>
          {isLoadingCompaniesByMA && (
            <Center mt='xl'>
              <Loader />
            </Center>
          )}
          {companies.byMA && (
            <TableWrap>
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
            </TableWrap>
          )}
        </Tabs.Panel>
        <Tabs.Panel value='lr'>
          {companies.byLR && <TableWrap></TableWrap>}
        </Tabs.Panel>
      </Tabs>
    </main>
  );
});
