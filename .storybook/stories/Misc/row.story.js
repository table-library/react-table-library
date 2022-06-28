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

storiesOf('Misc/Row', module)
  .addParameters({ component: Table })
  .add('row click', () => {
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
                <Row
                  key={item.id}
                  item={item}
                  onClick={(item, event) => console.log('Click Row', item, event)}
                >
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
  .add('row double click', () => {
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
                <Row
                  key={item.id}
                  item={item}
                  onDoubleClick={(item, event) => console.log('Double Click Row', item, event)}
                >
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
  .add('row on hover', () => {
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
                <Row
                  onMouseEnter={(event) => console.log(event)}
                  onMouseLeave={(event) => console.log(event)}
                  key={item.id}
                  item={item}
                >
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
  // .add('row outline', () => {
  //   const data = { nodes };

  //   const theme = useTheme({
  //     BaseRow: `
  //       &:hover, &:focus {
  //         outline: dotted;
  //         outline-width: 10px;
  //         outline-offset: -1px;
  //       }
  //     `,
  //   });

  //   return (
  //     <Table data={data} theme={theme}>
  //       {(tableList) => (
  //         <>
  //           <Header>
  //             <HeaderRow>
  //               <HeaderCell>Task</HeaderCell>
  //               <HeaderCell>Deadline</HeaderCell>
  //               <HeaderCell>Type</HeaderCell>
  //               <HeaderCell>Complete</HeaderCell>
  //               <HeaderCell>Tasks</HeaderCell>
  //             </HeaderRow>
  //           </Header>

  //           <Body>
  //             {tableList.map((item) => (
  //               <Row key={item.id} item={item} tabIndex="-1">
  //                 <Cell onClick={(event) => console.log('Click Cell', event)}>{item.name}</Cell>
  //                 <Cell>
  //                   {item.deadline.toLocaleDateString('en-US', {
  //                     year: 'numeric',
  //                     month: '2-digit',
  //                     day: '2-digit',
  //                   })}
  //                 </Cell>
  //                 <Cell>{item.type}</Cell>
  //                 <Cell>{item.isComplete.toString()}</Cell>
  //                 <Cell>{item.nodes?.length}</Cell>
  //               </Row>
  //             ))}
  //           </Body>
  //         </>
  //       )}
  //     </Table>
  //   );
  // })
  // .add('row tab navigation', () => {
  //   const data = { nodes };

  //   const theme = useTheme({
  //     BaseRow: `
  //       &:focus {
  //         outline: dotted;
  //         outline-width: 1px;
  //         outline-offset: -1px;
  //       }
  //     `,
  //   });

  //   return (
  //     <Table data={data} theme={theme}>
  //       {(tableList) => (
  //         <>
  //           <Header>
  //             <HeaderRow>
  //               <HeaderCell>Task</HeaderCell>
  //               <HeaderCell>Deadline</HeaderCell>
  //               <HeaderCell>Type</HeaderCell>
  //               <HeaderCell>Complete</HeaderCell>
  //               <HeaderCell>Tasks</HeaderCell>
  //             </HeaderRow>
  //           </Header>

  //           <Body>
  //             {tableList.map((item, index) => (
  //               <Row key={item.id} item={item} ariaColindex={index + 1} tabIndex={index + 1}>
  //                 <Cell onClick={(event) => console.log('Click Cell', event)}>{item.name}</Cell>
  //                 <Cell>
  //                   {item.deadline.toLocaleDateString('en-US', {
  //                     year: 'numeric',
  //                     month: '2-digit',
  //                     day: '2-digit',
  //                   })}
  //                 </Cell>
  //                 <Cell>{item.type}</Cell>
  //                 <Cell>{item.isComplete.toString()}</Cell>
  //                 <Cell>{item.nodes?.length}</Cell>
  //               </Row>
  //             ))}
  //           </Body>
  //         </>
  //       )}
  //     </Table>
  //   );
  // })
  .add('variable row height', () => {
    const data = { nodes };

    const getHeight = (index) => ((index % 3) + 1) * 25;

    const theme = useTheme({
      HeaderRow: `
        background-color: #fafafa;
      `,
      Row: `
        &:nth-of-type(odd) {
          background-color: #f5f5f5;
        }

        &:nth-of-type(even) {
          background-color: #fafafa;
        }
      `,
    });

    const getCellStyle = (index) => ({ style: { height: `${getHeight(index)}px` } });

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
                    {...getCellStyle(index)}
                    onClick={(event) => console.log('Click Cell', event)}
                  >
                    {item.name}
                  </Cell>
                  <Cell {...getCellStyle(index)}>
                    {item.deadline.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Cell>
                  <Cell {...getCellStyle(index)}>{item.type}</Cell>
                  <Cell {...getCellStyle(index)}>{item.isComplete.toString()}</Cell>
                  <Cell {...getCellStyle(index)}>{item.nodes?.length}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });
