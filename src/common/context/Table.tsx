import * as React from 'react';

import { Data } from '@table-library/react-table-library/types/table';

const TableContext = React.createContext<Data | null>(null);

export { TableContext };
