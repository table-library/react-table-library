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

createStories('Misc/Actions', [createStory('base', BaseComponent, BaseCode)], Table, {
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
});
