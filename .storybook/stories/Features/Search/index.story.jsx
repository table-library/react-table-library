import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { createStories, createStory } from '../../create-story';

import BaseComponent from './base';
import BaseCode from './base?raw';

import WithCallbackComponent from './with-callback';
import WithCallbackCode from './with-callback?raw';

createStories(
  'Features/Search',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('with callback', WithCallbackComponent, WithCallbackCode),
  ],
  Table,
  {
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
  },
);
