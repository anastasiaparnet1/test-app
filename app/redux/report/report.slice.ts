import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { TestReport } from '~/report/components/ExpandableContent';
import report from '../../7718_20250123_135605_1.json';
import { columnsNumbers, getColumns } from '~/redux/report/utils';
import { Filters } from '~/report/components/Filters';
export type Filter =
  | 'all'
  | 'skipped'
  | 'failed'
  | 'failed count'
  | 'failed data';
export type FailureColumn = { value: string; checked: boolean; count: number };
type JobSummary = {
  job_start_time: string;
  report_dir: string;
  time_stamp: string;
  time_stamp_log: string;
  test_job_id: number;
  test_run_id: number;
  job_end_time: string;
};

export const initialState: {
  report: { [key: string]: TestReport };
  filters: { [key: string]: Filter };
  globalFilter: Filter;
  summary: JobSummary;
  columns: { [key: string]: FailureColumn[] };
} = {
  report: report.logs.reduce((acc, log) => {
    return { ...acc, [log.test_case_id]: log };
  }, {}),
  filters: report.logs.reduce((el, next)=> ({ ...el, [next.test_case_id] : 'all'}), {}),
  globalFilter: 'all',
  summary: report.summary,
  columns: getColumns(),
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    checkColumns: (
      state,
      action: PayloadAction<{ filter: FailureColumn[]; id: string }>,
    ) => {
      state.columns[action.payload.id] = initialState.columns[
        action.payload.id
      ].map((el) => {
        const replaceWith = action.payload.filter.find(
          (column) => column.value === el.value,
        );
        return replaceWith
          ? replaceWith
          : {
              ...el,
              checked: !!state.columns[action.payload.id].find(
                (elem) => el.value === elem.value,
              )?.checked,
            };
      });
    },
    setFilter: (
      state,
      {
        payload,
      }: PayloadAction<{ filter: Filter; id: string; global: boolean }>,
    ) => {

      if (payload.global) {
        state.globalFilter = payload.filter;
        state.filters[payload.id] = payload.filter;
      }
      else if (!payload.global)  state.filters[payload.id] = payload.filter;
      if (payload.filter === 'failed') {
        state.report[payload.id].data_mismatch = initialState.report[
          payload.id
        ].data_mismatch?.filter((el, index, arr) => {
          return (
            el.mismatch.length ||
            (index !== arr.length - 1 &&
              arr[index + 1].mismatch.length &&
              el.DB === 'Source Record')
          );
        });
      } else if (payload.filter === 'skipped') {
        state.report[payload.id].data_mismatch = initialState.report[
          payload.id
        ].data_mismatch?.filter((el, index, arr) => {
          return (
            (index !== arr.length - 1 &&
              !arr[index + 1].mismatch.length &&
              el.DB === 'Source Record') ||
            (!el.mismatch.length && el.DB === 'Target Record')
          );
        });
      } else if (payload.filter === 'all') {
        state.report[payload.id].data_mismatch =
          initialState.report[payload.id].data_mismatch;
      }
    },
    search: (
      state,
      { payload }: PayloadAction<{ search: string; id: string }>,
    ) => {
      if (payload.search) {
        state.report[payload.id].data_mismatch = initialState.report[
          payload.id
        ].data_mismatch?.filter((el) => {
          return Object.entries(el).some(
            ([key, value]) =>
              typeof value === 'string' && value.includes(payload.search),
          );
        });
      } else {
        state.report[payload.id].data_mismatch =
          initialState.report[payload.id].data_mismatch;
      }
    },
    filterReport: (
      state,
      action: PayloadAction<{
        id: string;
        filters: FailureColumn[];
      }>,
    ) => {
      console.log(action.payload);
      state.report[action.payload.id].data_mismatch = initialState.report[
        action.payload.id
      ].data_mismatch?.filter((el, index, arr) => {
        return (
          el.mismatch.some((elem) =>
            action.payload.filters.some(
              (filter) => filter.checked && filter.value === elem,
            ),
          ) ||
          (index !== arr.length - 1 &&
            arr[index + 1].mismatch.some((elem) =>
              action.payload.filters.some(
                (filter) => filter.checked && filter.value === elem,
              ),
            ))
        );
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { filterReport, checkColumns, search, setFilter } =
  reportSlice.actions;

export const reportReducer = reportSlice.reducer;
