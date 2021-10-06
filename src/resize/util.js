export const getHeaderColumns = (tableRef) =>
  Array.from(
    tableRef.current
      .querySelector('.tr-header')
      .querySelectorAll('.th')
  );

export const applyToHeaderColumns = (tableRef, callback) => {
  const rowCells = getHeaderColumns(tableRef);
  const size = rowCells.length;
  rowCells.forEach((cell, index) => callback(cell, index, size));
};

export const applyToColumns = (tableRef, callback) =>
  Array.from(tableRef.current.querySelectorAll('.tr-body')).forEach(
    (row) => {
      const rowCells = Array.from(row.querySelectorAll('.td'));
      const size = rowCells.length;
      rowCells.forEach((cell, index) => callback(cell, index, size));
    }
  );
