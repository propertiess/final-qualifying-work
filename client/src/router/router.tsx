import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/layout';
import { LinearRegressionPage } from '@/pages/LinearRegressionPage';
import { MovingAveragePage } from '@/pages/MovingAveragePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'moving-average',
        element: <MovingAveragePage />
      },
      {
        path: 'linear-regression',
        element: <LinearRegressionPage />
      }
    ]
  }
]);
