import { ExpandableContent } from './ExpandableContent';
import { useAppSelector } from '~/redux/store';
import { GlobalFilter } from '~/report/components/GlobalFilter';

export const Table = (props: any) => {
  const testReport = useAppSelector((state) => state.report.report);
  return (
    <div className={'bg-white border w-full border-gray-100 overflow-hidden'}>
      <GlobalFilter />
      <div className={'overflow-auto'}>
        <table className={'border  border-gray-100 w-screen '}>
          <tbody>
            {Object.entries(testReport).map(([id, testLog]) => {
              return <ExpandableContent key={id} props={testLog} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
