import { Center, clsx, Stack, Title } from '@mantine/core';
import { Line } from '@nivo/line';
import { useRouter } from 'next/router';
import ErrorPage from 'pages/404';

import { useGetMovingAverageData } from '@/hooks';
import { Layout } from '@/layout';
import { dictionary, propIndicator } from '@/utils/consts';

const MovingAverageDetails = () => {
  const router = useRouter();
  const data = useGetMovingAverageData();
  const company = data ? data[+router.query.idx!] : [];

  if (!company?.length) {
    return <ErrorPage />;
  }

  return (
    <Layout title={company[0]} description={`${company[0]} графики`}>
      <Center>
        <Title>{company[0]}</Title>
      </Center>
      {propIndicator.map((indicator, idx) => {
        if (indicator === 'year') {
          return null;
        }

        return (
          <Stack
            key={indicator}
            h={500}
            className={clsx('w-full', idx > 1 && 'mt-20')}
          >
            <Title>{dictionary[indicator]}</Title>
            <Center>
              <Line
                height={500}
                width={500}
                data={[
                  {
                    id: 'Фактическое значения, млрд.',
                    color: 'hsl(328, 70%, 50%)',
                    data: company[1].map(el => ({
                      x: el.year,
                      y: +el[indicator] / 1_000_000_000
                    }))
                  },
                  {
                    id: 'Скользящая средняя, млрд.',
                    color: 'hsl(324, 70%, 50%)',
                    data: company[2].map(el => ({
                      x: el.year,
                      y: +el[indicator] / 1_000_000_000
                    }))
                  }
                ]}
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

export default MovingAverageDetails;
