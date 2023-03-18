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

import BaseComponent from './base';
import BaseCode from './base?raw';

import FlexibleSizeComponent from './flexible-size';
import FlexibleSizeCode from './flexible-size?raw';

import RowsPerPageComponent from './rows-per-page';
import RowsPerPageCode from './rows-per-page?raw';

createStories(
  'Features/Pagination',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('flexible size', FlexibleSizeComponent, FlexibleSizeCode),
    createStory('rows per page', RowsPerPageComponent, RowsPerPageCode),
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
