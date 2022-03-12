import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';

import { nodes } from '../data';

storiesOf('Misc/Cell', module)
  .addParameters({ component: Table })
  .add('cell click', () => {
    const data = { nodes };

    return (
      <Table data={data}>
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
                <Row key={item.id} item={item}>
                  <Cell onClick={(event) => console.log('Click Cell', event)}>{item.name}</Cell>
                  <Cell>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>{item.isComplete.toString()}</Cell>
                  <Cell>{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('cell outline', () => {
    const data = { nodes };

    const theme = useTheme({
      BaseCell: `
        &:focus {
          outline: dotted;
          outline-width: 1px;
          outline-offset: -1px;
        }
      `,
    });

    return (
      <Table data={data} theme={theme}>
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
              {tableList.map((item, index) => (
                <Row key={item.id} item={item}>
                  <Cell tabIndex="-1" onClick={(event) => console.log('Click Cell', event)}>
                    {item.name}
                  </Cell>
                  <Cell tabIndex="-1">
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell tabIndex="-1">{item.type}</Cell>
                  <Cell tabIndex="-1">{item.isComplete.toString()}</Cell>
                  <Cell tabIndex="-1">{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('cell tab navigation', () => {
    const data = { nodes };

    const theme = useTheme({
      BaseCell: `
        &:focus {
          outline: dotted;
          outline-width: 1px;
          outline-offset: -1px;
        }
      `,
    });

    return (
      <Table data={data} theme={theme}>
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
              {tableList.map((item, index) => (
                <Row key={item.id} item={item}>
                  <Cell
                    ariaColindex={1 + index * 5}
                    tabIndex={1 + index * 5}
                    onClick={(event) => console.log('Click Cell', event)}
                  >
                    {item.name}
                  </Cell>
                  <Cell ariaColindex={2 + index * 5} tabIndex={2 + index * 5}>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell ariaColindex={3 + index * 5} tabIndex={3 + index * 5}>
                    {item.type}
                  </Cell>
                  <Cell ariaColindex={4 + index * 5} tabIndex={4 + index * 5}>
                    {item.isComplete.toString()}
                  </Cell>
                  <Cell ariaColindex={5 + index * 5} tabIndex={5 + index * 5}>
                    {item.nodes?.length}
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
