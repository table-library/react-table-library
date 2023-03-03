import * as React from 'react';
import cs from 'clsx';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { createTableContext } from '@table-library/react-table-library/common/context/Table';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { LayoutProvider } from '@table-library/react-table-library/common/context/Layout';
import { createSortContext } from '@table-library/react-table-library/common/context/Sort';
import { createSelectContext } from '@table-library/react-table-library/common/context/Select';
import { createTreeContext } from '@table-library/react-table-library/common/context/Tree';
import { createPaginationContext } from '@table-library/react-table-library/common/context/Pagination';

import { applyModifiers } from '@table-library/react-table-library/common/util/modifiers';
import { useShiftDown } from '@table-library/react-table-library/common/hooks/useShiftDown';
import { useTheme } from '@table-library/react-table-library/theme/index';

import { Nullish } from '@table-library/react-table-library/types/common';
import { TableNode, TableProps } from '@table-library/react-table-library/types/table';
import {
  Layout,
  TableMemory,
  TableMemoryRef,
  TableElementRef,
} from '@table-library/react-table-library/types/layout';
import { Theme } from '@table-library/react-table-library/types/theme';

import { useOnInit } from './useOnInit';

import styles from './styles';

const useTableElementRef = (ref: TableElementRef | Nullish): TableElementRef => {
  let tableElementRef = React.useRef(null) as TableElementRef;
  if (ref) tableElementRef = ref;

  return tableElementRef;
};

const useTableMemoryRef = (layout: Layout | Nullish): TableMemoryRef => {
  const tableMemoryRef = React.useRef<TableMemory | null>(null);

  if (!tableMemoryRef.current) {
    tableMemoryRef.current = {
      onlyOnce: false,
      dataColumns: [],
    };
  }

  return tableMemoryRef;
};

const FULL_HEIGHT_THEME = {
  Table: `
    height: 100%;
  `,
};

const Table = React.forwardRef(
  <T extends TableNode>(
    {
      data,
      theme: customTheme,
      layout,
      sort,
      pagination,
      select,
      tree,
      onInit = () => {},
      className = 'table',
      children,
      ...rest
    }: TableProps<T>,
    ref: any,
  ) => {
    const tableElementRef = useTableElementRef(ref);
    const tableMemoryRef = useTableMemoryRef(layout);

    // if changed, adjust useFeatures hook
    const modifiedNodes = applyModifiers<T>({
      sort,
      pagination,
      tree,
      select,
    })(data.nodes);

    // callback handler to notifty internal but also optionally outside world that table got rendered
    const [calledOnce, callbackRef] = useOnInit(onInit, tableElementRef);

    // no selection of content (e.g. text) in table if shift is active (e.g. select shift feature)
    const isShiftDown = useShiftDown();

    let allThemes: Theme[] = [];
    if (layout?.fixedHeader) {
      allThemes = allThemes.concat(FULL_HEIGHT_THEME);
    }
    if (customTheme) {
      allThemes = allThemes.concat(customTheme);
    }

    const theme = useTheme(allThemes);

    const As = layout?.isDiv ? 'div' : 'table';

    const TableContext = createTableContext<T>();
    const SortContext = createSortContext<T>();
    const SelectContext = createSelectContext<T>();
    const TreeContext = createTreeContext<T>();
    const PaginationContext = createPaginationContext<T>();

    return (
      <As
        role="grid"
        data-table-library_table=""
        css={css`
          ${styles({ isShiftDown })}
          ${theme?.Table}
        `}
        className={cs(className)}
        ref={callbackRef}
        {...rest}
      >
        {calledOnce && (
          <TableContext.Provider value={data}>
            <ThemeContext.Provider value={theme}>
              <SortContext.Provider value={sort}>
                <SelectContext.Provider value={select}>
                  <TreeContext.Provider value={tree}>
                    <PaginationContext.Provider value={pagination}>
                      <LayoutProvider
                        layout={layout}
                        tableElementRef={tableElementRef}
                        tableMemoryRef={tableMemoryRef}
                      >
                        {children && children(modifiedNodes)}
                      </LayoutProvider>
                    </PaginationContext.Provider>
                  </TreeContext.Provider>
                </SelectContext.Provider>
              </SortContext.Provider>
            </ThemeContext.Provider>
          </TableContext.Provider>
        )}
      </As>
    );
  },
);

export { Table };
