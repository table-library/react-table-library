import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  TableProvider,
  ThemeProvider,
  LayoutProvider,
  ResizeProvider,
  SelectProvider,
  TreeProvider,
  SortProvider,
  SortContext
} from '@context';

const TableContainer = styled.div`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const Table = ({
  list,
  theme,
  layout,
  resize,
  defaultSort,
  defaultSelect,
  defaultTree,
  children
}) => {
  // otherwise we would mutate the outer list (e.g. sort)
  const listCopy = [...list];

  const tableRef = React.useRef();

  return (
    <TableContainer className="table" role="grid" ref={tableRef}>
      <ThemeProvider theme={theme}>
        <LayoutProvider layout={layout}>
          <ResizeProvider resize={resize} tableRef={tableRef}>
            <TableProvider list={listCopy}>
              <SelectProvider defaultSelect={defaultSelect}>
                <TreeProvider defaultTree={defaultTree}>
                  <SortProvider defaultSort={defaultSort}>
                    <SortContext.Consumer>
                      {/* do any list operations (e.g. sort, pagination) here */}
                      {({ sortState }) =>
                        children(sortState.fn(listCopy))
                      }
                    </SortContext.Consumer>
                  </SortProvider>
                </TreeProvider>
              </SelectProvider>
            </TableProvider>
          </ResizeProvider>
        </LayoutProvider>
      </ThemeProvider>
    </TableContainer>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
  theme: PropTypes.shape(PropTypes.any),
  layout: PropTypes.arrayOf(PropTypes.string).isRequired,
  resize: PropTypes.bool,
  defaultSelect: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  defaultTree: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string)
  }),
  defaultSort: PropTypes.shape({
    key: PropTypes.string,
    reverse: PropTypes.bool,
    fn: PropTypes.func
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Table };
