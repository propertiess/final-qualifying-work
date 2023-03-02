import { Breadcrumbs, Center, clsx, Stack, Title } from '@mantine/core';
import { Line } from '@nivo/line';
import { useRouter } from 'next/router';
import ErrorPage from 'pages/404';

import { A } from '@/components';
import { useGetDataByType } from '@/hooks';
import { Layout } from '@/layout';
import { Methods } from '@/types';
import {
  indicatorDictionary,
  propIndicator,
  titleDictionary
} from '@/utils/consts';

const CompanyDetails = () => {
  const router = useRouter();
  const type = router.query.type as Methods;
  const data = useGetDataByType(type);
  const company = data ? data[+router.query.idx!] : [];

  if (!company?.length) {
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

        const factData = [];
        const predictData = [];

        for (let i = 0; i < company[1].length; i++) {
          const factValues = company[1];
          const predictValues = company[2];

          const predictValue = {
            x: predictValues[i].year,
            y: +predictValues[i][indicator] / 1_000_000_000
          };

          if (i === factValues.length - 1) {
            predictData.push(predictValue);
            break;
          }

          const factValue = {
            x: factValues[i].year,
            y: +factValues[i][indicator] / 1_000_000_000
          };

          factData.push(factValue);
          predictData.push(predictValue);
        }

        const min =
          Math.min(...factData.map(el => el.y)) >
          Math.min(...predictData.map(el => el.y))
            ? Math.min(...predictData.map(el => el.y))
            : Math.min(...factData.map(el => el.y));

        const max =
          Math.max(...factData.map(el => el.y)) >
          Math.max(...predictData.map(el => el.y))
            ? Math.max(...factData.map(el => el.y))
            : Math.max(...predictData.map(el => el.y));

        return (
          <Stack
            key={indicator}
            h={500}
            className={clsx('w-full', idx > 1 && 'mt-20')}
          >
            <Title>{indicatorDictionary[indicator]}</Title>
            <Center>
              <Line
                height={500}
                width={500}
                data={[
                  {
                    id: 'Фактическое значения, млрд.',
                    color: 'hsl(328, 70%, 50%)',
                    data: factData
                  },
                  {
                    id: `${
                      type === 'moving-average'
                        ? 'Скользящая средняя'
                        : 'Предсказанное значение'
                    }, млрд.`,
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
                theme={{
                  textColor: 'white'
                }}
                axisLeft={{}}
                colors={{ scheme: 'dark2' }}
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
};

export default CompanyDetails;
