import { CompactTable } from '@table-library/react-table-library/compact';

import { createStories, createStory } from '../create-story';

import BaseComponent from './base';
import BaseCode from './base?raw';

import ThemeComponent from './theme';
import ThemeCode from './theme?raw';

import LayoutComponent from './layout';
import LayoutCode from './layout?raw';

import ResizeComponent from './resize';
import ResizeCode from './resize?raw';

import SortComponent from './sort';
import SortCode from './sort?raw';

import SearchComponent from './search';
import SearchCode from './search?raw';

import FilterComponent from './filter';
import FilterCode from './filter?raw';

import SelectComponent from './select';
import SelectCode from './select?raw';

import TreeComponent from './tree';
import TreeCode from './tree?raw';

import ExpandComponent from './expand';
import ExpandCode from './expand?raw';

import PaginationComponent from './pagination';
import PaginationCode from './pagination?raw';

import FixedHeaderComponent from './fixed-header';
import FixedHeaderCode from './fixed-header?raw';

import HorizontalScrollComponent from './horizontal-scroll';
import HorizontalScrollCode from './horizontal-scroll?raw';

import FixedColumnComponent from './fixed-column';
import FixedColumnCode from './fixed-column?raw';

import VirtualizedComponent from './virtualized';
import VirtualizedCode from './virtualized?raw';

import EditableComponent from './editable';
import EditableCode from './editable?raw';

// import DataGridComponent from './data-grid';
// import DataGridCode from './data-grid?raw';

import ColumnHideComponent from './column-hide';
import ColumnHideCode from './column-hide?raw';

import ColumnOrderComponent from './column-order';
import ColumnOrderCode from './column-order?raw';

createStories(
  'Compact Table',
  [
    createStory('Base', BaseComponent, BaseCode),
    createStory('Theme', ThemeComponent, ThemeCode),
    createStory('Layout', LayoutComponent, LayoutCode),
    createStory('Resize', ResizeComponent, ResizeCode),
    createStory('Sort', SortComponent, SortCode),
    createStory('Search', SearchComponent, SearchCode),
    createStory('Filter', FilterComponent, FilterCode),
    createStory('Select', SelectComponent, SelectCode),
    createStory('Tree', TreeComponent, TreeCode),
    createStory('Expand', ExpandComponent, ExpandCode),
    createStory('Pagination', PaginationComponent, PaginationCode),
    createStory('FixedHeader', FixedHeaderComponent, FixedHeaderCode),
    createStory('HorizontalScroll', HorizontalScrollComponent, HorizontalScrollCode),
    createStory('FixedColumn', FixedColumnComponent, FixedColumnCode),
    createStory('Virtualized', VirtualizedComponent, VirtualizedCode),
    createStory('Editable', EditableComponent, EditableCode),
    createStory('ColumnHide', ColumnHideComponent, ColumnHideCode),
    createStory('ColumnOrder', ColumnOrderComponent, ColumnOrderCode),
  ],
  CompactTable,
);
