import {expand, setFilter} from '~/redux/report/report.slice';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { Event, eventemmiiter } from '~/report/eventemmiiter';
import { useEffect, useState } from 'react';

export const GlobalFilter = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.report.globalFilter);
const expanded = useAppSelector(state => state.report.expand)
  const reports = useAppSelector((state) => state.report.report);

  const counter = Object.values(reports).reduce(
    (acc, item) => {
      return {
        fail: acc.fail + item.result_counter.fail,
        pass: acc.pass + item.result_counter.pass,
        failedCount:
          item.source_data_count !== item.target_data_count
            ? acc.failedCount + 1
            : acc.failedCount,
        failedData: item.data_mismatch?.some((el) => el.mismatch.length)
          ? acc.failedData + 1
          : acc.failedData,
      };
    },
    { fail: 0, pass: 0, failedCount: 0, failedData: 0 },
  );
  const [expandedGlobal, setExpand] = useState(false);

  return (
    <div>
      <div
        className={
          'flex flex-col  py-2 justify-between py-2 px-3 lg:flex-row gap-2'
        }
      >
        <div className={'flex gap-3 flex-col text-xs lg:flex-row'}>
          <button
            onClick={() => {
              for (const testCaseId in reports) {
                dispatch(
                  setFilter({ filter: 'all', id: testCaseId, global: true }),
                );
              }
            }}
            className={`border rounded-lg py-2.5 px-3 ${
              filter !== 'all'
                ? 'bg-gray-160 text-gray-500  border-gray-150 '
                : 'bg-blue-250 text-white  border-blue-250'
            }`}
          >
            All Checks {counter.pass + counter.fail}
          </button>
          <button
            onClick={() => {
              for (const testCaseId in reports) {
                dispatch(setFilter({ filter: 'failed', id: testCaseId, global: true }));
              }
            }}
            className={`flex items-center gap-1 border rounded-lg py-2.5 px-3 ${
              filter !== 'failed'
                ? 'bg-gray-160 text-gray-500  border-gray-150 '
                : 'bg-blue-250 text-white  border-blue-250'
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5396_5033)">
                <path
                  d="M10 6L6 10"
                  stroke="#E55D5D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L10 10"
                  stroke="#E55D5D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                  stroke="#E55D5D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_5396_5033">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Failed Only {counter.fail}</span>
          </button>
          <button
            onClick={() => {
              for (const testCaseId in reports) {
                dispatch(setFilter({ filter: 'skipped', id: testCaseId, global: true }));
              }
            }}
            className={` flex items-center gap-1 border rounded-lg py-2.5 px-3 ${
              filter !== 'skipped'
                ? 'bg-gray-160 text-gray-500  border-gray-150 '
                : 'bg-blue-250 text-white  border-blue-250'
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5396_5041)">
                <path
                  d="M5.5 8.5L7 10L10.5 6.5"
                  stroke="#1BA34C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                  stroke="#1BA34C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_5396_5041">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Skipped {counter.pass}</span>
          </button>
          <button
            onClick={() => {
              for (const testCaseId in reports) {
                dispatch(setFilter({ filter: 'failed count', id: testCaseId, global: true }));
              }
            }}
            className={` flex items-center gap-1 border  rounded-lg py-2.5 px-3 ${
              filter !== 'failed count'
                ? 'bg-gray-160 text-gray-500  border-gray-150 '
                : 'bg-blue-250 text-white  border-blue-250'
            }`}
          >
            <span>Failed Count {counter.failedCount}</span>
          </button>
          <button
            onClick={() => {
              for (const testCaseId in reports) {
                dispatch(setFilter({ filter: 'failed data', id: testCaseId , global: true}));
              }
            }}
            className={` flex items-center gap-1 border rounded-lg py-2.5 px-3 ${
              filter !== 'failed data'
                ? 'bg-gray-160 text-gray-500  border-gray-150 '
                : 'bg-blue-250 text-white  border-blue-250'
            }`}
          >
            <span>Failed Data {counter.failedData}</span>
          </button>
        </div>

        <button
          onClick={() => {

            for (const id in expanded) {
              dispatch(expand({ id, expand: !expandedGlobal}))
            }
            setExpand(!expandedGlobal);
          }}
          className={` flex flex-row items-center text-base gap-2 border border-gray-150 rounded-lg py-2.5 px-3 bg-white`}
        >
          <span>{!expandedGlobal ? 'Expand' : 'Hide'} all </span>
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            className={'text-black-100 dark:text-white'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.3891 9.11102C1.17432 8.89623 0.826075 8.89623 0.611287 9.11102C0.396499 9.32581 0.396499 9.67405 0.611287 9.88883L3.61129 12.8888C3.82608 13.1036 4.17432 13.1036 4.3891 12.8888L7.38911 9.88883C7.60389 9.67405 7.60389 9.3258 7.38911 9.11102C7.17432 8.89623 6.82608 8.89623 6.61129 9.11102L4.0002 11.7221L1.3891 9.11102Z"
              fill="currentColor"
            />
            <path
              d="M6.61129 4.88883C6.82607 5.10362 7.17431 5.10362 7.3891 4.88883C7.60389 4.67405 7.60389 4.3258 7.3891 4.11102L4.3891 1.11102C4.18281 0.904727 3.81758 0.904726 3.61129 1.11102L0.611287 4.11102C0.396498 4.32581 0.396498 4.67405 0.611287 4.88883C0.826075 5.10362 1.17432 5.10362 1.3891 4.88883L4.00019 2.27774L6.61129 4.88883Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
