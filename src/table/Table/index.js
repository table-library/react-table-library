/* eslint-disable react/prop-types */ // TODO
import * as React from 'react';
import PropTypes from 'prop-types';

import { TableContext } from '@table-library/react-table-library/common/context/Table';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { ResizeProvider } from '@table-library/react-table-library/common/context/Resize';
import { PanelContext } from '@table-library/react-table-library/common/context/Panel';
import { SortContext } from '@table-library/react-table-library/common/context/Sort';
import { SelectContext } from '@table-library/react-table-library/common/context/Select';
import { TreeContext } from '@table-library/react-table-library/common/context/Tree';

import { TableContainer } from './styles';

const Table = ({
  data,
  theme,
  layout,
  sort,
  pagination,
  select,
  tree,
  panels,
  children,
}) => {
  const tableRef = React.useRef();

  let modifiedNodes = [...data.nodes];

  if (sort && !sort._options.isServer) {
    modifiedNodes = tree
      ? sort.state.recursiveSortFn(modifiedNodes)
      : sort.state.sortFn(modifiedNodes);
  }

  if (pagination && !pagination._options.isServer) {
    // TODO tree?
    modifiedNodes = pagination.state.getPages(modifiedNodes)[
      pagination.state.page
    ];
  }

  return (
    <TableContainer
      className="table"
      css={`
        ${theme?.Table}
      `}
      role="grid"
      ref={tableRef}
    >
      <TableContext.Provider value={data}>
        <ThemeContext.Provider value={theme}>
          <PanelContext.Provider value={panels}>
            <SortContext.Provider value={sort}>
              <SelectContext.Provider value={select}>
                <TreeContext.Provider value={tree}>
                  <ResizeProvider layout={layout} tableRef={tableRef}>
                    {children(modifiedNodes)}
                  </ResizeProvider>
                </TreeContext.Provider>
              </SelectContext.Provider>
            </SortContext.Provider>
          </PanelContext.Provider>
        </ThemeContext.Provider>
      </TableContext.Provider>
    </TableContainer>
  );
};

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
