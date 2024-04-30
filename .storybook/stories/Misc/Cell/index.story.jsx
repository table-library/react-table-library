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

import CellClickComponent from './cell-click';
import CellClickCode from './cell-click?raw';

import CellOutlineComponent from './cell-outline';
import CellOutlineCode from './cell-outline?raw';

import CellTabNavigationComponent from './cell-tab-navigation';
import CellTabNavigationCode from './cell-tab-navigation?raw';

createStories(
  'Misc/Cell',
  [
    createStory('cell click', CellClickComponent, CellClickCode),
    createStory('cell outline', CellOutlineComponent, CellOutlineCode),
    createStory('cell tab navigation', CellTabNavigationComponent, CellTabNavigationCode),
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
