import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { createStories, createStory } from '../../../create-story';

import BaseComponent from './base';
import BaseCode from './base?raw';

import WithLoadingComponent from './with-loading';
import WithLoadingCode from './with-loading?raw';

createStories(
  'Server/Fetch',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('with loading', WithLoadingComponent, WithLoadingCode),
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
