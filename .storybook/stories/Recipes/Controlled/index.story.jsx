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

import SortComponent from './sort';
import SortCode from './sort?raw';

import SelectComponent from './select';
import SelectCode from './select?raw';

createStories(
  'Recipes/Controlled',
  [
    createStory('sort', SortComponent, SortCode),
    createStory('select', SelectComponent, SelectCode),
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
