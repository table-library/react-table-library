import * as React from 'react';
import PropTypes from 'prop-types';

import {
  TableProvider,
  ThemeProvider,
  SelectProvider,
  SortProvider,
  SortContext
} from '@context';

const Table = ({
  list,
  theme,
  defaultSort,
  defaultSelect,
  children
}) => {
  // otherwise we would mutate the outer list (e.g. sort)
  const listCopy = [...list];

  return (
    <ThemeProvider theme={theme}>
      <TableProvider list={listCopy}>
        <SelectProvider defaultSelect={defaultSelect}>
          <SortProvider defaultSort={defaultSort}>
            <SortContext.Consumer>
              {/* do any list operations (e.g. sort, pagination) here */}
              {({ sortState }) => children(sortState.fn(listCopy))}
            </SortContext.Consumer>
          </SortProvider>
        </SelectProvider>
      </TableProvider>
    </ThemeProvider>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  theme: PropTypes.shape(PropTypes.any),
  defaultSelect: PropTypes.shape({
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
