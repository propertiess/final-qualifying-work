import { useEffect, useRef, useState } from 'react';
import { Breadcrumbs, Center, clsx, Stack, Table, Title } from '@mantine/core';
import { Line } from '@nivo/line';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import ErrorPage from 'pages/404';

import { A } from '@/components';
import { Layout } from '@/layout';
import { useCompaniesStore } from '@/store';
import { Methods } from '@/types';
import {
  indicatorDictionary,
  propIndicator,
  titleDictionary
} from '@/utils/consts';
import { getDataForChart } from '@/utils/helpers/get-data-for-chart';

const CompanyDetails = observer(() => {
  const companies = useCompaniesStore();

  const router = useRouter();
  const type = router.query.type as Methods;

  const data = companies.methods[type];

  const company = data?.[+router.query.idx!] ?? [];

  const [chartWidth, setChartWidth] = useState(500);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { width } = stackRef.current?.getBoundingClientRect() ?? {
      width: 500
    };

    chartWidth < width && setChartWidth(width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!company.length) {
    return <ErrorPage />;
  }

  return (
    <Layout title={company[0]} description={`Графики компании ${company[0]}`}>
      <Breadcrumbs>
        <A href='/'>Главная</A>
        <A href={`/companies?type=${type}`}>
          Таблицы - {titleDictionary[type]}
        </A>
        <A href='#'>Графики - {titleDictionary[type]}</A>
      </Breadcrumbs>
      <Center>
        <Title>
          {company[0]}, {titleDictionary[type]}
        </Title>
      </Center>
      {propIndicator.map((indicator, idx) => {
        if (indicator === 'year') {
          return null;
        }

        const { factData, predictData, mae, mse, mape, min, max } =
          getDataForChart(company, indicator);

        return (
          <Stack
            key={indicator}
            h={500}
            className={clsx('h-fit w-full', idx > 1 && 'mt-2')}
            ref={stackRef}
          >
            <Title>{indicatorDictionary[indicator]}</Title>
            <Table>
              <thead>
                <tr>
                  <th>MSE</th>
                  <th>MAE</th>
                  <th>MAPE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{mse}</td>
                  <td>{mae}</td>
                  <td>{mape} %</td>
                </tr>
              </tbody>
            </Table>
            <Center>
              <Line
                height={500}
                width={chartWidth}
                data={[
                  {
                    id: 'Фактическое значения',
                    color: 'hsl(328, 70%, 50%)',
                    data: factData
                  },
                  {
                    id: `${
                      type === 'moving-average'
                        ? 'Скользящая средняя'
                        : 'Предсказанные значения'
                    }`,
                    color: 'hsl(324, 70%, 50%)',
                    data: predictData
                  }
                ]}
                yScale={{
                  type: 'linear',
                  stacked: false,
                  min: min - 1,
                  max: max + 1
                }}
                margin={{ top: 10, right: 50, bottom: 100, left: 60 }}
                pointSize={10}
                pointBorderWidth={2}
                axisLeft={{}}
                colors={{ scheme: 'category10' }}
                yFormat='>-.2f'
                useMesh
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: -60,
                    translateY: 70,
                    itemsSpacing: 0,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
              />
            </Center>
          </Stack>
        );
      })}
    </Layout>
  );
});

export default CompanyDetails;
