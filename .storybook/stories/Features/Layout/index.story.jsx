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

import CustomComponent from './custom';
import CustomCode from './custom?raw';

import HorizontalScrollComponent from './horizontal-scroll';
import HorizontalScrollCode from './horizontal-scroll?raw';

createStories(
  'Features/Layout',
  [
    createStory('custom ', CustomComponent, CustomCode),
    createStory('horizontal scroll ', HorizontalScrollComponent, HorizontalScrollCode),
  ],
  Table,
  {
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
  },
);
