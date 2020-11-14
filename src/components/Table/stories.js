/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Table } from '.';

const list = [
  { id: '1', name: 'Hello', stars: 24, count: 42, laser: true },
  { id: '2', name: 'There', stars: 42, count: 24, laser: false },
  { id: '3', name: 'Nice', stars: 111, count: 111, laser: true },
  { id: '4', name: 'To', stars: 122, count: 133, laser: false },
  { id: '5', name: 'Meet', stars: 133, count: 122, laser: true },
  { id: '6', name: 'You', stars: 155, count: 155, laser: true },
  {
    id: '7',
    name: 'And Welcome To This Table Folks',
    stars: 155,
    count: 155,
    laser: true
  }
];

storiesOf('01. Table', module)
  .addParameters({ component: Table })
  .add('01. default', () => {
    return (
      <Table list={list}>
        {tableList => (
          <Table.Content>
            <Table.Header>
              <Table.HeaderRow>
                <Table.HeaderCell width="25%">Name</Table.HeaderCell>
                <Table.HeaderCell width="25%" isGroupEnd>
                  Stars
                </Table.HeaderCell>
                {/* <Table.HeaderCell width="25%" isGroupEnd>
                  Laser
                </Table.HeaderCell> */}
                <Table.HeaderCell width="25%">Count</Table.HeaderCell>
              </Table.HeaderRow>
            </Table.Header>

            <Table.Body>
              {tableList.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell width="25%">{item.name}</Table.Cell>
                  <Table.Cell width="25%" isGroupEnd>
                    {item.stars}
                  </Table.Cell>
                  {/* <Table.Cell width="25%" isGroupEnd>
                    <Checkbox
                      asAtom
                      selection={
                        item.laser
                          ? Checkbox.SELECTION.selected
                          : Checkbox.SELECTION.unselected
                      }
                      onChange={() => {}}
                    />
                  </Table.Cell> */}
                  <Table.Cell width="25%">{item.count}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        )}
      </Table>
    );
  });
// .add('02. with sort', () => {
//   return (
//     <Table list={list}>
//       {tableList => (
//         <Table.Content>
//           <Table.Header>
//             <Table.HeaderRow>
//               <Table.HeaderSortCell
//                 width="25%"
//                 sortKey="name"
//                 sortFn={array =>
//                   array.sort((a, b) => a.name.localeCompare(b.name))
//                 }
//               >
//                 Name
//               </Table.HeaderSortCell>
//               <Table.HeaderCell width="25%" isGroupEnd>
//                 Stars
//               </Table.HeaderCell>
//               <Table.HeaderSortCell
//                 width="25%"
//                 sortKey="laser"
//                 isGroupEnd
//                 sortFn={array => array.sort((a, b) => a.laser - b.laser)}
//               >
//                 Laser
//               </Table.HeaderSortCell>
//               <Table.HeaderSortCell
//                 width="25%"
//                 sortKey="count"
//                 sortFn={array => array.sort((a, b) => a.count - b.count)}
//               >
//                 Count
//               </Table.HeaderSortCell>
//             </Table.HeaderRow>
//           </Table.Header>

//           <Table.Body>
//             {tableList.map(item => (
//               <Table.Row key={item.id}>
//                 <Table.Cell width="25%">{item.name}</Table.Cell>
//                 <Table.Cell width="25%" isGroupEnd>
//                   {item.stars}
//                 </Table.Cell>
//                 <Table.Cell width="25%" isGroupEnd>
//                   <Checkbox
//                     asAtom
//                     selection={
//                       item.laser
//                         ? Checkbox.SELECTION.selected
//                         : Checkbox.SELECTION.unselected
//                     }
//                     onChange={() => {}}
//                   />
//                 </Table.Cell>
//                 <Table.Cell width="25%">{item.count}</Table.Cell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table.Content>
//       )}
//     </Table>
//   );
// })
// .add('03. with select', () => {
//   return (
//     <Table list={list}>
//       {(tableList, selectedTableIdList) => (
//         <Table.Content>
//           <Table.Header>
//             <Table.HeaderRow>
//               <Table.HeaderCell width={Table.WIDTHS.Checkbox} noIndent />
//               <Table.HeaderCell width="25%">Name</Table.HeaderCell>
//               <Table.HeaderCell width="25%" isGroupEnd>
//                 Stars
//               </Table.HeaderCell>
//               <Table.HeaderCell width="25%" isGroupEnd>
//                 Laser
//               </Table.HeaderCell>
//               <Table.HeaderCell width="25%">Count</Table.HeaderCell>
//             </Table.HeaderRow>
//           </Table.Header>

//           <Table.Body>
//             {tableList.map(item => (
//               <Table.Row selectableId={item.id} key={item.id}>
//                 <Table.SelectCell width={Table.WIDTHS.Checkbox} noIndent />
//                 <Table.Cell width="25%">{item.name}</Table.Cell>
//                 <Table.Cell width="25%" isGroupEnd>
//                   {item.stars}
//                 </Table.Cell>
//                 <Table.Cell width="25%" isGroupEnd>
//                   <Checkbox
//                     asAtom
//                     selection={
//                       item.laser
//                         ? Checkbox.SELECTION.selected
//                         : Checkbox.SELECTION.unselected
//                     }
//                     onChange={() => {}}
//                   />
//                 </Table.Cell>
//                 <Table.Cell width="25%">{item.count}</Table.Cell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table.Content>
//       )}
//     </Table>
//   );
// })
// .add('04. with sort/select', () => {
//   return (
//     <Table list={list}>
//       {(tableList, selectedTableIdList) => (
//         <Table.Content>
//           <Table.Header>
//             <Table.HeaderRow>
//               <Table.HeaderSelectCell
//                 width={Table.WIDTHS.Checkbox}
//                 noIndent
//               />
//               <Table.HeaderSortCell
//                 width="25%"
//                 sortKey="name"
//                 sortFn={array =>
//                   array.sort((a, b) => a.name.localeCompare(b.name))
//                 }
//               >
//                 Name
//               </Table.HeaderSortCell>
//               <Table.HeaderCell width="25%" isGroupEnd>
//                 Stars
//               </Table.HeaderCell>
//               <Table.HeaderSortCell
//                 width="25%"
//                 sortKey="laser"
//                 isGroupEnd
//                 sortFn={array => array.sort((a, b) => a.laser - b.laser)}
//               >
//                 Laser
//               </Table.HeaderSortCell>
//               <Table.HeaderSortCell
//                 width="25%"
//                 sortKey="count"
//                 sortFn={array => array.sort((a, b) => a.count - b.count)}
//               >
//                 Count
//               </Table.HeaderSortCell>
//             </Table.HeaderRow>
//           </Table.Header>

//           <Table.Body>
//             {tableList.map(item => (
//               <Table.Row selectableId={item.id} key={item.id}>
//                 <Table.SelectCell width={Table.WIDTHS.Checkbox} noIndent />
//                 <Table.Cell width="25%">{item.name}</Table.Cell>
//                 <Table.Cell width="25%" isGroupEnd>
//                   {item.stars}
//                 </Table.Cell>
//                 <Table.Cell width="25%" isGroupEnd>
//                   <Checkbox
//                     asAtom
//                     selection={
//                       item.laser
//                         ? Checkbox.SELECTION.selected
//                         : Checkbox.SELECTION.unselected
//                     }
//                     onChange={() => {}}
//                   />
//                 </Table.Cell>
//                 <Table.Cell width="25%">{item.count}</Table.Cell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table.Content>
//       )}
//     </Table>
//   );
// })
// .add('05. with onClick', () => {
//   return (
//     <Table list={list}>
//       {tableList => (
//         <Table.Content>
//           <Table.Header>
//             <Table.HeaderRow>
//               <Table.HeaderCell width="25%">Name</Table.HeaderCell>
//               <Table.HeaderCell width="25%" isGroupEnd>
//                 Stars
//               </Table.HeaderCell>
//               <Table.HeaderCell width="25%" isGroupEnd>
//                 Laser
//               </Table.HeaderCell>
//               <Table.HeaderCell width="25%">Count</Table.HeaderCell>
//             </Table.HeaderRow>
//           </Table.Header>

//           <Table.Body>
//             {tableList.map(item => (
//               <Table.Row key={item.id} onClick={event => console.log(event)}>
//                 <Table.Cell width="25%">{item.name}</Table.Cell>
//                 <Table.Cell width="25%" isGroupEnd>
//                   {item.stars}
//                 </Table.Cell>
//                 <Table.Cell width="25%" isGroupEnd>
//                   <Checkbox
//                     asAtom
//                     selection={
//                       item.laser
//                         ? Checkbox.SELECTION.selected
//                         : Checkbox.SELECTION.unselected
//                     }
//                     onChange={() => {}}
//                   />
//                 </Table.Cell>
//                 <Table.Cell width="25%">{item.count}</Table.Cell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table.Content>
//       )}
//     </Table>
//   );
// })
// .add('06. with fixed header', () => {
//   return (
//     <div style={{ height: text('container height', '300px') }}>
//       <Table list={list}>
//         {tableList => (
//           <Table.Content>
//             <Table.Header>
//               <Table.HeaderRow>
//                 <Table.HeaderCell width="25%">Name</Table.HeaderCell>
//                 <Table.HeaderCell width="25%" isGroupEnd>
//                   Stars
//                 </Table.HeaderCell>
//                 <Table.HeaderCell width="25%" isGroupEnd>
//                   Laser
//                 </Table.HeaderCell>
//                 <Table.HeaderCell width="25%">Count</Table.HeaderCell>
//               </Table.HeaderRow>
//             </Table.Header>

//             <Table.Body>
//               {tableList.map(item => (
//                 <Table.Row key={item.id}>
//                   <Table.Cell width="25%">{item.name}</Table.Cell>
//                   <Table.Cell width="25%" isGroupEnd>
//                     {item.stars}
//                   </Table.Cell>
//                   <Table.Cell width="25%" isGroupEnd>
//                     <Checkbox
//                       asAtom
//                       selection={
//                         item.laser
//                           ? Checkbox.SELECTION.selected
//                           : Checkbox.SELECTION.unselected
//                       }
//                       onChange={() => {}}
//                     />
//                   </Table.Cell>
//                   <Table.Cell width="25%">{item.count}</Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table.Content>
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
//           <Table.Content>
//             <Table.Header>
//               <Table.HeaderRow>
//                 <Table.HeaderCell width="25%" noIndent>
//                   Name
//                 </Table.HeaderCell>
//                 <Table.HeaderCell width="25%" isGroupEnd>
//                   Stars
//                 </Table.HeaderCell>
//                 <Table.HeaderCell width="25%" isGroupEnd>
//                   Laser
//                 </Table.HeaderCell>
//                 <Table.HeaderCell width="25%">Count</Table.HeaderCell>
//               </Table.HeaderRow>
//             </Table.Header>

//             <Table.Body>
//               {tableList.map(item => (
//                 <Table.Row key={item.id}>
//                   <Table.Cell width="25%" noIndent>
//                     {item.name}
//                   </Table.Cell>
//                   <Table.Cell width="25%" isGroupEnd>
//                     {item.stars}
//                   </Table.Cell>
//                   <Table.Cell width="25%" isGroupEnd>
//                     <Checkbox
//                       asAtom
//                       selection={
//                         item.laser
//                           ? Checkbox.SELECTION.selected
//                           : Checkbox.SELECTION.unselected
//                       }
//                       onChange={() => {}}
//                     />
//                   </Table.Cell>
//                   <Table.Cell width="25%">{item.count}</Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table.Content>
//         )}
//       </Table>
//     </>
//   );
// });
