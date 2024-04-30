import * as React from 'react';

import { Nullish } from '@overmap-ai/react-table-library/types/common';
import { Theme } from '@overmap-ai/react-table-library/types/theme';

const ThemeContext = React.createContext<Theme | Nullish>(null);

export { ThemeContext };
