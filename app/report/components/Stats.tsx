import { useAppSelector } from '~/redux/store';
import { initialState } from '~/redux/report/report.slice';

export const Stats = () => {
  const tablesChecked = Object.values(initialState.report).reduce(
    (el, nest) => {
      return nest.result_counter.fail
        ? {
            ...el,
            failed: el.failed + 1,
            failedCount: el.failedCount + nest.result_counter.fail,
            passCount: el.passCount + nest.result_counter.pass,
          }
        : {
            ...el,
            pass: el.pass + 1,
            failedCount: el.failedCount + nest.result_counter.fail,
            passCount: el.passCount + nest.result_counter.pass,
          };
    },
    { failed: 0, pass: 0, failedCount: 0, passCount: 0 },
  );
  const failedPercent = Math.floor(
    (tablesChecked.failed / (tablesChecked.pass + tablesChecked.failed)) * 100,
  );
  const failedCountPercent = Math.floor(
    (tablesChecked.failedCount /
      (tablesChecked.failedCount + tablesChecked.passCount)) *
      100,
  );
  return (
    <div className={'flex w-full  gap-4 py-2 flex-col lg:flex-row'}>
      <div
        className={
          'rounded-md border border-gray-350 flex-1 bg-white p-5 flex flex-col gap-4'
        }
      >
        <p className={'text-gray-450 uppercase text-xs flex'}>
          {' '}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_5350_7672)">
              <path
                d="M2.25 3.9375H15.75V13.5C15.75 13.6492 15.6907 13.7923 15.5852 13.8977C15.4798 14.0032 15.3367 14.0625 15.1875 14.0625H2.8125C2.66332 14.0625 2.52024 14.0032 2.41475 13.8977C2.30926 13.7923 2.25 13.6492 2.25 13.5V3.9375Z"
                stroke="#888888"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.25 7.3125H15.75"
                stroke="#888888"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.25 10.6875H15.75"
                stroke="#888888"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.1875 7.3125V14.0625"
                stroke="#888888"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_5350_7672">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Tables checked
        </p>
        <div className={'flex flex-col gap-2.5'}>
          <div className={'flex  justify-between text-[13px]'}>
            <p>{tablesChecked.pass + tablesChecked.failed}</p>
            <div className={'flex justify-between  gap-3'}>
              <p className={'text-green-500 flex flex items-center gap-1'}>
                <div className={'h-2 w-2 rounded-full bg-green-500'}></div>
                {tablesChecked.pass} Passed
              </p>
              <p className={' text-red-500 flex items-center gap-1'}>
                <div className={'h-2 w-2 rounded-full bg-red-500'}></div>
                {tablesChecked.failed} Failed
              </p>
            </div>
          </div>
          <div className={'flex  w-full h-2'}>
            <div
              style={{
                width: `${100 - failedPercent}%`,
              }}
              className={`bg-green-500 h-full `}
            >
              {' '}
            </div>

            <div
              style={{
                width: `${failedPercent}%`,
              }}
              className={`bg-red-500 h-full`}
            >
              {' '}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          'rounded-md border border-gray-350 flex-1 bg-white p-5  flex flex-col gap-4'
        }
      >
        <p className={'text-gray-450 uppercase text-xs'}>Tests</p>
        <div className={'flex flex-col gap-2.5'}>
          <div className={'flex  justify-between text-[13px]'}>
            <p>{tablesChecked.passCount + tablesChecked.failedCount}</p>
            <div className={'flex justify-between  gap-3'}>
              <p className={'text-green-500 flex flex items-center gap-1'}>
                <div className={'h-2 w-2 rounded-full bg-green-500'}></div>
                {tablesChecked.passCount} Passed
              </p>
              <p className={' text-red-500 flex items-center gap-1'}>
                <div className={'h-2 w-2 rounded-full bg-red-500'}></div>
                {tablesChecked.failedCount} Failed
              </p>
            </div>
          </div>
          <div className={'flex  w-full h-2'}>
            <div
              style={{
                width: `${100 - failedCountPercent}%`,
              }}
              className={`bg-green-500 h-full `}
            >
              {' '}
            </div>

            <div
              style={{
                width: `${failedCountPercent}%`,
              }}
              className={`bg-red-500 h-full`}
            >
              {' '}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          'rounded-md border border-gray-350 flex-1 bg-white p-5  flex flex-col gap-4'
        }
      >
        <p className={'text-gray-450 uppercase text-xs flex'}>
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_5397_1161)">
              <path
                d="M9.33301 9H15.5205"
                stroke="#888888"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33301 4.5H15.5205"
                stroke="#888888"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33301 13.5H15.5205"
                stroke="#888888"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.14551 4.5L4.27051 5.625L6.52051 3.375"
                stroke="#888888"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.14551 9L4.27051 10.125L6.52051 7.875"
                stroke="#888888"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.14551 13.5L4.27051 14.625L6.52051 12.375"
                stroke="#888888"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_5397_1161">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0.333008)"
                />
              </clipPath>
            </defs>
          </svg>
          Random Record Check
        </p>
        <div className={'flex flex-col gap-2.5'}>
          <div className={'flex  justify-between text-[13px]'}>
            <p>{tablesChecked.passCount + tablesChecked.failedCount}</p>
            <div className={'flex justify-between  gap-3'}>
              <p className={'text-green-500 flex flex items-center gap-1'}>
                <div className={'h-2 w-2 rounded-full bg-green-500'}></div>
                {tablesChecked.passCount} Passed
              </p>
              <p className={' text-red-500 flex items-center gap-1'}>
                <div className={'h-2 w-2 rounded-full bg-red-500'}></div>
                {tablesChecked.failedCount} Failed
              </p>
            </div>
          </div>
          <div className={'flex  w-full h-2'}>
            <div
              style={{
                width: `${100 - failedCountPercent}%`,
              }}
              className={`bg-green-500 h-full `}
            >
              {' '}
            </div>

            <div
              style={{
                width: `${failedCountPercent}%`,
              }}
              className={`bg-red-500 h-full`}
            >
              {' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
