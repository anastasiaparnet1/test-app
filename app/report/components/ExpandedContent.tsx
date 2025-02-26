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
import {useAppDispatch, useAppSelector} from '~/redux/store';
import {checkColumns, filterReport} from '~/redux/report/report.slice';

export const ExpandedContent: FC<{
  data_mismatch?: RecordType[];
  testCaseId: string;
  query_hash: QueryHash;
}> = ({ data_mismatch, testCaseId, query_hash }) => {
  const [activeTab, setActiveTab] = useState<'dataCheck' | 'details'>(
    'dataCheck',
  );
  const dispatch = useAppDispatch();
  const  columns = useAppSelector(state => state.report.columns[testCaseId])
  useEffect(() => {
    if (columns)
    dispatch(filterReport({ id: testCaseId, filters: columns }));
  }, [columns]);

  return (
    <div className={'w-full'}>
      <div
        className={
          'flex gap-2 my-2 text-[13px] border-b border-gray-250 pl-[46px]'
        }
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
        <div className={'flex flex-row gap-1 items-center pl-[46px] py-2 flex-wrap'}>
          <span className={'text-sm text-black-100 font-semibold'}>
            Failure Columns:
          </span>
          <p
            onClick={() =>
               dispatch( checkColumns( { id: testCaseId,  filter: columns.map(el=> ({...el, checked: true}))}))
            }
            className={` border w-fit min-w-[56px] px-2.5 py-1 rounded-2xl text-center text-xs`}
          >
            Select all
          </p>
          <p
            onClick={() =>
                dispatch( checkColumns( { id: testCaseId,  filter: columns.map(el=> ({...el, checked: false}))}))
            }
            className={`border border-red-500 w-fit min-w-[56px] px-2.5 py-1 rounded-2xl text-red-500 text-center text-xs`}
          >
            Cancel all
          </p>
          {columns?.map((el) => {
            return (
              <Chip
                key={el.value}
                value={ el.value+ ' ' + el.count}
                type={'fail'}
                checked={el.checked}
                onClick={() =>
                    dispatch( checkColumns( { id: testCaseId,  filter: [{...el, checked: !el.checked}]}))

                }
              />
            );
          })}
        </div>
        <div className={'w-screen pl-[46px]'}>
          <TestReportTable data_mismatch={data_mismatch} />
        </div>
      </div>
      <div
        className={`${activeTab === 'details' ? 'h-full' : 'h-0'} box-border`}
      >
        <div className={'w-full'}>
          <div className={'h-full pl-[46px] py-4 overflow-x-auto min-h-[600px]' }>
            <table className={'border-none bg-white w-full text-gray-550' }>
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

              <tbody className={'text-black-150'}>
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
