import report from '~/7718_20250123_135605_1.json';
import type { FailureColumn } from '~/redux/report/report.slice';

const columnsNumbers: { [key: string]: { [key: string]: number } } =
  report.logs.reduce((acc, log) => {
    return {
      ...acc,
      [log.test_case_id]:
        log.data_mismatch?.reduce((curr: { [key: string]: number }, ne) => {
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
        }, {}) || {},
    };
  }, {});
const getColumnNames: () => { [key: string]: string[] } = () => {
  return report.logs.reduce<{ [key: string]: string[] }>((acc, log) => {
    const newColumns = [...(acc[log.test_case_id] || [])];
    for (const accElement of log?.data_mismatch || []) {
      for (const accElementElement of accElement.mismatch) {
        if (!newColumns?.includes(accElementElement)) {
          newColumns.push(accElementElement);
        }
      }
    }
    return { ...acc, [log.test_case_id]: newColumns };
  }, {});
};
const getColumns = () => {
  const columns: { [key: string]: FailureColumn[] } = {};
  const col = getColumnNames();

  for (const argumentsKey in col) {
    for (const columnName of col[argumentsKey]) {
      if (argumentsKey in columns) {
        columns[argumentsKey].push({ value: columnName, checked: true , count: columnsNumbers[argumentsKey][columnName] || 0});
      } else {
        columns[argumentsKey] = [{ value: columnName, checked: true , count: columnsNumbers[argumentsKey][columnName] || 0}];
      }
    }
  }
  return columns;
};

export { columnsNumbers, getColumns, getColumnNames };
