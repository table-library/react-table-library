import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@overmap-ai/react-table-library/table';

import { createStories, createStory } from '../../../create-story';

import FetchOnceComponent from './fetch-once';
import FetchOnceCode from './fetch-once?raw';

import FetchNestedComponent from './fetch-nested';
import FetchNestedCode from './fetch-nested?raw';

import FetchNestedLoadingComponent from './fetch-nested-loading';
import FetchNestedLoadingCode from './fetch-nested-loading?raw';

import FetchNestedPaginatedComponent from './fetch-nested-paginated';
import FetchNestedPaginatedCode from './fetch-nested-paginated?raw';

createStories(
  'Server/Tree',
  [
    createStory('fetch once', FetchOnceComponent, FetchOnceCode),
    createStory('fetch nested', FetchNestedComponent, FetchNestedCode),
    createStory('fetch nested (loading)', FetchNestedLoadingComponent, FetchNestedLoadingCode),
    createStory(
      'fetch nested & paginated',
      FetchNestedPaginatedComponent,
      FetchNestedPaginatedCode,
    ),
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
