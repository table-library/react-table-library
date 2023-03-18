import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';

import { createStories, createStory } from '../../create-story';

import BaseComponent from './base';
import BaseCode from './base?raw';

createStories('Kitchen Sink', [createStory('Expand Animation', BaseComponent, BaseCode)], Table, {
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
});
