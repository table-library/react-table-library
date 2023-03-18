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

import NotRecursiveComponent from './not-recursive';
import NotRecursiveCode from './not-recursive?raw';

createStories(
  'Mixing Features/Tree & Sort',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('not recursive', NotRecursiveComponent, NotRecursiveCode),
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
