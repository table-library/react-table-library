import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  Footer,
  FooterRow,
  FooterCell,
} from '@table-library/react-table-library/table';

import { createStories, createStory } from '../../create-story';

import BaseComponent from './base';
import BaseCode from './base?raw';

createStories('Misc/Footer', [createStory('base', BaseComponent, BaseCode)], Table, {
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Footer,
  FooterRow,
  FooterCell,
});
