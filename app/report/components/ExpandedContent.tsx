import { type FC, useState } from 'react';
import { Chip } from '~/report/components/Chips';
import type { RecordType } from '~/report/components/ExpandableContent';
import { TestReportTable } from '~/report/components/TestReportTable';
import {Filters} from "~/report/components/Filters";

export const ExpandedContent: FC<{ data_mismatch?: RecordType[] }> = ({
  data_mismatch,
}) => {
  const [activeTab, setActiveTab] = useState<'dataCheck' | 'details'>(
    'dataCheck',
  );
  const parsedFailureColumns = () => {
    return (
      data_mismatch?.reduce((curr: { [key: string]: number }, ne) => {
        if (!ne.mismatch) {
          return curr;
        } else {
          const b = curr;
          for (const elem of ne.mismatch) {
            if (curr[elem]) {
              b[elem] = b[elem] + 1;
            } else {
              b[elem] = 1;
            }
          }
          return b;
        }
      }, {}) || {}
    );
  };

  return (
      <div>
        <div className={'flex gap-2 my-2 text-[13px] border-b border-gray-400 pl-[46px]'}>
          <div
              onClick={() => setActiveTab('dataCheck')}
              className={` transition-all delay-50 duration-200 ${
                  activeTab === 'dataCheck'
                      ? 'border-blue-500 font-semibold text-blue-500 border-b-2'
                      : ''
              } `}
          >
            <p>Data Check</p>
          </div>
          <div
              onClick={() => setActiveTab('details')}
              className={`${
                  activeTab === 'details'
                      ? 'border-blue-500 font-semibold text-blue-500 border-b-2'
                      : ''
              }`}
          >
            <p>Details</p>
          </div>
        </div>

        <div className={`${activeTab === 'dataCheck' ? 'h-full' : 'h-0'} box-border`}>
          <Filters/>
          <div className={'flex flex-row gap-1 items-center pl-[46px] py-2'}>
            <span className={'text-sm text-black-100'}>Failure Columns:</span>
            {Object.entries(parsedFailureColumns())?.map((el) => {
              return (
                  <Chip key={el[0]} value={el[0] + ' ' + el[1]} type={'fail'}/>
              );
            })}
          </div>
          <div>

            <TestReportTable data_mismatch={data_mismatch}/>
          </div>
        </div>

      </div>
  );
};
