import { FileContainer } from '@/components';
import { Layout } from '@/layout';

const Home = () => {
  return (
    <Layout title='Главная' description='Загрузить датасет для прогноза'>
      <FileContainer />
    </Layout>
  );
};

export default Home;
