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

import BaseComponent from './base';
import BaseCode from './base?raw';

import WithCustomLayoutComponent from './with-custom-layout';
import WithCustomLayoutCode from './with-custom-layout?raw';

import OnLayoutChangeComponent from './on-layout-change';
import OnLayoutChangeCode from './on-layout-change?raw';

import WithCallbackComponent from './with-callback';
import WithCallbackCode from './with-callback?raw';

createStories(
  'Features/Column Hiding',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('with custom layout', WithCustomLayoutComponent, WithCustomLayoutCode),
    createStory('on layout change', OnLayoutChangeComponent, OnLayoutChangeCode),
    createStory('with callback', WithCallbackComponent, WithCallbackCode),
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
