/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell
} from '@table-library/react-table-library/lib/table';

import { nodes } from '../data';

storiesOf('06. Recipes/ 03. Large Table (WIP)', module)
  .addParameters({ component: Table })
  .add('default', () => {
    return <>WIP</>;
  });
