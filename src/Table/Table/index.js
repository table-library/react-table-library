import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
import { SortProvider, SortContext } from '@common/context/Sort';
import { State } from '@common/context/State';

const TableContainer = styled.div`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const TableContent = ({ server, children }) => {
  const { list } = React.useContext(TableContext);
  const theme = React.useContext(ThemeContext);
  const resize = React.useContext(ResizeContext);
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const expand = React.useContext(ExpandContext);
  const sort = React.useContext(SortContext);

  // do any list operations (e.g. sort, pagination), if not server-side
  let modifiedList = [...list];

  if (!server?.sort) {
    modifiedList = sort.sortState.fn(modifiedList);
  }

  return children(modifiedList, {
    theme,
    resize,
    select,
    tree,
    expand,
    sort
  });
};

const Table = ({
  list,
  server,
  theme,
  defaultSort,
  defaultSelect,
  defaultTree,
  defaultExpand,
  onTableStateChange,
  children
}) => {
  const tableRef = React.useRef();

  return (
    <TableContainer className="table" role="grid" ref={tableRef}>
      <TableProvider
        list={list}
        onTableStateChange={onTableStateChange}
      >
        <ThemeProvider theme={theme}>
          <ResizeProvider tableRef={tableRef}>
            <SelectProvider defaultSelect={defaultSelect}>
              <TreeProvider defaultTree={defaultTree}>
                <ExpandProvider defaultExpand={defaultExpand}>
                  <SortProvider defaultSort={defaultSort}>
                    <State />

                    <TableContent server={server}>
                      {children}
                    </TableContent>
                  </SortProvider>
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
  list: PropTypes.arrayOf(PropTypes.any),
  server: PropTypes.shape({
    sort: PropTypes.bool
  }),
  theme: PropTypes.shape(PropTypes.any),
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
