import { storiesOf } from '@storybook/react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { Table } from '@table-library/react-table-library/table';

import * as CompactTableStory from './compact-table';
import * as ComposedTableStory from './composed-table';

const stories = [CompactTableStory, ComposedTableStory];

const storyContainer = storiesOf('First Steps', module).addParameters({
  component: CompactTable,
});

stories.forEach((story) => {
  storyContainer.add(story.key, story.Component, {
    docs: { source: { code: story.code || '' } },
  });
});
