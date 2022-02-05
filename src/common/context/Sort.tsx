import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Sort } from '@table-library/react-table-library/types/sort';

const SortContext = React.createContext<Sort | Nullish>(null);

export { SortContext };
