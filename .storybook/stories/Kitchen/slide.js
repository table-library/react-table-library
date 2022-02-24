import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Slide from '@material-ui/core/Slide';

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
import { useRowSelect } from '@table-library/react-table-library/select';

import { nodes } from '../data';

storiesOf('Kitchen Sink/Slide', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const select = useRowSelect(data, {
      onChange: onSelectChange,
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    const theme = useTheme({
      Table: `
        flex: 1;
        overflow-x: hidden;
      `,
    });

    return (
      <div style={{ display: 'flex' }}>
        <Table data={data} select={select} theme={theme}>
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
                  <Row item={item} key={item.id}>
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
        <Slide direction="left" in={!!select.state.id} mountOnEnter unmountOnExit>
          <div
            style={{
              backgroundColor: '#e0e0e0',
              padding: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '40%',
              textAlign: 'center',
            }}
          >
            {data.nodes.find((node) => node.id === select.state.id)?.name}
          </div>
        </Slide>
      </div>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
