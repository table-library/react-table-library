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

import ReadComponent from './read';
import ReadCode from './read?raw';

createStories('Server/Table', [createStory('read', ReadComponent, ReadCode)], Table, {
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
});
