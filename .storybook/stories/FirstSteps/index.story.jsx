import { storiesOf } from '@storybook/react';

import { CompactTable } from '@overmap-ai/react-table-library/compact';
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@overmap-ai/react-table-library/table';

import * as CompactTableStory from './compact-table';
import * as ComposedTableStory from './composed-table';

storiesOf('First Steps/Compact Table', module)
  .addParameters({
    component: CompactTable,
  })
  .add(CompactTableStory.key, CompactTableStory.Component, {
    docs: { source: { code: CompactTableStory.code || '', state: 'open' } },
  });

storiesOf('First Steps/Composed Table', module)
  .addParameters({
    component: Table,
    subcomponents: {
      Header,
      HeaderRow,
      Body,
      Row,
      HeaderCell,
      Cell,
    },
  })
  .add(ComposedTableStory.key, ComposedTableStory.Component, {
    docs: { source: { code: ComposedTableStory.code || '', state: 'open' } },
  });
