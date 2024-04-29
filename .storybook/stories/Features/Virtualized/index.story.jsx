import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@overmap-ai/react-table-library/table';
import { Virtualized } from '@overmap-ai/react-table-library/virtualized';

import { createStories, createStory } from '../../create-story';

import LargeListComponent from './large-list';
import LargeListCode from './large-list?raw';

import LargeTreeComponent from './large-tree';
import LargeTreeCode from './large-tree?raw';

createStories(
  'Features/Virtualized',
  [
    createStory('large list', LargeListComponent, LargeListCode),
    createStory('large tree', LargeTreeComponent, LargeTreeCode),
  ],
  Table,
  {
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Virtualized,
  },
);
