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
import { getTheme } from '@table-library/react-table-library/baseline';

import { nodes } from '../data';

storiesOf('Features/Theme', module)
  .addParameters({
    component: Table,
    subcomponents: {
      Header,
      HeaderRow,
      Body,
      Row,
      HeaderCell,
      Cell,
    },
  })
  .add('opt-in baseline', () => {
    const data = { nodes };

    const theme = useTheme(getTheme());

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
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
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
  .add('striped', () => {
    const data = { nodes };

    const theme = useTheme({
      HeaderRow: `
        background-color: #eaf5fd;
      `,
      Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
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
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
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
  .add('chess', () => {
    const data = { nodes };

    const theme = useTheme({
      BaseCell: `
        border-right: 1px solid transparent;
      `,
      Row: `
        &:nth-of-type(odd) {
          .td:nth-of-type(even) {
            background-color: #dddddd;
          }

          .td:nth-of-type(odd) {
            background-color: #fafafa;
          }
        }

        &:nth-of-type(even) {
          .td:nth-of-type(odd) {
            background-color: #dddddd;
          }

          .td:nth-of-type(even) {
            background-color: #fafafa;
          }
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
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
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
  .add('alignment', () => {
    const data = { nodes };

    const theme = useTheme({
      HeaderRow: `
        border-bottom: 1px solid #a0a8ae;
      `,
      Row: `
        border-bottom: 1px solid #a0a8ae;

        &:last-of-type {
          border-bottom: 0px solid transparent;
        }
      `,
      BaseCell: `
        border-right: 1px solid #a0a8ae;

        &:last-of-type {
          border-right: 0px solid transparent;
        }

        & div {
          width: 100%;
        }

        text-align: center;

        &:first-of-type {
          text-align: left;
        }

        &:last-of-type {
          text-align: right;
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
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
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
  .add('gap', () => {
    const data = { nodes };

    const theme = useTheme({
      HeaderRow: `
        border-bottom: 1px solid #a0a8ae;
      `,
      Row: `
        border-bottom: 1px solid #a0a8ae;

        &:last-of-type {
          border-bottom: 0px solid transparent;
        }
      `,
      BaseCell: `
        border-right: 1px solid #a0a8ae;

        &:last-of-type {
          border-right: 0px solid transparent;
        }

        margin: 9px;
        padding: 11px;
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
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
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
  .add('indentation', () => {
    const data = { nodes };

    const theme = useTheme({
      HeaderRow: `
        border-bottom: 1px solid #a0a8ae;
      `,
      Row: `
        border-bottom: 1px solid #a0a8ae;

        &:last-of-type {
          border-bottom: 0px solid transparent;
        }
      `,
      BaseCell: `
        border-right: 1px solid #a0a8ae;

        &:last-of-type {
          border-right: 0px solid transparent;
        }

        padding-left: 30px;
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
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
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
  .add('flex', () => {
    const data = { nodes };

    const theme = useTheme({
      HeaderRow: `
        border-bottom: 1px solid #a0a8ae;
      `,
      Row: `
        border-bottom: 1px solid #a0a8ae;

        &:last-of-type {
          border-bottom: 0px solid transparent;
        }
      `,
      BaseCell: `
        border-right: 1px solid #a0a8ae;

        &:last-of-type {
          border-right: 0px solid transparent;
        }
      `,
      HeaderCell: `
        & > div {
          width: 100%;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `,
    });

    return (
      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>
                  <span>Task</span>
                  <strong>1</strong>
                </HeaderCell>
                <HeaderCell>
                  <span>Deadline</span>
                  <strong>2</strong>
                </HeaderCell>
                <HeaderCell>
                  <span>Type</span>
                  <strong>3</strong>
                </HeaderCell>
                <HeaderCell>
                  <span>Complete</span>
                  <strong>4</strong>
                </HeaderCell>
                <HeaderCell>
                  <span>Tasks</span>
                  <strong>5</strong>
                </HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
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
  .add('border hover', () => {
    const data = { nodes };

    const theme = useTheme({
      Row: `
        border-top: 1px solid #a0a8ae;
        border-bottom: 1px solid #a0a8ae;

        position: relative;
        z-index: 1;

        &:not(:last-of-type) {
          margin-bottom: -1px;
        }

        cursor: pointer;

        &:hover {
          z-index: 2;
          border-top: 1px solid #177ac9;
          border-bottom: 1px solid #177ac9;
        }
      `,
      BaseCell: `
        border-bottom: 1px solid transparent;
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
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
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
  .add('stitch themes', () => {
    const data = { nodes };

    const colorTheme = {
      BaseRow: `
        color: #141414;
      `,
      Row: `
        &:hover {
          color: orange;
        }

        cursor: pointer;
      `,
    };

    const stripedTheme = {
      BaseRow: `
        font-size: 14px;
      `,
      HeaderRow: `
        background-color: #eaf5fd;
      `,
      Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
        }
      `,
    };

    const gapTheme = {
      BaseCell: `
        margin: 9px;
        padding: 11px;
      `,
    };

    const theme = useTheme([colorTheme, stripedTheme, gapTheme]);

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
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
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
  });
