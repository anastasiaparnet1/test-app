import { Chip } from './Chips';
import { type FC, useEffect, useState } from 'react';
import { ExpandedContent } from '~/report/components/ExpandedContent';
import { Event, eventemmiiter } from '~/report/eventemmiiter';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { CheckedIcon } from '~/report/components/icons/CheckedIcon';
import { expand } from '~/redux/report/report.slice';
export interface QueryHash {
  source_file: boolean;
  target_file: boolean;
  source_count: string;
  target_count: string;
  source_data: string;
  target_data: string;
  format_transform: boolean;
  format_transform_rules: string;
}

export interface ResultCounter {
  pass: number;
  fail: number;
  skipped?: number;
}
export type RecordType = {
  INDEX: number;
  DB: string;
  ID: number;
  user_id: number;
  name: string;
  access: string;
  website: string;
  mismatch: string[];
};

export interface TestReport {
  result_counter: ResultCounter;
  test_start_time: string;
  table_name: string;
  test_case_name: string;
  test_case_id: string;
  test_run_id: string;
  query_hash: QueryHash;
  source_data_count: number;
  target_data_count: number;
  data_check_start_time: string;
  data_mismatch?: RecordType[];
  data_check_end_time: string;
  data_check_time_taken: number;
  test_end_time: string;
}

export const ExpandableContent: FC<{ props: TestReport }> = ({
  props: {
    result_counter: { fail, pass, skipped },
    test_case_name,
    test_case_id,
    data_mismatch,
    query_hash,
    source_data_count,
    target_data_count,
  },
}) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.report.filters[test_case_id]);
  const globalFilter = useAppSelector((state) => state.report.globalFilter);
  const expanded = useAppSelector((state) => state.report.expand[test_case_id]);
  const onClick = () => {
    dispatch(expand({ id: test_case_id, expand: !expanded }));
  };

  const isCountFailed = target_data_count === source_data_count;
  const isDataFailed = data_mismatch?.some((el) => el.mismatch.length);
  const isPassed = pass > 0 && !fail && !skipped && globalFilter === 'passed';
  const isFailed = fail > 0 && globalFilter === 'failed';
  const isSkipped =
    skipped && skipped >= 0 && !isFailed && !isPassed && globalFilter === 'skipped';
  const show =
    (globalFilter === 'failed count' && isCountFailed) ||
    (globalFilter === 'failed data' && isDataFailed) ||
    isPassed ||
    isFailed ||
    isSkipped;

  return (
    <tr
      className={`border  border-gray-100 ${expanded ? 'bg-gray-50' : ''} ${
        globalFilter !== 'all' && !show ? 'hidden' : ''
      }`}
    >
      <td>
        <div
          className={
            'flex flex-col lg:flex-row  justify-between items-center gap-2 px-3 py-2 lg:h-[60px] pr-2 '
          }
          onClick={onClick}
        >
          <div className={'flex flex-row  items-center gap-2 px-3 py-2 h-60px'}>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${expanded ? 'rotate-90' : ''}`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.469673 9.53033C0.176779 9.23744 0.176779 8.76256 0.469672 8.46967L3.93934 5L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762564 0.176777 1.23744 0.176777 1.53033 0.46967L5.53033 4.46967C5.82322 4.76256 5.82322 5.23744 5.53033 5.53033L1.53033 9.53033C1.23744 9.82322 0.762566 9.82322 0.469673 9.53033Z"
                fill="#3D3D3D"
              />
            </svg>

            <Chip
              value={fail !== 0 ? 'Failed' : 'Passed'}
              type={fail !== 0 ? 'fail' : 'success'}
            />

            <p className={'text-sm'}> Test case name: {test_case_name}</p>
          </div>
          <div
            className={
              'text-xs border border-gray-150 rounded-2xl flex text-black-light '
            }
          >
            <p
              className={
                'font-medium flex py-[7px] px-3 gap-1 border-r border-gray-150 '
              }
            >
              <CheckedIcon /> Data Check{' '}
            </p>
            <p className={'py-[7px] px-3 border-r border-gray-150 '}>
              Source:{' '}
              <span className={'font-medium'}> {source_data_count}</span>
            </p>
            <p className={'py-[7px] px-3'}>
              Target:{' '}
              <span className={'font-medium'}> {target_data_count}</span>
            </p>
          </div>
        </div>

        <div
          className={`${
            expanded ? 'h-fit' : ' h-0'
          } flex flex-col overflow-hidden  gap-2 w-full`}
        >
          <ExpandedContent
            data_mismatch={data_mismatch}
            testCaseId={test_case_id}
            query_hash={query_hash}
          />
        </div>
      </td>
    </tr>
  );
};
