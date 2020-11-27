import * as React from 'react';
import PropTypes from 'prop-types';

import {
  TableProvider,
  ThemeProvider,
  SortProvider,
  SortContext
} from '@context';

const Table = ({ list, theme, defaultSort, children }) => {
  // otherwise we would mutate the outer list (e.g. sort)
  const listCopy = [...list];

  return (
    <ThemeProvider theme={theme}>
      <SortProvider defaultSort={defaultSort}>
        <TableProvider list={listCopy}>
          <SortContext.Consumer>
            {({ sort }) => children(sort.fn(listCopy))}
          </SortContext.Consumer>
        </TableProvider>
      </SortProvider>
    </ThemeProvider>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  theme: PropTypes.shape(PropTypes.any),
  defaultSort: PropTypes.shape({
    key: PropTypes.string,
    reverse: PropTypes.bool,
    fn: PropTypes.func
  }),
  children: PropTypes.func.isRequired
};

export { Table };
