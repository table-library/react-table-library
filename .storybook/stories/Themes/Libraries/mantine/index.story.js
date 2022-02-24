import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';

import * as Base from './base';
import * as Native from './native';
import * as Demo from './demo';
import * as Theme from './theme';
import * as Layout from './layout';
import * as Resize from './resize';
import * as Sort from './sort';
import * as Search from './search';
import * as Filter from './filter';
import * as Select from './select';
import * as Tree from './tree';
import * as Expand from './expand';
import * as Pagination from './pagination';
import * as FixedHeader from './fixed-header';
import * as HorizontalScroll from './horizontal-scroll';
import * as Pin from './pin';
import * as TenThousandRows from './thousand-rows';
// import * as DataGrid from './data-grid';
import * as ColumnHide from './column-hide';
import * as ColumnOrder from './column-order';
import * as ColumnGroup from './column-group';

const stories = [
  Base,
  Native,
  Demo,
  Theme,
  Layout,
  Resize,
  Sort,
  Search,
  Filter,
  Select,
  Tree,
  Expand,
  Pagination,
  FixedHeader,
  HorizontalScroll,
  Pin,
  TenThousandRows,
  // DataGrid,
  ColumnHide,
  ColumnOrder,
  ColumnGroup,
];

const storyContainer = storiesOf('Library Themes/Mantine', module).addParameters({
  component: CompactTable,
});

stories.forEach((story, i) => {
  storyContainer.add(story.key, story.Component, {
    docs: { source: { code: story.code || '' } },
  });
});
