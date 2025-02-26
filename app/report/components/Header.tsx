import moment from 'moment/moment';
import { SourceIcon } from '~/report/components/icons/SourceIcon';
import { TargetIcon } from '~/report/components/icons/TargetIcon';
import { useAppSelector } from '~/redux/store';

export const Header = () => {
  const summary = useAppSelector((state) => state.report.summary);
  const reports = useAppSelector((state) => state.report.report);
  const tablesChecked = Object.entries(reports).reduce(
    (el, nest) => {
      return nest[1].result_counter.fail
        ? { ...el, failed: el.failed + 1 }
        : { ...el, pass: el.pass + 1 };
    },
    { failed: 0, pass: 0 },
  );
  const failedPercent = Math.floor(
    (tablesChecked.failed / (tablesChecked.pass + tablesChecked.failed)) * 100,
  );
  const getDurationString = () => {
    let duration = moment(summary.job_end_time).diff(summary.job_start_time);
    const ms = duration % 1000;

    const mm = ((duration - ms) / 1000) % 60;

    const mn = ((duration - ms - mm * 1000) / 60000) % 60;
    const hh = ((duration - mn * 60000 - ms - mm * 1000) / (60 * 60000)) % 60;
    return `${('00' + hh).slice(-2)}:${('00' + mn).slice(-2)}:${('00' + mm).slice(-2)}:${(
      '000' + ms
    ).slice(-3)}`;
  };
  return (
    <div
      className={
        'w-full border border-gray-350 bg-white rounded-lg p-6 flex flex-col gap-4 '
      }
    >
      <div className={'flex  flex-col lg:flex-row '}>
        <h1 className={'w-fit text-[22px] font-bold min-w-[200px]'}>Data Report </h1>
        <div className={'text-xs w-full flex  flex-wrap items-start lg:justify-end gap-4 flex-grow'}>
          <p className={'text-gray-450 flex gap-1 py-1.5'}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5396_4527)">
                <path
                  d="M9 15.75C12.4173 15.75 15.1875 12.9798 15.1875 9.5625C15.1875 6.14524 12.4173 3.375 9 3.375C5.58274 3.375 2.8125 6.14524 2.8125 9.5625C2.8125 12.9798 5.58274 15.75 9 15.75Z"
                  stroke="#888888"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9.5625L11.8125 6.75"
                  stroke="#888888"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.3125 1.125H10.6875"
                  stroke="#888888"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_5396_4527">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className={'w-fit]'}>Total Time: </span>
            <span className={'text-black-100'}> {getDurationString()}</span>
          </p>

          <p className={'text-gray-450 py-1.5'}>
            Job ID:{' '}
            <span className={'text-black-100'}> {summary.test_job_id}</span>
          </p>
          <p
            className={'text-gray-450 flex items-center justify-center py-1.5'}
          >
            Run ID:{' '}
            <span className={'text-black-100'}> {summary.test_run_id}</span>
          </p>
          <button
            className={
              'border-gray-350 border rounded-md flex gap-1 py-1.5 px-3'
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5396_4539)">
                <path
                  d="M13 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V13C2.5 13.2761 2.72386 13.5 3 13.5H13C13.2761 13.5 13.5 13.2761 13.5 13V3C13.5 2.72386 13.2761 2.5 13 2.5Z"
                  stroke="#475059"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 1.5V3.5"
                  stroke="#475059"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 1.5V3.5"
                  stroke="#475059"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 5.5H13.5"
                  stroke="#475059"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_5396_4539">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className={'text-black-100'}>
              Date:{' '}
              {moment(summary.job_start_time).format('MM/DD/YYYY [@] hh:mm A')}
            </span>
          </button>
        </div>
      </div>
      <div className={'flex gap-10 flex-col lg:flex-row'}>
        <div className={'flex flex-col gap-1'}>
          <p className={'text-gray-450 uppercase text-xs'}>Source Database</p>

          <p className={'text-black-100 text-sm flex gap-1'}>
            <SourceIcon /> DatabaseName1
          </p>
        </div>
        <div className={'flex flex-col gap-1'}>
          <p className={'text-gray-450 uppercase text-xs'}>
            Source Environment
          </p>

          <p className={'text-black-100 text-sm flex gap-1'}>
            <SourceIcon />
            EnvironmentName1
          </p>
        </div>
        <div className={'flex flex-col gap-1 text-sm'}>
          <p className={'text-gray-450 uppercase text-xs'}>TARGET Database</p>

          <p className={'text-black-100 text-sm flex gap-1'}>
            <TargetIcon /> DatabaseName1
          </p>
        </div>
        <div className={'flex flex-col gap-1'}>
          <p className={'text-gray-450 uppercase text-xs'}>
            TARGET Environment
          </p>

          <p className={'text-black-100 text-sm flex gap-1'}>
            <TargetIcon /> EnvironmentName1
          </p>
        </div>
      </div>
    </div>
  );
};
