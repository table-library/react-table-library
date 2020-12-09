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

const list = [
  { id: '1', name: 'Hello', stars: 24, count: 42, light: true },
  { id: '2', name: 'There', stars: 42, count: 24, light: false },
  { id: '3', name: 'Nice', stars: 111, count: 111, light: true },
  { id: '4', name: 'To', stars: 122, count: 133, light: false },
  { id: '5', name: 'Meet', stars: 133, count: 122, light: true },
  { id: '6', name: 'You', stars: 155, count: 155, light: true },
  {
    id: '7',
    name: 'And Welcome To This Table Folks',
    stars: 155,
    count: 155,
    light: true
  }
];

storiesOf('01. Features/ 01. Table', module)
  .addParameters({ component: Table })
  .add('default', () => {
    return (
      <Table list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id} item={item}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
                    </React.Fragment>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('row click', () => {
    return (
      <Table list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  onClick={(tableItem, event) =>
                    console.log(tableItem, event)
                  }
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
                    </React.Fragment>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('row double click', () => {
    return (
      <Table list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  onDoubleClick={(tableItem, event) =>
                    console.log(tableItem, event)
                  }
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
                    </React.Fragment>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('row click & row double click', () => {
    return (
      <Table list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Stars</HeaderCell>
                <HeaderCell>Light</HeaderCell>
                <HeaderCell>Count</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row
                  key={item.id}
                  item={item}
                  onClick={(tableItem, event) => {
                    console.log('onClick');
                    console.log(tableItem, event);
                  }}
                  onDoubleClick={(tableItem, event) => {
                    console.log('onDoubleClick');
                    console.log(tableItem, event);
                  }}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>{tableItem.stars}</Cell>
                      <Cell>{tableItem.light.toString()}</Cell>
                      <Cell>{tableItem.count}</Cell>
                    </React.Fragment>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  })
  .add('create WIP', () => {
    return <div>create item</div>;
  })
  .add('delete WIP', () => {
    return <div>delete item</div>;
  })
  .add('update WIP', () => {
    return <div>update item</div>;
  })
  .add('column mapping (important: key must be index)', () => {
    const columns = [
      { label: 'Name', get: item => item.name },
      { label: 'Stars', get: item => item.stars },
      { label: 'Light', get: item => item.light.toString() },
      { label: 'Count', get: item => item.count }
    ];

    return (
      <Table list={list}>
        {tableList => (
          <>
            <Header>
              <HeaderRow>
                {columns.map((column, index) => (
                  <HeaderCell key={index}>{column.label}</HeaderCell>
                ))}
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(item => (
                <Row key={item.id} item={item}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      {columns.map((column, index) => (
                        <Cell key={index}>
                          {column.get(tableItem)}
                        </Cell>
                      ))}
                    </React.Fragment>
                  )}
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });

// .add('04. with sort/select', () => {
//   return (
//     <Table list={list}>
//       {(tableList, selectedTableIdList) => (
//         <>
//           <Header>
//             <HeaderRow>
//               <HeaderSelectCell
//                 width={WIDTHS.Checkbox}
//                 noIndent
//               />
//               <HeaderSortCell
//
//                 sortKey="name"
//                 sortFn={array =>
//                   array.sort((a, b) => a.name.localeCompare(b.name))
//                 }
//               >
//                 Name
//               </HeaderSortCell>
//               <HeaderCell   >
//                 Stars
//               </HeaderCell>
//               <HeaderSortCell
//
//                 sortKey="light"
//
//                 sortFn={array => array.sort((a, b) => a.light - b.light)}
//               >
//                 Light
//               </HeaderSortCell>
//               <HeaderSortCell
//
//                 sortKey="count"
//                 sortFn={array => array.sort((a, b) => a.count - b.count)}
//               >
//                 Count
//               </HeaderSortCell>
//             </HeaderRow>
//           </Header>

//           <Body>
//             {tableList.map(item => (
//               <Row selectableId={item.id} key={item.id}>
//                 <SelectCell width={WIDTHS.Checkbox} noIndent />
//                 <Cell  >{item.name}</Cell>
//                 <Cell   >
//                   {item.stars}
//                 </Cell>
//                 <Cell   >
//                   <Checkbox
//                     asAtom
//                     selection={
//                       item.light
//                         ? Checkbox.SELECTION.selected
//                         : Checkbox.SELECTION.unselected
//                     }
//                     onChange={() => {}}
//                   />
//                 </Cell>
//                 <Cell  >{item.count}</Cell>
//               </Row>
//             ))}
//           </Body>
//         <>
//       )}
//     </Table>
//   );
// })

// .add('06. with fixed header', () => {
//   return (
//     <div style={{ height: text('container height', '300px') }}>
//       <Table list={list}>
//         {tableList => (
//           <>
//             <Header>
//               <HeaderRow>
//                 <HeaderCell  >Name</HeaderCell>
//                 <HeaderCell   >
//                   Stars
//                 </HeaderCell>
//                 <HeaderCell   >
//                   Light
//                 </HeaderCell>
//                 <HeaderCell  >Count</HeaderCell>
//               </HeaderRow>
//             </Header>

//             <Body>
//               {tableList.map(item => (
//                 <Row key={item.id}>
//                   <Cell  >{item.name}</Cell>
//                   <Cell   >
//                     {item.stars}
//                   </Cell>
//                   <Cell   >
//                     <Checkbox
//                       asAtom
//                       selection={
//                         item.light
//                           ? Checkbox.SELECTION.selected
//                           : Checkbox.SELECTION.unselected
//                       }
//                       onChange={() => {}}
//                     />
//                   </Cell>
//                   <Cell  >{item.count}</Cell>
//                 </Row>
//               ))}
//             </Body>
//           <>
//         )}
//       </Table>
//     </div>
//   );
// })
// .add('07. with search', () => {
//   const [value, setValue] = React.useState('');

//   const filteredList = list.filter(item =>
//     item.name.toLowerCase().includes(value.toLowerCase()),
//   );

//   return (
//     <>
//       <InputFieldText
//         label="Search by Name"
//         value={value}
//         onChange={setValue}
//       />

//       <Table list={filteredList}>
//         {tableList => (
//           <>
//             <Header>
//               <HeaderRow>
//                 <HeaderCell   noIndent>
//                   Name
//                 </HeaderCell>
//                 <HeaderCell   >
//                   Stars
//                 </HeaderCell>
//                 <HeaderCell   >
//                   Light
//                 </HeaderCell>
//                 <HeaderCell  >Count</HeaderCell>
//               </HeaderRow>
//             </Header>

//             <Body>
//               {tableList.map(item => (
//                 <Row key={item.id}>
//                   <Cell   noIndent>
//                     {item.name}
//                   </Cell>
//                   <Cell   >
//                     {item.stars}
//                   </Cell>
//                   <Cell   >
//                     <Checkbox
//                       asAtom
//                       selection={
//                         item.light
//                           ? Checkbox.SELECTION.selected
//                           : Checkbox.SELECTION.unselected
//                       }
//                       onChange={() => {}}
//                     />
//                   </Cell>
//                   <Cell  >{item.count}</Cell>
//                 </Row>
//               ))}
//             </Body>
//           <>
//         )}
//       </Table>
//     </>
//   );
// });
