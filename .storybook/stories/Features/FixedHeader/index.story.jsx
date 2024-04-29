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

import InHeightContainerComponent from './in-height-container';
import InHeightContainerCode from './in-height-container?raw';

import InFlexContainerComponent from './in-flex-container';
import InFlexContainerCode from './in-flex-container?raw';

createStories(
  'Features/Fixed Header',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('in height container', InHeightContainerComponent, InHeightContainerCode),
    createStory('in flex container', InFlexContainerComponent, InFlexContainerCode),
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
