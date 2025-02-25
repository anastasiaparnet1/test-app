import { ExpandableContent } from './ExpandableContent';
import { useAppSelector } from '~/redux/store';

export const Table = (props: any) => {
  const testReport = useAppSelector((state) => state.report.report);
  return (
    <table className={'border w-full border-gray-100'}>
      <tbody>
        {Object.entries(testReport).map(([id, testLog]) => {
          return <ExpandableContent key={id} props={testLog} />;
        })}
      </tbody>
    </table>
  );
};
