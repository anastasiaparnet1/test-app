import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { TestReport } from '~/report/components/ExpandableContent';
import report from '../../7718_20250123_135605_1.json';
export type Filter = 'all' | 'skipped' | 'failed';
const initialState: {
  report: { [key: string]: TestReport };
  filters: 'all' | 'skipped' | 'failed';
} = {
  report: report.logs.reduce((acc, log) => {
    return { ...acc, [log.test_case_id]: log };
  }, {}),
  filters: 'all',
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<Filter>) => {
      state.filters = payload;
    },
    filterReport: (
      state,
      action: PayloadAction<{ id: string; filters: string[] }>,
    ) => {
      state.report[action.payload.id].data_mismatch = state.report[
        action.payload.id
      ].data_mismatch?.filter((el) => {
        el.mismatch.some((elem) =>
          action.payload.filters.some((filter) => filter === elem),
        );
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { filterReport, setFilter } = reportSlice.actions;

export const reportReducer = reportSlice.reducer;
