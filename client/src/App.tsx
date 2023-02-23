import { useState } from 'react';
import {
  Center,
  FileInput,
  Flex,
  Loader,
  Stack,
  Table,
  Tabs,
  Text
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { TableWrap } from './components/TableWrap';
import { PredictService } from './services/predict.service';
import { formatCurrency } from './utils/helpers/formatCurrency';

type Indicators = {
  profit: number;
  net_profit: number;
  net_loss: number;
};

export type Companies = {
  [x: string]: Indicators;
} & {
  year: number;
};

const dictionary = {
  net_profit: 'Чистая прибыль, ₽',
  profit: 'Выручка, ₽',
  net_loss: 'Чистый убыток, ₽'
};

export const App = () => {
  const [companiesByMA, setCompaniesByMA] = useState<Companies | null>(null);
  const [isLoadingCompaniesByMA, setIsLoadingCompaniesByMA] = useState(false);
  const [companiesByLR, setCompaniesByLR] = useState<Companies | null>(null);

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
      setCompaniesByMA(values);
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
          {companiesByMA && (
            <TableWrap title='Данные, спрогнозированы с помощью метода скользящей средней'>
              {Object.entries(companiesByMA).map(([company, indicators]) => {
                if (company.match(/year/)) {
                  return (
                    <h4 key={company}>
                      Прогнозируемые данные для компании в {companiesByMA.year}
                    </h4>
                  );
                }
                return (
                  <Stack key={company} mt='lg'>
                    <div>
                      <Text weight={500} component='span'>
                        Компания {company.toUpperCase()}
                      </Text>
                    </div>
                    <Table horizontalSpacing='xl'>
                      <thead>
                        <tr>
                          {Object.entries(indicators).map(([indicator]) => (
                            <th key={indicator}>
                              {dictionary[indicator as keyof typeof dictionary]}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {Object.entries(indicators).map(
                            ([indicator, val]) => (
                              <td key={indicator}>{formatCurrency(val)}</td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </Table>
                  </Stack>
                );
              })}
            </TableWrap>
          )}
        </Tabs.Panel>
        <Tabs.Panel value='lr'>
          {companiesByLR && (
            <TableWrap title='Данные, спрогнозированы с помощью линейной регрессии'></TableWrap>
          )}
        </Tabs.Panel>
      </Tabs>
    </main>
  );
};
