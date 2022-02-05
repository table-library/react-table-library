import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Pagination } from '@table-library/react-table-library/types/pagination';

const PaginationContext = React.createContext<Pagination | Nullish>(null);

export { PaginationContext };
