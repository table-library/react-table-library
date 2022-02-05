import * as React from 'react';

import { Nullish } from '@table-library/react-table-library/types/common';
import { Tree } from '@table-library/react-table-library/types/tree';

const TreeContext = React.createContext<Tree | Nullish>(null);

export { TreeContext };
