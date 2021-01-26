import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import { TableContext } from '@common/context/Table';
import { ThemeProvider, ThemeContext } from '@common/context/Theme';
import {
  ResizeProvider,
  ResizeContext
} from '@common/context/Resize';
import { SortContext } from '@common/context/Sort';
import { SelectContext } from '@common/context/Select';

import { TableContainer } from './styles';

const applySort = (nodes, sortFn) => {
  return sortFn(nodes).reduce((acc, value) => {
    if (value.nodes) {
      return acc.concat({
        ...value,
        nodes: applySort(value.nodes, sortFn)
      });
    }

    return acc.concat(value);
  }, []);
};

const Table = ({ data, theme, sort, select, children }) => {
  const tableRef = React.useRef();

  // do any nodes operations (e.g. sort, pagination), if not server-side
  let modifiedNodes = [...data.nodes];

  if (sort && !sort._options.isServer) {
    modifiedNodes = applySort(modifiedNodes, sort.state.sortFn);
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
        <ThemeProvider theme={theme}>
          <ResizeProvider tableRef={tableRef}>
            <SortContext.Provider value={sort}>
              <SelectContext.Provider value={select}>
                {children(modifiedNodes, {
                  theme
                })}
              </SelectContext.Provider>
            </SortContext.Provider>
          </ResizeProvider>
        </ThemeProvider>
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
