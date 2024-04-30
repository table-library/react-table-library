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

import SelectOnCheckboxComponent from './select-on-checkbox';
import SelectOnCheckboxCode from './select-on-checkbox?raw';

import SelectOnRowComponent from './select-on-row';
import SelectOnRowCode from './select-on-row?raw';

import ExpandTreeOnRowComponent from './expand-tree-on-row';
import ExpandTreeOnRowCode from './expand-tree-on-row?raw';

import OnlyTreeIconComponent from './only-tree-icon';
import OnlyTreeIconCode from './only-tree-icon?raw';

import OnlyCheckboxComponent from './only-checkbox';
import OnlyCheckboxCode from './only-checkbox?raw';

createStories(
  'Mixing Features/Tree & Select',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory(
      'select on checkbox, expand tree on tree icon click',
      SelectOnCheckboxComponent,
      SelectOnCheckboxCode,
    ),
    createStory(
      'select on row click, expand tree on tree icon click',
      SelectOnRowComponent,
      SelectOnRowCode,
    ),
    createStory(
      'expand tree on row click, select on checkbox',
      ExpandTreeOnRowComponent,
      ExpandTreeOnRowCode,
    ),
    createStory(
      'only tree icon: expand tree on tree icon click, select on row click',
      OnlyTreeIconComponent,
      OnlyTreeIconCode,
    ),
    createStory(
      'only checkbox: select on checkbox, expand tree on row click',
      OnlyCheckboxComponent,
      OnlyCheckboxCode,
    ),
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
