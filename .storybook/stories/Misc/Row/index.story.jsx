import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { createStories, createStory } from '../../create-story';

import RowClickComponent from './row-click';
import RowClickCode from './row-click?raw';

import RowDoubleClickComponent from './row-double-click';
import RowDoubleClickCode from './row-double-click?raw';

import RowDisabledComponent from './row-disabled';
import RowDisabledCode from './row-disabled?raw';

import RowOnHoverComponent from './row-on-hover';
import RowOnHoverCode from './row-on-hover?raw';

import VariableRowHeightComponent from './variable-row-height';
import VariableRowHeightCode from './variable-row-height?raw';

createStories(
  'Misc/Row',
  [
    createStory('row click', RowClickComponent, RowClickCode),
    createStory('row double click', RowDoubleClickComponent, RowDoubleClickCode),
    createStory('row disabled', RowDisabledComponent, RowDisabledCode),
    createStory('row on hover', RowOnHoverComponent, RowOnHoverCode),
    createStory('variable row height', VariableRowHeightComponent, VariableRowHeightCode),
  ],
  Table,
  {
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
  },
);
