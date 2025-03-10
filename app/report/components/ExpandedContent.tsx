import { type FC, useEffect, useState } from 'react';
import { Chip } from '~/report/components/Chips';
import type {
  QueryHash,
  RecordType,
} from '~/report/components/ExpandableContent';
import { TestReportTable } from '~/report/components/TestReportTable';
import { Filters } from '~/report/components/Filters';
import { SourceIcon } from '~/report/components/icons/SourceIcon';
import { TargetIcon } from '~/report/components/icons/TargetIcon';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { checkColumns, filterReport } from '~/redux/report/report.slice';

export const ExpandedContent: FC<{
  data_mismatch?: RecordType[];
  testCaseId: string;
  query_hash: QueryHash;
}> = ({ data_mismatch, testCaseId, query_hash }) => {
  const [activeTab, setActiveTab] = useState<'dataCheck' | 'details'>(
    'dataCheck',
  );
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.report.columns[testCaseId]);
  useEffect(() => {
    if (columns) dispatch(filterReport({ id: testCaseId, filters: columns }));
  }, [columns]);

  return (
    <div className={'w-full py-2'}>
      <div
        className={'flex gap-2  text-[13px] border-b border-gray-250 pl-[46px]'}
      >
        <div
          onClick={() => setActiveTab('dataCheck')}
          className={` cursor-pointer transition-all delay-50 duration-200 ${
            activeTab === 'dataCheck'
              ? 'border-blue-250 font-semibold text-blue-250 border-b-2'
              : ''
          } `}
        >
          <p>Data Check</p>
        </div>
        <div
          onClick={() => setActiveTab('details')}
          className={`cursor-pointer transition-all delay-50 duration-200 ${
            activeTab === 'details'
              ? 'border-blue-250 font-semibold text-blue-250 border-b-2'
              : ''
          }`}
        >
          <p>Details</p>
        </div>
      </div>

      <div
        className={`${
          activeTab === 'dataCheck' ? 'h-full' : 'h-0 overflow-hidden'
        } box-border w-full`}
      >
        <Filters testId={testCaseId} />
        <div
          className={
            'flex flex-row gap-1 items-center pl-[46px] py-4 flex-wrap'
          }
        >
          <span className={'text-sm text-black-100 font-semibold'}>
            Failure Columns:
          </span>


          {columns?.map((el) => {
            return (
              <p
                onClick={() =>
                  dispatch(
                    checkColumns({
                      id: testCaseId,
                      filter: [{ ...el, checked: !el.checked }],
                    }),
                  )
                }
                className={`${
                  el.checked === undefined || el.checked
                    ? ' bg-fail text-white'
                    : ' bg-fail/2  text-black'
                } border w-fit min-w-[56px] px-2.5 py-1 rounded-2xl text-center text-xs cursor-pointer`}
              >
                {el.value}

                <span className={'text-dark-red'}> {el.count}</span>
              </p>
            );
          })}

          <p className={'text-sm ml-5'}>
            <span
              className={'cursor-pointer underline\n'}
              onClick={() =>
                dispatch(
                  checkColumns({
                    id: testCaseId,
                    filter: columns.map((el) => ({ ...el, checked: true })),
                  }),
                )
              }
            >
              All
            </span>{' '}
            /{' '}
            <span
              className={'cursor-pointer underline'}
              onClick={() =>
                dispatch(
                  checkColumns({
                    id: testCaseId,
                    filter: columns.map((el) => ({ ...el, checked: false })),
                  }),
                )
              }
            >
              None
            </span>{' '}
          </p>
        </div>
        <div className={'w-full pl-[46px]'}>
          <TestReportTable data_mismatch={data_mismatch} />
        </div>
      </div>
      <div
        className={`${activeTab === 'details' ? 'h-full' : 'h-0'} box-border `}
      >
        <div className={'w-full'}>
          <div
            className={'h-full pl-[46px] py-4 overflow-x-auto min-h-[600px]'}
          >
            <table
              className={
                'border-none bg-white w-full text-gray-550 dark:text-white dark:bg-red-100'
              }
            >
              <thead className="font-normal border-none ">
                <tr className="text-xs">
                  <th className="border text-start border-gray-100 py-1 px-4 font-normal w-[15%] uppercase">
                    DB
                  </th>
                  <th className="border text-start border-gray-100 py-1 px-4 font-normal uppercase">
                    Query
                  </th>
                </tr>
              </thead>

              <tbody className={'text-black-150 dark:text-white'}>
                <tr className={'text-xs border border-gray-100 py-1 px-4'}>
                  <td className={'border border-gray-100 py-1 px-4 flex '}>
                    <SourceIcon /> Source Record
                  </td>
                  <td className={`border border-gray-100 py-1 px-4`}>
                    <p className={'flex gap-1'}>{query_hash.source_count}</p>
                  </td>
                </tr>
                <tr className={'text-xs border border-gray-100 py-1 px-4'}>
                  <td className={'border border-gray-100 py-1 px-4 flex '}>
                    <TargetIcon /> Target Record
                  </td>
                  <td className={` border border-gray-100 py-1 px-4`}>
                    <p className={'flex gap-1'}>{query_hash.target_count}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
