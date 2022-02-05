import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Select } from '@table-library/react-table-library/types/select';

const SelectContext = React.createContext<Select | Nullish>(null);

export { SelectContext };
