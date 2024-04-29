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

import BaseComponent from './base';
import BaseCode from './base?raw';

createStories('Client vs Server', [createStory('Client-Side', BaseComponent, BaseCode)], Table, {
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
});
