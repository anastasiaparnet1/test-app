import type { FC } from 'react';

export const Chip: FC<{
  value: string;
  type: 'success' | 'fail';
  checked?: boolean;
  onClick?: () => void;
}> = ({ value, type, checked, onClick }) => {
  return (
    <p
      onClick={onClick}
      className={`${
        type === 'success'
          ? 'text-success-2 bg-success border-success-2'
          : 'text-fail-2 border-fail-2' +
            (checked === undefined || checked ? ' bg-fail' : ' bg-fail/2')
      } border w-fit min-w-[56px] px-2.5 py-1 rounded-2xl text-center text-xs`}
    >
      {value}
    </p>
  );
};
