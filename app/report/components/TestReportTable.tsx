import type { FC } from 'react';
import type { RecordType } from '~/report/components/ExpandableContent';
import { TargetIcon } from '~/report/components/icons/TargetIcon';
import { SourceIcon } from '~/report/components/icons/SourceIcon';

export const TestReportTable: FC<{ data_mismatch?: RecordType[] }> = ({
  data_mismatch,
}) => {
  return (
      <div className="h-full w-full overflow-hidden">
        <table className="border-none w-full min-w-max table-auto dark:bg-gray-900" >
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

          <tbody className={'[&>*:nth-child(3n)]:bg-white dark:[&>*:nth-child(3n)]:bg-gray-800'}>
          {data_mismatch?.map((el, index) => {
            return (
                <tr key={index} className={'text-xs border border-gray-100'}>
                  <td
                      className={`${
                          el.mismatch?.includes('INDEX') ? 'bg-fail' : ''
                      } border border-gray-100 dark:border-gray-700 py-1 px-4`}
                  >
                    {' '}
                    {el.INDEX}
                  </td>
                  <td
                      className={`${
                          el.mismatch?.includes('DB') ? 'bg-fail' : ''
                      } border border-gray-100 dark:border-gray-700 py-1 px-4`}
                  >
                    <p className={'flex gap-1'}>
                      {' '}
                      {el.DB === 'Source Record' ? (
                          <SourceIcon/>
                      ) : (
                          <TargetIcon/>
                      )}
                      {el.DB}
                    </p>
                  </td>
                  <td
                      className={`${
                          el.mismatch?.includes('ID') ? 'bg-fail' : ''
                      } border border-gray-100 dark:border-gray-700 py-1 px-4`}
                  >
                    {' '}
                    {el.ID}
                  </td>
                  <td
                      className={`${
                          el.mismatch?.includes('user_id') ? 'bg-fail' : ''
                      } border border-gray-100 dark:border-gray-600  py-1 px-4`}
                  >
                    {' '}
                    {el.user_id}
                  </td>
                  <td
                      className={`${
                          el.mismatch?.includes('name') ? 'bg-fail' : ''
                      } border border-gray-100 dark:border-gray-700 py-1 px-4`}
                  >
                    {' '}
                    {el.name}
                  </td>
                  <td
                      className={`${
                          el.mismatch?.includes('access') ? 'bg-fail' : ''
                      } border border-gray-100 dark:border-gray-700 py-1 px-4`}
                  >
                    {' '}
                    {el.access}
                  </td>
                  <td
                      className={`${
                          el.mismatch?.includes('website') ? 'bg-fail' : ''
                      } border border-gray-100 dark:border-gray-700  py-1 px-4`}
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
