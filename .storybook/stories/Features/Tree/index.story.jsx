import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { CellTree } from '@table-library/react-table-library/tree';

import { createStories, createStory } from '../../create-story';

import BaseComponent from './base';
import BaseCode from './base?raw';

import TreeIconComponent from './tree-icon';
import TreeIconCode from './tree-icon?raw';

import DefaultTreeComponent from './default-tree';
import DefaultTreeCode from './default-tree?raw';

import ExpandTreeOnTreeIconClickComponent from './expand-tree-on-tree-icon-click';
import ExpandTreeOnTreeIconClickCode from './expand-tree-on-tree-icon-click?raw';

import ColumnOffsetComponent from './column-offset';
import ColumnOffsetCode from './column-offset?raw';

import TreeIconSizeComponent from './tree-icon-size';
import TreeIconSizeCode from './tree-icon-size?raw';

import CustomTreeIconComponent from './custom-tree-icon';
import CustomTreeIconCode from './custom-tree-icon?raw';

import DoubleIconComponent from './double-icon';
import DoubleIconCode from './double-icon?raw';

import NoIconMarginComponent from './no-icon-margin';
import NoIconMarginCode from './no-icon-margin?raw';

import IndentationComponent from './indentation';
import IndentationCode from './indentation?raw';

import ToggleAllComponent from './toggle-all';
import ToggleAllCode from './toggle-all?raw';

import ToggleRecursivelyComponent from './toggle-recursively';
import ToggleRecursivelyCode from './toggle-recursively?raw';

import CustomLinesComponent from './custom-lines';
import CustomLinesCode from './custom-lines?raw';

createStories(
  'Features/Tree',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('tree icon', TreeIconComponent, TreeIconCode),
    createStory('default tree', DefaultTreeComponent, DefaultTreeCode),
    createStory(
      'expand tree on tree icon click',
      ExpandTreeOnTreeIconClickComponent,
      ExpandTreeOnTreeIconClickCode,
    ),
    createStory('column offset', ColumnOffsetComponent, ColumnOffsetCode),
    createStory('tree icon size', TreeIconSizeComponent, TreeIconSizeCode),
    createStory('custom tree icon (Material UI)', CustomTreeIconComponent, CustomTreeIconCode),
    createStory('double icon', DoubleIconComponent, DoubleIconCode),
    createStory('no icon margin', NoIconMarginComponent, NoIconMarginCode),
    createStory('indentation', IndentationComponent, IndentationCode),
    createStory('toggle all', ToggleAllComponent, ToggleAllCode),
    createStory('toggle recursively', ToggleRecursivelyComponent, ToggleRecursivelyCode),
    createStory('custom lines', CustomLinesComponent, CustomLinesCode),
  ],
  Table,
  {
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
    CellTree,
  },
);
