/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  MemoizedRow,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { useSelect } from '@table-library/react-table-library/select';

import { nodes } from '../data';

storiesOf('06. Recipes/02. Memoized Row (WIP)', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes };

    const select = useSelect({
      data,
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} select={select}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Task</HeaderCell>
                <HeaderCell>Deadline</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Complete</HeaderCell>
                <HeaderCell>Tasks</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <MemoizedRow item={item} key={item.id}>
                  {(tableItem) => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          }
                        )}
                      </Cell>
                      <Cell>{tableItem.type}</Cell>
                      <Cell>{tableItem.isComplete.toString()}</Cell>
                      <Cell>{tableItem.nodes?.length}</Cell>
                    </React.Fragment>
                  )}
                </MemoizedRow>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
