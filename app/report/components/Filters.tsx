import { useAppDispatch, useAppSelector } from '~/redux/store';
import { search, setFilter } from '~/redux/report/report.slice';
import type { FC } from 'react';
import { FailedIcon } from '~/report/components/icons/FailedIcon';
import { CheckedIcon } from '~/report/components/icons/CheckedIcon';

export const Filters: FC<{ testId: string }> = ({ testId }) => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector(
    (state) => state.report.report[testId].result_counter,
  );
  const filter = useAppSelector((state) => state.report.filters[testId]);
  return (
    <div
      className={
        'flex flex-col gap-2 lg:flex-row w-full border-b border-gray-350 py-2 justify-between items-center pr-1.5 pl-[46px]'
      }
    >
      <div className={'flex gap-3 text-xs'}>
        <button
          onClick={() =>
            dispatch(setFilter({ filter: 'all', id: testId, global: false }))
          }
          className={`border border-gray-150 rounded-lg py-2.5 px-3 ${
            filter !== 'all' ? 'bg-gray-160 text-gray-500 ' : 'bg-white'
          }`}
        >
          All Checks {counter.fail + counter.pass}
        </button>
        <button
          onClick={() => dispatch(setFilter({ filter: 'failed', id: testId, global: false }))}
          className={`flex items-center gap-1 border border-gray-150 rounded-lg py-2.5 px-3 ${
            filter !== 'failed' ? 'bg-gray-160 text-gray-500 ' : 'bg-white'
          }`}
        >
          <FailedIcon />
          <span>Failed Only {counter.fail}</span>
        </button>
        <button
          onClick={() => dispatch(setFilter({ filter: 'skipped', id: testId, global:false }))}
          className={` flex items-center gap-1 border border-gray-150 rounded-lg py-2.5 px-3 ${
            filter !== 'skipped' ? 'bg-gray-160 text-gray-500 ' : 'bg-white '
          }`}
        >
          <CheckedIcon />
          <span>Skipped {counter.pass}</span>
        </button>
      </div>
      <div>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={({ target }) =>
              dispatch(search({ id: testId, search: target.value }))
            }
            type="search"
            id="search"
            className=" placeholder-gray-search block w-[300px] py-1.5 pl-8 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search through failed records"
            required
          />
        </div>
      </div>
    </div>
  );
};
