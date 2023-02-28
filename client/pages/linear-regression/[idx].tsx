import { useRouter } from 'next/router';
import ErrorPage from 'pages/404';

import { useGetLinearRegressionData } from '@/hooks';
import { Layout } from '@/layout';

const LinearRegressionDetails = () => {
  const router = useRouter();
  const data = useGetLinearRegressionData();
  const company = data ? data[+router.query.idx!] : [];

  if (!company?.length) {
    return <ErrorPage />;
  }

  return (
    <Layout title={company[0]} description={`${company[0]} графики`}>
      {company[1].map(el => (
        <p key={el.year}>{el.year}</p>
      ))}
    </Layout>
  );
};

export default LinearRegressionDetails;
