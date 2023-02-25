import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<unknown>;

export const MovingAveragePage = ({ ...rest }: Props) => {
  return <div {...rest}>MovingAveragePage</div>;
};
