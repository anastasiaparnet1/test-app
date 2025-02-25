import { useAppDispatch, useAppSelector } from '~/redux/store';
import { setFilter } from '~/redux/report/report.slice';

export const Filters = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.report.filters);
  return (
    <div
      className={
        'flex w-full border-b border-gray-100 py-2 justify-between pr-1.5 border pl-[46px]'
      }
    >
      <div className={'flex gap-3 text-xs'}>
        <button
          onClick={() => dispatch(setFilter('all'))}
          className={`border border-gray-150 rounded-lg py-2.5 px-3 ${
            filter !== 'all' ? 'bg-gray-160 text-gray-500 ' : 'bg-white'
          }`}
        >
          All Checks
        </button>
        <button
          onClick={() => dispatch(setFilter('failed'))}
          className={`flex items-center gap-1 border border-gray-150 rounded-lg py-2.5 px-3 ${
            filter !== 'failed' ? 'bg-gray-160 text-gray-500 ' : 'bg-white'
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
          <span>Failed Only</span>
        </button>
        <button
          onClick={() => dispatch(setFilter('skipped'))}
          className={` flex items-center gap-1 border border-gray-150 rounded-lg py-2.5 px-3 ${
            filter !== 'skipped' ? 'bg-gray-160 text-gray-500 ' : 'bg-white '
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
          <span>Skipped</span>
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
            type="search"
            id="search"
            className="block w-[300px] py-1.5 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
      </div>
    </div>
  );
};
