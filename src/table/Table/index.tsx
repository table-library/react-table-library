import * as React from 'react';
import cs from 'clsx';

import { TableContext } from '@table-library/react-table-library/common/context/Table';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { LayoutProvider } from '@table-library/react-table-library/common/context/Layout';
import { SortContext } from '@table-library/react-table-library/common/context/Sort';
import { SelectContext } from '@table-library/react-table-library/common/context/Select';
import { TreeContext } from '@table-library/react-table-library/common/context/Tree';
import { PaginationContext } from '@table-library/react-table-library/common/context/Pagination';

import { applyModifiers } from '@table-library/react-table-library/common/util/modifiers';
import { useShiftDown } from '@table-library/react-table-library/common/hooks/useShiftDown';

import { Nullish } from '@table-library/react-table-library/types/common';
import { TableProps } from '@table-library/react-table-library/types/table';
import {
  Layout,
  TableMemory,
  TableMemoryRef,
  TableElementRef,
} from '@table-library/react-table-library/types/layout';

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
      resizedLayout: layout?.resizedLayout ?? [],
      hiddenSpacesInMemory: [],
    };
  }

  return tableMemoryRef;
};

const Table: React.FC<TableProps> = React.forwardRef(
  (
    {
      data,
      theme,
      layout,
      sort,
      pagination,
      select,
      tree,
      onInit = () => {},
      className = 'table',
      children,
      ...rest
    }: TableProps,
    ref: any,
  ) => {
    const tableElementRef = useTableElementRef(ref);
    const tableMemoryRef = useTableMemoryRef(layout);

    // if changed, adjust useFeatures hook
    const modifiedNodes = applyModifiers({
      sort,
      pagination,
      tree,
      select,
    })(data.nodes);

    // callback handler to notifty internal but also optionally outside world that table got rendered
    const [calledOnce, callbackRef] = useOnInit(onInit, tableElementRef);

    // no selection of content (e.g. text) in table if shift is active (e.g. select shift feature)
    const isShiftDown = useShiftDown();

    return (
      <div
        role="grid"
        className={cs(className)}
        {...theme?.Table}
        // css={css`
        //   ${styles(layout, { isShiftDown })}
        // `}
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
                      {layout?.inheritLayout ? (
                        <React.Fragment>{children && children(modifiedNodes)}</React.Fragment>
                      ) : (
                        <LayoutProvider
                          layout={layout}
                          tableElementRef={tableElementRef}
                          tableMemoryRef={tableMemoryRef}
                        >
                          {children && children(modifiedNodes)}
                        </LayoutProvider>
                      )}
                    </PaginationContext.Provider>
                  </TreeContext.Provider>
                </SelectContext.Provider>
              </SortContext.Provider>
            </ThemeContext.Provider>
          </TableContext.Provider>
        )}
      </div>
    );
  },
);

export { Table };
