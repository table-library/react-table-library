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

import BaseComponent from './base';
import BaseCode from './base?raw';

import WithCallbackComponent from './with-callback';
import WithCallbackCode from './with-callback?raw';

import WithDebounceComponent from './with-debounce';
import WithDebounceCode from './with-debounce?raw';

createStories(
  'Server/Search',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('with callback', WithCallbackComponent, WithCallbackCode),
    createStory('with debounce', WithDebounceComponent, WithDebounceCode),
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
