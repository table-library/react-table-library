import { TableElementRef } from '@table-library/react-table-library/types/layout';

export const getHeaderColumns = (tableElementRef: TableElementRef): HTMLElement[] => {
  const thead = tableElementRef.current!.querySelector('.tr-header');

  return Array.from(thead?.querySelectorAll('.th') || []);
};

type Callback = (cell: HTMLElement, index: number, size: number) => void;

const applyToBaseColumns = (
  tableElementRef: TableElementRef,
  callback: Callback,
  containerSelector: string,
  selector: string,
) =>
  Array.from(tableElementRef.current!.querySelectorAll(containerSelector)).forEach((row) => {
    const rowCells = Array.from(row.querySelectorAll(selector)) as HTMLElement[];

    const size = rowCells.length;
    rowCells.forEach((cell, index) => callback(cell, index, size));
  });

export const applyToHeaderColumns = (tableElementRef: TableElementRef, callback: Callback) =>
  applyToBaseColumns(tableElementRef, callback, '.tr-header', '.th');

export const applyToColumns = (tableElementRef: TableElementRef, callback: Callback) =>
  applyToBaseColumns(tableElementRef, callback, '.tr-body', '.td');

export type DataColumn = {
  index: number;
  minWidth: number;
  width: number;
  isStiff: boolean;
  isHide?: boolean;
};

export const applyProgrammaticHide = (
  tableElementRef: TableElementRef,
  dataColumns: DataColumn[],
) => {
  const applyHide = (cell: HTMLElement, i: number) => {
    if (dataColumns[i].isHide) {
      cell.classList.add('hide');
    } else {
      cell.classList.remove('hide');
    }
  };

  applyToHeaderColumns(tableElementRef, applyHide);
  applyToColumns(tableElementRef, applyHide);
};

export const toDataColumn = (column: HTMLElement, index: number) => ({
  index,
  minWidth: +column.getAttribute('data-resize-min-width')!,
  width: column.getBoundingClientRect().width,
  isStiff: column.classList.contains('stiff'),
  isHide: column.getAttribute('data-hide') === 'true',
});
