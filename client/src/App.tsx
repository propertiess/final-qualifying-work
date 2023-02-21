import { useEffect, useState } from 'react';
import { Stack, Table } from '@mantine/core';

import { instance } from './services/instance';

type Company = {
  profit: Record<number, string>;
  net_profit: Record<number, string>;
  net_loss: Record<number, string>;
  year: Record<number, number>;
};

type Companies = [string, Company][];

const getPredictByMovingAverage = async () => {
  const { data } = await instance.post('/predict', { gg: 1 });
  return data;
};

const words = {
  net_profit: 'Чистая прибыль',
  profit: 'Выручка',
  net_loss: 'Чистый убыток'
};

export const App = () => {
  const [companies, setCompanies] = useState<Companies>([]);

  // useEffect(() => {
  //   const request = async () => {
  //     const res = await gg();
  //     const sir = Object.entries(res).map(([key, value]) => [
  //       key,
  //       JSON.parse(value as string)
  //     ]) as Data;

  //     setData(sir);
  //   };
  //   request();
  // }, []);

  return (
    <main>
      <Stack>
        {companies?.map(([keyData, value]) => (
          <Stack key={keyData}>
            <div>{keyData}</div>
            <div>{value.year[Object.entries(value.year).length - 1]}</div>
            <Table horizontalSpacing='xl'>
              <thead>
                <tr>
                  {Object.entries(value).map(([key]) => (
                    <th key={key}>{words[key as keyof typeof words]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.entries(value).map(([key, prop]) => {
                    if (key === 'year') {
                      return null;
                    }

                    return (
                      <td key={key}>{prop[Object.keys(prop).length - 1]}</td>
                    );
                  })}
                </tr>
              </tbody>
            </Table>
          </Stack>
        ))}
      </Stack>
    </main>
  );
};
