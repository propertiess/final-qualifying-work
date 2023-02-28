import { useRouter } from 'next/router';

import { useGetLinearRegressionData } from '@/hooks';
import { Layout } from '@/layout';

const LinearRegressionDetails = () => {
  const router = useRouter();
  const data = useGetLinearRegressionData();
  const single = data ? data[+router.query.idx!] : [];

  return (
    <Layout title={single[0]} description={`${single[0]} графики`}>
      {single[1].map(el => (
        <p key={el.year}>{el.year}</p>
      ))}
    </Layout>
  );
};

export default LinearRegressionDetails;
