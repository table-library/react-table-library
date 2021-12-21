/* eslint-disable react/prop-types */ // TODO
import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from '@table-library/react-table-library/common/context/Table';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { LayoutProvider } from '@table-library/react-table-library/common/context/Layout';
import { SortContext } from '@table-library/react-table-library/common/context/Sort';
import { SelectContext } from '@table-library/react-table-library/common/context/Select';
import { TreeContext } from '@table-library/react-table-library/common/context/Tree';

import styles from './styles';

const useTableElementRef = (ref) => {
  let tableElementRef = React.useRef();
  if (ref) tableElementRef = ref;

  return tableElementRef;
};

const useTableMemoryRef = () => {
  const tableMemoryRef = React.useRef();

  if (!tableMemoryRef.current) {
    tableMemoryRef.current = {
      resizedLayout: {},
      hiddenSpacesInMemory: {},
    };
  }

  return tableMemoryRef;
};

const Table = React.forwardRef(
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
      children,
    },
    ref
  ) => {
    const tableElementRef = useTableElementRef(ref);
    const tableMemoryRef = useTableMemoryRef();

    let modifiedNodes = [...data.nodes];

    if (sort && !sort._options.isServer) {
      modifiedNodes = sort.state.sortFn(
        modifiedNodes,
        sort._options.sortFns,
        !!tree
      );
    }

    if (pagination && !pagination._options.isServer) {
      // TODO tree?
      modifiedNodes =
        pagination.state.getPages(modifiedNodes)[
          pagination.state.page
        ] || [];
    }

    if (tree && !tree._options.isServer) {
      modifiedNodes = tree.state.fromTreeToListExtended(
        data,
        modifiedNodes,
        tree,
        tree._options.treeXLevel,
        tree._options.treeYLevel,
        null
      );
    }

    const [calledOnce, setCalledOnce] = React.useState(false);
    const callbackRef = (node) => {
      if (!node) return;

      if (calledOnce) return;
      setCalledOnce(true);

      tableElementRef.current = node;
      onInit(node);
    };

    return (
      <div
        className="table"
        css={`
          ${styles(layout)}
          ${theme?.Table}
        `}
        role="grid"
        ref={callbackRef}
      >
        {calledOnce && (
          <TableContext.Provider value={data}>
            <ThemeContext.Provider value={theme}>
              <SortContext.Provider value={sort}>
                <SelectContext.Provider value={select}>
                  <TreeContext.Provider value={tree}>
                    <LayoutProvider
                      layout={layout}
                      tableElementRef={tableElementRef}
                      tableMemoryRef={tableMemoryRef}
                    >
                      {children(modifiedNodes)}
                    </LayoutProvider>
                  </TreeContext.Provider>
                </SelectContext.Provider>
              </SortContext.Provider>
            </ThemeContext.Provider>
          </TableContext.Provider>
        )}
      </div>
    );
  }
);

Table.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  theme: PropTypes.objectOf(PropTypes.any),
  layout: PropTypes.shape({
    custom: PropTypes.bool,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { Table };
