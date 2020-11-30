import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  TableProvider,
  ThemeProvider,
  SelectProvider,
  ExpandProvider,
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
  defaultSort,
  defaultSelect,
  defaultExpand,
  children
}) => {
  // otherwise we would mutate the outer list (e.g. sort)
  const listCopy = [...list];

  return (
    <TableContainer>
      <ThemeProvider theme={theme}>
        <TableProvider list={listCopy}>
          <SelectProvider defaultSelect={defaultSelect}>
            <ExpandProvider defaultExpand={defaultExpand}>
              <SortProvider defaultSort={defaultSort}>
                <SortContext.Consumer>
                  {/* do any list operations (e.g. sort, pagination) here */}
                  {({ sortState }) =>
                    children(sortState.fn(listCopy))
                  }
                </SortContext.Consumer>
              </SortProvider>
            </ExpandProvider>
          </SelectProvider>
        </TableProvider>
      </ThemeProvider>
    </TableContainer>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  theme: PropTypes.shape(PropTypes.any),
  defaultSelect: PropTypes.shape({
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
  children: PropTypes.func.isRequired
};

export { Table };
