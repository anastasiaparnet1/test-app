import type { FC } from 'react';

export const Chip: FC<{ value: string; type: 'success' | 'fail', onClick?: ()=>void }> = ({
  value,
  type,
}) => {
  return (
    <p
      className={`${
        type === 'success'
          ? 'text-success-2 bg-success border-success-2'
          : 'text-fail-2 bg-fail border-fail-2'
      } border w-fit min-w-[56px] px-2.5 py-1 rounded-2xl text-center text-xs`}
    >
      {value}
    </p>
  );
};
