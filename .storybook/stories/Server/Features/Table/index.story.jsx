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

import ReadComponent from './read';
import ReadCode from './read?raw';

createStories('Server/Table', [createStory('read', ReadComponent, ReadCode)], Table, {
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
});
