import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { createTheme as createMaterialTheme } from '@mui/material/styles';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';

import * as BaseStory from './base';
import * as NativeStory from './native';
import * as ShowreelStory from './showreel';
import * as ThemeStory from './theme';
import * as LayoutStory from './layout';
import * as ResizeStory from './resize';
import * as SortStory from './sort';
import * as SearchStory from './search';
import * as FilterStory from './filter';
import * as SelectStory from './select';
import * as TreeStory from './tree';
import * as ExpandStory from './expand';
import * as PaginationStory from './pagination';
import * as FixedHeaderStory from './fixed-header';
import * as HorizontalScrollStory from './horizontal-scroll';
import * as FixedColumnStory from './fixed-column';
import * as VirtualizedStory from './virtualized';
import * as EditableStory from './editable';
// import * as DataGridStory from './data-grid';
import * as ColumnHideStory from './column-hide';
import * as ColumnOrderStory from './column-order';
import * as ColumnGroupStory from './column-group';

const stories = [
  BaseStory,
  NativeStory,
  ShowreelStory,
  ThemeStory,
  LayoutStory,
  ResizeStory,
  SortStory,
  SearchStory,
  FilterStory,
  SelectStory,
  TreeStory,
  ExpandStory,
  PaginationStory,
  FixedHeaderStory,
  HorizontalScrollStory,
  FixedColumnStory,
  VirtualizedStory,
  EditableStory,
  // DataGridStory,
  ColumnHideStory,
  ColumnOrderStory,
  ColumnGroupStory,
];

const storyContainer = storiesOf('Library Themes/Material UI', module).addParameters({
  component: CompactTable,
});

stories.forEach((story) => {
  storyContainer.add(
    story.key,
    () => (
      <MaterialThemeProvider theme={createMaterialTheme({})}>
        <story.Component />
      </MaterialThemeProvider>
    ),
    {
      docs: { source: { code: story.code || '' } },
    },
  );
});
