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

import VerticalScrollContainerComponent from './plus-vertical-scroll';
import VerticalScrollContainerCode from './plus-vertical-scroll?raw';

createStories(
  'Features/Horizontal Scroll',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('+ vertical scroll', VerticalScrollContainerComponent, VerticalScrollContainerCode),
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
