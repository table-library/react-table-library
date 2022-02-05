import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Theme } from '@table-library/react-table-library/types/theme';

const ThemeContext = React.createContext<Theme | Nullish>(null);

export { ThemeContext };
