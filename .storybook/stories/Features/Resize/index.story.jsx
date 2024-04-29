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

import MinWidthComponent from './min-width';
import MinWidthCode from './min-width?raw';

import ResizerHighlightComponent from './resizer-highlight';
import ResizerHighlightCode from './resizer-highlight?raw';

import ResizerWidthComponent from './resizer-width';
import ResizerWidthCode from './resizer-width?raw';

import OnLayoutChangeComponent from './on-layout-change';
import OnLayoutChangeCode from './on-layout-change?raw';

createStories(
  'Features/Resize',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('min width', MinWidthComponent, MinWidthCode),
    createStory('resizer highlight', ResizerHighlightComponent, ResizerHighlightCode),
    createStory('resizer width', ResizerWidthComponent, ResizerWidthCode),
    createStory('on layout change ', OnLayoutChangeComponent, OnLayoutChangeCode),
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
