export const getHeaderColumns = (tableElementRef) =>
  Array.from(
    tableElementRef.current
      .querySelector('.tr-header')
      .querySelectorAll('.th')
  );

export const applyToHeaderColumns = (tableElementRef, callback) => {
  const rowCells = getHeaderColumns(tableElementRef);
  const size = rowCells.length;
  rowCells.forEach((cell, index) => callback(cell, index, size));
};

export const applyToColumns = (tableElementRef, callback) =>
  Array.from(
    tableElementRef.current.querySelectorAll('.tr-body')
  ).forEach((row) => {
    const rowCells = Array.from(row.querySelectorAll('.td'));
    const size = rowCells.length;
    rowCells.forEach((cell, index) => callback(cell, index, size));
  });
