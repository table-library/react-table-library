import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { HeaderCellSelect, CellSelect } from '@table-library/react-table-library/select';

import { createStories, createStory } from '../../create-story';

import BaseComponent from './base';
import BaseCode from './base?raw';

import CheckboxComponent from './checkbox';
import CheckboxCode from './checkbox?raw';

import CheckboxPositionComponent from './checkbox-position';
import CheckboxPositionCode from './checkbox-position?raw';

import SelectOnCheckboxComponent from './select-on-checkbox';
import SelectOnCheckboxCode from './select-on-checkbox?raw';

import AllSingleSelectComponent from './all-single-select';
import AllSingleSelectCode from './all-single-select?raw';

import AllMultiSelectComponent from './all-multi-select';
import AllMultiSelectCode from './all-multi-select?raw';

import DefaultSingleSelectComponent from './default-single-select';
import DefaultSingleSelectCode from './default-single-select?raw';

import DefaultMultiSelectComponent from './default-multi-select';
import DefaultMultiSelectCode from './default-multi-select?raw';

import IsCarryForwardComponent from './is-carry-forward';
import IsCarryForwardCode from './is-carry-forward?raw';

import IsPartialToAllComponent from './is-partial-to-all';
import IsPartialToAllCode from './is-partial-to-all?raw';

import CustomCheckboxComponent from './custom-checkbox';
import CustomCheckboxCode from './custom-checkbox?raw';

createStories(
  'Features/Select',
  [
    createStory('base', BaseComponent, BaseCode),
    createStory('checkbox', CheckboxComponent, CheckboxCode),
    createStory('checkbox position', CheckboxPositionComponent, CheckboxPositionCode),
    createStory('select on checkbox position', SelectOnCheckboxComponent, SelectOnCheckboxCode),
    createStory('all single select', AllSingleSelectComponent, AllSingleSelectCode),
    createStory('all multi select', AllMultiSelectComponent, AllMultiSelectCode),
    createStory('default single select', DefaultSingleSelectComponent, DefaultSingleSelectCode),
    createStory('default multi select', DefaultMultiSelectComponent, DefaultMultiSelectCode),
    createStory('is carry forward', IsCarryForwardComponent, IsCarryForwardCode),
    createStory('is partial to all', IsPartialToAllComponent, IsPartialToAllCode),
    createStory('custom checkbox (Material UI)', CustomCheckboxComponent, CustomCheckboxCode),
  ],
  Table,
  {
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
    HeaderCellSelect,
    CellSelect,
  },
);
