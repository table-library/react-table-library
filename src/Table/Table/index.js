import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import { TableContext } from '@common/context/Table';
import { ThemeContext } from '@common/context/Theme';
import {
  ResizeProvider,
  ResizeContext
} from '@common/context/Resize';
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

const Table = ({ data, theme, sort, select, tree, children }) => {
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
          <ResizeProvider tableRef={tableRef}>
            <SortContext.Provider value={sort}>
              <SelectContext.Provider value={select}>
                <TreeContext.Provider value={tree}>
                  {children(modifiedNodes, {
                    theme
                  })}
                </TreeContext.Provider>
              </SelectContext.Provider>
            </SortContext.Provider>
          </ResizeProvider>
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Table };
