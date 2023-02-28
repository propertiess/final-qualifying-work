import { useRouter } from 'next/router';

import { useGetMovingAverageData } from '@/hooks';
import { Layout } from '@/layout';

const MovingAverageDetails = () => {
  const router = useRouter();
  const data = useGetMovingAverageData();
  const single = data ? data[+router.query.idx!] : [];

  return (
    <Layout title={single[0]} description={`${single[0]} графики`}>
      {single[2].map(el => (
        <p key={el.year}>{el.year}</p>
      ))}
    </Layout>
  );
};

export default MovingAverageDetails;
