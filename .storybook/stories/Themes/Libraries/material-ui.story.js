/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import MaterialCheckbox from '@material-ui/core/Checkbox';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort';

import {
  useRowSelect,
  SELECT_TYPES,
} from '@table-library/react-table-library/select';

import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../../data';

storiesOf('Library Themes/Material UI', module)
  .addParameters({ component: Table })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ))
  .add('base', () => {
    const data = { nodes };

    const theme = useTheme({
      Table: `
        border-radius: 4px;
        border: 1px solid #e0e0e0;
      `,
      BaseRow: `
        height: 52px;
        font-size: 14px;

        &:hover {
          cursor: default;
        }

        border-bottom: 1px solid #e0e0e0;
      `,
      HeaderRow: `
        font-weight: bold;
      `,
      Row: `
        &:hover {
          background-color: #f5f5f5;
        }

        &.row-select-selected, &.row-select-single-selected {
          background-color: #edf4fb;

          &:hover {
            background-color: #e3eefa;
          }
        }
      `,
      BaseCell: `
        border-right: 1px solid transparent;

        &:focus {
          outline: dotted;
          outline-width: 1px;
          outline-offset: -1px;
        }
      `,
    });

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        sortIcon: {
          margin: '0px',
          iconDefault: <UnfoldMoreOutlinedIcon fontSize="small" />,
          iconUp: <KeyboardArrowUpOutlinedIcon fontSize="small" />,
          iconDown: (
            <KeyboardArrowDownOutlinedIcon fontSize="small" />
          ),
        },
        sortFns: {
          TASK: (array) =>
            array.sort((a, b) => a.name.localeCompare(b.name)),
          DEADLINE: (array) =>
            array.sort((a, b) => a.deadline - b.deadline),
          TYPE: (array) =>
            array.sort((a, b) => a.type.localeCompare(b.type)),
          COMPLETE: (array) =>
            array.sort((a, b) => a.isComplete - b.isComplete),
          TASKS: (array) =>
            array.sort(
              (a, b) =>
                (a.nodes || []).length - (b.nodes || []).length
            ),
        },
      }
    );

    const select = useRowSelect(
      data,
      {
        onChange: onSelectChange,
      },
      {
        rowSelect: SELECT_TYPES.MultiSelect,
        buttonSelect: SELECT_TYPES.MultiSelect,
      }
    );

    function onSortChange(action, state) {
      console.log(action, state);
    }

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} theme={theme} sort={sort} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell shrink>
                  <MaterialCheckbox
                    color="primary"
                    size="small"
                    checked={select.state.all}
                    indeterminate={
                      !select.state.all && !select.state.none
                    }
                    onChange={select.fns.onToggleAll}
                  />
                </HeaderCell>
                <HeaderCellSort resize sortKey="TASK">
                  Task
                </HeaderCellSort>
                <HeaderCellSort resize sortKey="DEADLINE">
                  Deadline
                </HeaderCellSort>
                <HeaderCellSort resize sortKey="TYPE">
                  Type
                </HeaderCellSort>
                <HeaderCellSort resize sortKey="COMPLETE">
                  Complete
                </HeaderCellSort>
                <HeaderCellSort resize sortKey="TASKS">
                  Tasks
                </HeaderCellSort>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row item={item} key={item.id}>
                  <Cell shrink tabIndex="-1">
                    <MaterialCheckbox
                      color="primary"
                      size="small"
                      checked={select.state.ids.includes(item.id)}
                      onChange={() =>
                        select.fns.onToggleById(item.id)
                      }
                    />
                  </Cell>
                  <Cell tabIndex="-1">{item.name}</Cell>
                  <Cell tabIndex="-1">
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell tabIndex="-1">{item.type}</Cell>
                  <Cell tabIndex="-1">
                    {item.isComplete.toString()}
                  </Cell>
                  <Cell tabIndex="-1">{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
