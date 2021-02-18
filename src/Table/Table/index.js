import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import { TableContext } from '@common/context/Table';
import { ThemeContext } from '@common/context/Theme';
import { ResizeProvider } from '@common/context/Resize';
import { PanelContext } from '@common/context/Panel';
import { SortContext } from '@common/context/Sort';
import { SelectContext } from '@common/context/Select';
import { TreeContext } from '@common/context/Tree';

import { TableContainer } from './styles';

const applyRecursiveSort = (nodes, sortFn) => {
  return sortFn(nodes).reduce((acc, value) => {
    if (value.nodes) {
      return acc.concat({
        ...value,
        nodes: applyRecursiveSort(value.nodes, sortFn)
      });
    }

    return acc.concat(value);
  }, []);
};

// TODO
const Table = ({
  data,
  theme,
  layout,
  sort,
  select,
  tree,
  panels,
  children
}) => {
  const tableRef = React.useRef();

  // do any nodes operations (e.g. sort, pagination), if not server-side
  let modifiedNodes = [...data.nodes];

  if (sort && !sort._options.isServer) {
    modifiedNodes = tree
      ? applyRecursiveSort(modifiedNodes, sort.state.sortFn)
      : sort.state.sortFn(modifiedNodes);
  }

  return (
    <TableContainer
      className="table"
      css={css`
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
  server: PropTypes.shape({
    sort: PropTypes.bool
  }),
  theme: PropTypes.objectOf(PropTypes.any),
  layout: PropTypes.shape({
    custom: PropTypes.bool
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Table };
