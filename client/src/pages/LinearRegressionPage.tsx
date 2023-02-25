import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<unknown>;

export const LinearRegressionPage = ({ ...rest }: Props) => {
  return <div {...rest}>LinearRegressionPage</div>;
};
