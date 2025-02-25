import type { FC } from 'react';
import type { RecordType } from '~/report/components/ExpandableContent';

export const TestReportTable: FC<{ data_mismatch?: RecordType[] }> = ({
  data_mismatch,
}) => {
  return (
    <div className={'h-full pl-[46px]'}>
      <table className={'border-none '}>
        <thead className="font-normal border-none">
          <tr className="text-xs">
            <th className="border border-gray-100 py-1 px-4 font-normal">
              INDEX
            </th>
            <th className="border border-gray-100 py-1 px-4 font-normal">DB</th>
            <th className="border border-gray-100 py-1 px-4 font-normal">ID</th>
            <th className="border border-gray-100 py-1 px-4 font-normal">
              USER_ID
            </th>
            <th className="border border-gray-100 py-1 px-4 font-normal">
              NAME
            </th>
            <th className="border border-gray-100 py-1 px-4 font-normal">
              ACCESS
            </th>
            <th className="border border-gray-100 py-1 px-4 font-normal">
              WEBSITE
            </th>
          </tr>
          <tr className="text-xs h-6 border-none"></tr>
        </thead>

        <tbody>
          {data_mismatch?.map((el, index) => {
            return (
              <tr key={index} className={'text-xs border border-gray-100'}>
                <td
                  className={`${
                    el.mismatch?.includes('INDEX') ? 'bg-fail' : ''
                  } border border-gray-100 py-1 px-4`}
                >
                  {' '}
                  {el.INDEX}
                </td>
                <td
                  className={`${
                    el.mismatch?.includes('DB') ? 'bg-fail' : ''
                  } border border-gray-100 py-1 px-4`}
                >
                  <p className={'flex gap-1'}>
                    {' '}
                    {el.DB === 'Source Record' ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_5396_4839)">
                          <path
                            d="M9 9C12.4173 9 15.1875 7.48896 15.1875 5.625C15.1875 3.76104 12.4173 2.25 9 2.25C5.58274 2.25 2.8125 3.76104 2.8125 5.625C2.8125 7.48896 5.58274 9 9 9Z"
                            stroke="#475059"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.8125 5.625V9C2.8125 10.864 5.58281 12.375 9 12.375C12.4172 12.375 15.1875 10.864 15.1875 9V5.625"
                            stroke="#475059"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.8125 9V12.375C2.8125 14.239 5.58281 15.75 9 15.75C12.4172 15.75 15.1875 14.239 15.1875 12.375V9"
                            stroke="#475059"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="7.875"
                            y="1.125"
                            width="11.25"
                            height="11.25"
                            rx="5.625"
                            fill="white"
                          />
                          <path
                            d="M11.25 5.625L13.5 3.375L15.75 5.625"
                            stroke="#475059"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.5 3.375L13.5 10.125"
                            stroke="#475059"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_5396_4839">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_5396_4959)">
                          <path
                            d="M9 9C12.4173 9 15.1875 7.48896 15.1875 5.625C15.1875 3.76104 12.4173 2.25 9 2.25C5.58274 2.25 2.8125 3.76104 2.8125 5.625C2.8125 7.48896 5.58274 9 9 9Z"
                            stroke="#475059"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.8125 5.625V9C2.8125 10.864 5.58281 12.375 9 12.375C12.4172 12.375 15.1875 10.864 15.1875 9V5.625"
                            stroke="#475059"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.8125 9V12.375C2.8125 14.239 5.58281 15.75 9 15.75C12.4172 15.75 15.1875 14.239 15.1875 12.375V9"
                            stroke="#475059"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="7.875"
                            y="1.125"
                            width="11.25"
                            height="11.25"
                            rx="5.625"
                            fill="white"
                          />
                          <path
                            d="M11.25 7.875L13.5 10.125L15.75 7.875"
                            stroke="#475059"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.5 10.125L13.5 3.375"
                            stroke="#475059"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_5396_4959">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                    {el.DB}
                  </p>
                </td>
                <td
                  className={`${
                    el.mismatch?.includes('ID') ? 'bg-fail' : ''
                  } border border-gray-100 py-1 px-4`}
                >
                  {' '}
                  {el.ID}
                </td>
                <td
                  className={`${
                    el.mismatch?.includes('user_id') ? 'bg-fail' : ''
                  } border border-gray-100 py-1 px-4`}
                >
                  {' '}
                  {el.user_id}
                </td>
                <td
                  className={`${
                    el.mismatch?.includes('name') ? 'bg-fail' : ''
                  } border border-gray-100 py-1 px-4`}
                >
                  {' '}
                  {el.name}
                </td>
                <td
                  className={`${
                    el.mismatch?.includes('access') ? 'bg-fail' : ''
                  } border border-gray-100 py-1 px-4`}
                >
                  {' '}
                  {el.access}
                </td>
                <td
                  className={`${
                    el.mismatch?.includes('website') ? 'bg-fail' : ''
                  } border border-gray-100 py-1 px-4`}
                >
                  {' '}
                  {el.website}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
