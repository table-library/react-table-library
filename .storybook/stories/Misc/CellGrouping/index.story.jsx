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

import ByColumnComponent from './by-column';
import ByColumnCode from './by-column?raw';

createStories(
  'Misc/Cell Grouping',
  [createStory('by column', ByColumnComponent, ByColumnCode)],
  Table,
  {
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
  },
);
