import { TableElementRef } from '@table-library/react-table-library/types/layout';

export const getHeaderColumns = (tableElementRef: TableElementRef): HTMLElement[] => {
  const thead = tableElementRef.current!.querySelector('.tr-header');

  return Array.from(thead?.querySelectorAll('.th') || []);
};

type Callback = (cell: HTMLElement, index: number, size: number) => void;

export const applyToHeaderColumns = (tableElementRef: TableElementRef, callback: Callback) => {
  const rowCells = getHeaderColumns(tableElementRef);
  const size = rowCells.length;
  rowCells.forEach((cell, index) => callback(cell, index, size));
};

export const applyToColumns = (tableElementRef: TableElementRef, callback: Callback) =>
  Array.from(tableElementRef.current!.querySelectorAll('.tr-body')).forEach((row) => {
    const rowCells = Array.from(row.querySelectorAll('.td')) as HTMLElement[];

    const size = rowCells.length;
    rowCells.forEach((cell, index) => callback(cell, index, size));
  });
