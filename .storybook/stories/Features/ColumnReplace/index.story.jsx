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

createStories('Features/Column Replace', [createStory('base', BaseComponent, BaseCode)], Table, {
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
});
