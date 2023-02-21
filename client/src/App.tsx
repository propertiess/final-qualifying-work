import { useState } from 'react';
import {
  FileInput,
  Flex,
  Grid,
  Loader,
  Stack,
  Table,
  Text
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';

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
      <Grid>
        <Grid.Col span={6}>
          {isLoadingCompaniesByMA && (
            <Flex justify='center' mt='xl'>
              <Loader />
            </Flex>
          )}
          {companiesByMA && (
            <Stack mt='md'>
              <Text
                component='h3'
                size='lg'
                weight={500}
                className='text-center'
              >
                Данные, спрогнозированы с помощью метода скользящей средней
              </Text>
              {Object.entries(companiesByMA).map(([company, indicators]) => {
                if (company.match(/year/)) {
                  return (
                    <div key={company}>
                      Прогнозируемые данные для компании в {companiesByMA.year}
                    </div>
                  );
                }
                return (
                  <Stack key={company} mt='lg'>
                    <div>
                      <Text weight={500} component='span'>
                        {company.toUpperCase()}:
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
            </Stack>
          )}
        </Grid.Col>
        <Grid.Col span={6}>
          {companiesByLR && (
            <Stack mt='md'>
              <Text
                component='h3'
                size='lg'
                weight={500}
                className='text-center'
              >
                Данные, спрогнозированы с помощью линейной регрессии
              </Text>
            </Stack>
          )}
        </Grid.Col>
      </Grid>
    </main>
  );
};
