import {type FC, useEffect} from 'react';
import type { RecordType } from '~/report/components/ExpandableContent';
import { TargetIcon } from '~/report/components/icons/TargetIcon';
import { SourceIcon } from '~/report/components/icons/SourceIcon';

export const TestReportTable: FC<{ data_mismatch?: RecordType[] }> = ({
  data_mismatch,
}) => {
  useEffect(() => {
    console.log(data_mismatch?.length)
  }, [data_mismatch]);
  return (
    <div className="h-full w-full overflow-hidden text-black-150">
      <table className="border-none w-full min-w-max table-auto dark:bg-gray-900">
        <thead className="font-normal border-none">
          <tr className="text-xs">
            <th className="border border-gray-100 py-2.5 px-4 font-normal">
              INDEX
            </th>
            <th className="border border-gray-100 py-2.5 px-4 font-normal">DB</th>
            <th className="border border-gray-100 py-2.5 px-4 font-normal">ID</th>
            <th className="border border-gray-100 py-2.5 px-4 font-normal">
              USER_ID
            </th>
            <th className="border border-gray-100 py-2.5 px-4 font-normal">
              NAME
            </th>
            <th className="border border-gray-100 py-1 px-4 font-normal">
              ACCESS
            </th>
            <th className="border border-gray-100 py-1 px-4 font-normal">
              WEBSITE
            </th>
          </tr>
        </thead>

        <tbody
          className={
            '[&>*:nth-child(4n+1)]:bg-white [&>*:nth-child(4n+2)]:bg-white dark:[&>*:nth-child(3n)]:bg-gray-800'
          }
        >
          {data_mismatch?.map((el, index, array) => {
            const targetRecord = index!==array.length-1 ? array[index + 1]: el
            return (
              <tr key={index} className={'text-table border border-gray-100'}>
                <td
                  className={`${
                    targetRecord.mismatch.includes('INDEX') ||
                    el.mismatch?.includes('INDEX')
                      ? 'bg-red-light'
                      : ''
                  } border border-gray-100 dark:border-gray-700 py-2.5 px-4`}
                >
                  {' '}
                  {el.INDEX}
                </td>
                <td
                  className={`${
                    targetRecord.mismatch.includes('DB') ||
                    el.mismatch?.includes('DB')
                        ? 'bg-red-light'
                      : ''
                  } border border-gray-100 dark:border-gray-700 py-1 px-4`}
                >
                  <p className={'flex gap-1'}>
                    {' '}
                    {el.DB === 'Source Record' ? (
                      <SourceIcon />
                    ) : (
                      <TargetIcon />
                    )}
                    {el.DB}
                  </p>
                </td>
                <td
                  className={`${
                    targetRecord.mismatch.includes('ID') ||
                    el.mismatch?.includes('ID')
                        ? 'bg-red-light'
                      : ''
                  } border border-gray-100 dark:border-gray-700 py-1 px-4`}
                >
                  {' '}
                  {el.ID}
                </td>
                <td
                  className={`${
                    targetRecord.mismatch.includes('user_id') ||
                    el.mismatch?.includes('user_id')
                        ? 'bg-red-light'
                      : ''
                  } border border-gray-100 dark:border-gray-600  py-1 px-4`}
                >
                  {' '}
                  {el.user_id}
                </td>
                <td
                  className={`${
                    targetRecord.mismatch.includes('name') ||
                    el.mismatch?.includes('name')
                        ? 'bg-red-light'
                      : ''
                  } border border-gray-100 dark:border-gray-700 py-1 px-4`}
                >
                  {' '}
                  {el.name}
                </td>
                <td
                  className={`${
                    targetRecord.mismatch.includes('access') ||
                    el.mismatch?.includes('access')
                        ? 'bg-red-light'
                      : ''
                  } border border-gray-100 dark:border-gray-700 py-1 px-4`}
                >
                  {' '}
                  {el.access}
                </td>
                <td
                  className={`${
                    targetRecord.mismatch.includes('website') ||
                    el.mismatch?.includes('website')
                        ? 'bg-red-light'
                      : ''
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
