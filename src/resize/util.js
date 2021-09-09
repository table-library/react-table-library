export const getHeaderColumns = (tableRef) =>
  Array.from(
    tableRef.current
      .querySelector('.tr-header')
      .querySelectorAll('.th')
  );

export const applyToHeaderColumns = (tableRef, callback) =>
  getHeaderColumns(tableRef).forEach(callback);

export const applyToColumns = (tableRef, callback) =>
  Array.from(
    tableRef.current.querySelectorAll('.tr-body')
  ).map((row) =>
    Array.from(row.querySelectorAll('.td')).forEach(callback)
  );
