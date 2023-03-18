import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { HeaderCellSort } from '@table-library/react-table-library/sort';

import { createStories, createStory } from '../../create-story';

import BaseComponent from './base';
import BaseCode from './base?raw';

import DefaultSortComponent from './default-sort';
import DefaultSortCode from './default-sort?raw';

import IncludeResetComponent from './include-reset';
import IncludeResetCode from './include-reset?raw';

import SortIconSizeComponent from './sort-icon-size';
import SortIconSizeCode from './sort-icon-size?raw';

import SortIconPositionComponent from './sort-icon-position';
import SortIconPositionCode from './sort-icon-position?raw';

import NoSortIconComponent from './no-sort-icon';
import NoSortIconCode from './no-sort-icon?raw';

import CustomSortIconComponent from './custom-sort-icon';
import CustomSortIconCode from './custom-sort-icon?raw';

import CustomSortButtonComponent from './custom-sort-button';
import CustomSortButtonCode from './custom-sort-button?raw';

createStories(
  'Features/Sort',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('default sort', DefaultSortComponent, DefaultSortCode),
    createStory('include reset', IncludeResetComponent, IncludeResetCode),
    createStory('sort icon size', SortIconSizeComponent, SortIconSizeCode),
    createStory('sort icon position', SortIconPositionComponent, SortIconPositionCode),
    createStory('no sort icon', NoSortIconComponent, NoSortIconCode),
    createStory('custom sort icon (Material UI)', CustomSortIconComponent, CustomSortIconCode),
    createStory('custom sort buton (Material UI)', CustomSortButtonComponent, CustomSortButtonCode),
  ],
  Table,
  {
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
    HeaderCellSort,
  },
);
