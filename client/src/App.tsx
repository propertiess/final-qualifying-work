import { useState } from 'react';
import { FileInput, Grid, Stack, Table, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { PredictService } from './services/predict.service';
import { formatCurrency } from './utils/helpers/formatCurrency';

type Company = {
  profit: Record<number, string>;
  net_profit: Record<number, string>;
  net_loss: Record<number, string>;
  year: Record<number, number>;
};

type Companies = [string, Company][];

const dictionary = {
  net_profit: 'Чистая прибыль, ₽',
  profit: 'Выручка, ₽',
  net_loss: 'Чистый убыток, ₽'
};

export const App = () => {
  const [companiesByMA, setCompaniesByMA] = useState<Companies>([]);
  const [companiesByLR, setCompaniesByLR] = useState<Companies>([]);

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

    try {
      const values = await PredictService.getPredictByMovingAverage(data);
      const convertedValues = Object.entries(values).map(([key, value]) => [
        key,
        JSON.parse(value as string)
      ]) as Companies;
      setCompaniesByMA(convertedValues);
    } catch (e) {
      e instanceof Error &&
        showNotification({
          title: 'Ошибка',
          message: e.message
        });
    }
  };

  return (
    <main className='p-10'>
      <FileInput
        label='Загрузите dataset'
        withAsterisk
        accept='.xlsx,.xls'
        onChange={file => onChangeFile(file)}
      />
      <Grid>
        <Grid.Col span={6}>
          {!!companiesByMA.length && (
            <Stack mt='md'>
              <Text
                component='h3'
                size='lg'
                weight={500}
                className='text-center'
              >
                Данные, спрогнозированы с помощью метода скользящей средней
              </Text>
              {companiesByMA.map(([keyData, value]) => (
                <Stack key={keyData} mt='lg'>
                  <div>
                    В {value.year[Object.entries(value.year).length - 1] + 1}{' '}
                    прогнозируемые данные для компании{' '}
                    <Text weight={500} component='span'>
                      {keyData.toUpperCase()}:
                    </Text>
                  </div>
                  <Table horizontalSpacing='xl'>
                    <thead>
                      <tr>
                        {Object.entries(value).map(([key]) => (
                          <th key={key}>
                            {dictionary[key as keyof typeof dictionary]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.entries(value).map(([key, prop]) => {
                          if (key === 'year') {
                            return null;
                          }
                          const lastIndex = Object.keys(prop).length - 1;

                          return (
                            <td key={key}>
                              {formatCurrency(+prop[lastIndex])}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </Table>
                </Stack>
              ))}
            </Stack>
          )}
        </Grid.Col>
        <Grid.Col span={6}>
          {!!companiesByLR.length && (
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
