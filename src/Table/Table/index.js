import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import { TableProvider, TableContext } from '@common/context/Table';
import { ThemeProvider, ThemeContext } from '@common/context/Theme';
import {
  ResizeProvider,
  ResizeContext
} from '@common/context/Resize';
import {
  SelectProvider,
  SelectContext
} from '@common/context/Select';
import { TreeProvider, TreeContext } from '@common/context/Tree';
import {
  ExpandProvider,
  ExpandContext
} from '@common/context/Expand';
import { FetchProvider, FetchContext } from '@common/context/Fetch';
import { SortProvider, SortContext } from '@common/context/Sort';
import { State } from '@common/context/State';

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

const TableContent = ({ server, children }) => {
  const { data } = React.useContext(TableContext);
  const theme = React.useContext(ThemeContext);
  const resize = React.useContext(ResizeContext);
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const expand = React.useContext(ExpandContext);
  const fetching = React.useContext(FetchContext);
  const sort = React.useContext(SortContext);

  // do any nodes operations (e.g. sort, pagination), if not server-side
  let modifiedNodes = [...data.nodes];

  if (!server?.sort) {
    modifiedNodes = applySort(modifiedNodes, sort.sortState.fn);
  }

  return children(modifiedNodes, {
    theme,
    resize,
    select,
    tree,
    expand,
    fetching,
    sort
  });
};

const Table = ({
  data,
  server,
  theme,
  defaultSort,
  defaultSelect,
  defaultTree,
  defaultExpand,
  externalTableState,
  onTableStateChange,
  children
}) => {
  const tableRef = React.useRef();

  return (
    <TableContainer
      className="table"
      css={css`
        ${theme?.Table}
      `}
      role="grid"
      ref={tableRef}
    >
      <TableProvider
        data={data}
        onTableStateChange={onTableStateChange}
      >
        <ThemeProvider theme={theme}>
          <ResizeProvider tableRef={tableRef}>
            <SelectProvider defaultSelect={defaultSelect}>
              <TreeProvider defaultTree={defaultTree}>
                <ExpandProvider defaultExpand={defaultExpand}>
                  <FetchProvider>
                    <SortProvider defaultSort={defaultSort}>
                      <State
                        externalTableState={externalTableState}
                      />

                      <TableContent server={server}>
                        {children}
                      </TableContent>
                    </SortProvider>
                  </FetchProvider>
                </ExpandProvider>
              </TreeProvider>
            </SelectProvider>
          </ResizeProvider>
        </ThemeProvider>
      </TableProvider>
    </TableContainer>
  );
};

Table.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  externalTableState: PropTypes.objectOf(PropTypes.any),
  server: PropTypes.shape({
    sort: PropTypes.bool
  }),
  theme: PropTypes.objectOf(PropTypes.any),
  defaultSelect: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  defaultTree: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  defaultExpand: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  defaultSort: PropTypes.shape({
    key: PropTypes.string,
    reverse: PropTypes.bool,
    fn: PropTypes.func
  }),
  onTableStateChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Table };
