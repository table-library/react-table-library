import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@overmap-ai/react-table-library/table';

import { createStories, createStory } from '../../create-story';

import DivInsteadOfTableComponent from './div-instead-of-table';
import DivInsteadOfTableCode from './div-instead-of-table?raw';

createStories(
  'Misc/Table',
  [createStory('div instead of table', DivInsteadOfTableComponent, DivInsteadOfTableCode)],
  Table,
  {
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
  },
);
