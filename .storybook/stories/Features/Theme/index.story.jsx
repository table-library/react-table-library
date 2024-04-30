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

import StripedComponent from './striped';
import StripedCode from './striped?raw';

import ChessComponent from './chess';
import ChessCode from './chess?raw';

import BordersComponent from './borders';
import BordersCode from './borders?raw';

import AlignmentComponent from './alignment';
import AlignmentCode from './alignment?raw';

import MarginComponent from './margin';
import MarginCode from './margin?raw';

import PaddingComponent from './padding';
import PaddingCode from './padding?raw';

import FlexComponent from './flex';
import FlexCode from './flex?raw';

import BorderHoverComponent from './border-hover';
import BorderHoverCode from './border-hover?raw';

import StitchThemesComponent from './stitch-themes';
import StitchThemesCode from './stitch-themes?raw';

createStories(
  'Features/Theme',
  [
    createStory('baseline', BaseComponent, BaseCode),
    createStory('striped', StripedComponent, StripedCode),
    createStory('chess', ChessComponent, ChessCode),
    createStory('borders', BordersComponent, BordersCode),
    createStory('alignment', AlignmentComponent, AlignmentCode),
    createStory('margin', MarginComponent, MarginCode),
    createStory('padding', PaddingComponent, PaddingCode),
    createStory('flex', FlexComponent, FlexCode),
    createStory('border-hover', BorderHoverComponent, BorderHoverCode),
    createStory('stitch-themes', StitchThemesComponent, StitchThemesCode),
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
