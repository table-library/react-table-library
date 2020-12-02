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
} from '@table';

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
      <Table list={list} layout={['25%', '25%', '25%', '25%']} resize>
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
                  <Cell>{item.name}</Cell>
                  <Cell>{item.stars}</Cell>
                  <Cell>{item.light.toString()}</Cell>
                  <Cell>{item.count}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    );
  });

// .add('03. with select', () => {
//   return (
//     <Table list={list}>
//       {(tableList, selectedTableIdList) => (
//         <>
//           <Header>
//             <HeaderRow>
//               <HeaderCell width={WIDTHS.Checkbox} noIndent />
//               <HeaderCell width="25%">Name</HeaderCell>
//               <HeaderCell width="25%" >
//                 Stars
//               </HeaderCell>
//               <HeaderCell width="25%" >
//                 Light
//               </HeaderCell>
//               <HeaderCell width="25%">Count</HeaderCell>
//             </HeaderRow>
//           </Header>

//           <Body>
//             {tableList.map(item => (
//               <Row selectableId={item.id} key={item.id}>
//                 <SelectCell width={WIDTHS.Checkbox} noIndent />
//                 <Cell width="25%">{item.name}</Cell>
//                 <Cell width="25%" >
//                   {item.stars}
//                 </Cell>
//                 <Cell width="25%" >
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
//                 <Cell width="25%">{item.count}</Cell>
//               </Row>
//             ))}
//           </Body>
//         <>
//       )}
//     </Table>
//   );
// })
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
//                 width="25%"
//                 sortKey="name"
//                 sortFn={array =>
//                   array.sort((a, b) => a.name.localeCompare(b.name))
//                 }
//               >
//                 Name
//               </HeaderSortCell>
//               <HeaderCell width="25%" >
//                 Stars
//               </HeaderCell>
//               <HeaderSortCell
//                 width="25%"
//                 sortKey="light"
//
//                 sortFn={array => array.sort((a, b) => a.light - b.light)}
//               >
//                 Light
//               </HeaderSortCell>
//               <HeaderSortCell
//                 width="25%"
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
//                 <Cell width="25%">{item.name}</Cell>
//                 <Cell width="25%" >
//                   {item.stars}
//                 </Cell>
//                 <Cell width="25%" >
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
//                 <Cell width="25%">{item.count}</Cell>
//               </Row>
//             ))}
//           </Body>
//         <>
//       )}
//     </Table>
//   );
// })
// .add('05. with onClick', () => {
//   return (
//     <Table list={list}>
//       {tableList => (
//         <>
//           <Header>
//             <HeaderRow>
//               <HeaderCell width="25%">Name</HeaderCell>
//               <HeaderCell width="25%" >
//                 Stars
//               </HeaderCell>
//               <HeaderCell width="25%" >
//                 Light
//               </HeaderCell>
//               <HeaderCell width="25%">Count</HeaderCell>
//             </HeaderRow>
//           </Header>

//           <Body>
//             {tableList.map(item => (
//               <Row key={item.id} onClick={event => console.log(event)}>
//                 <Cell width="25%">{item.name}</Cell>
//                 <Cell width="25%" >
//                   {item.stars}
//                 </Cell>
//                 <Cell width="25%" >
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
//                 <Cell width="25%">{item.count}</Cell>
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
//                 <HeaderCell width="25%">Name</HeaderCell>
//                 <HeaderCell width="25%" >
//                   Stars
//                 </HeaderCell>
//                 <HeaderCell width="25%" >
//                   Light
//                 </HeaderCell>
//                 <HeaderCell width="25%">Count</HeaderCell>
//               </HeaderRow>
//             </Header>

//             <Body>
//               {tableList.map(item => (
//                 <Row key={item.id}>
//                   <Cell width="25%">{item.name}</Cell>
//                   <Cell width="25%" >
//                     {item.stars}
//                   </Cell>
//                   <Cell width="25%" >
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
//                   <Cell width="25%">{item.count}</Cell>
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
//                 <HeaderCell width="25%" noIndent>
//                   Name
//                 </HeaderCell>
//                 <HeaderCell width="25%" >
//                   Stars
//                 </HeaderCell>
//                 <HeaderCell width="25%" >
//                   Light
//                 </HeaderCell>
//                 <HeaderCell width="25%">Count</HeaderCell>
//               </HeaderRow>
//             </Header>

//             <Body>
//               {tableList.map(item => (
//                 <Row key={item.id}>
//                   <Cell width="25%" noIndent>
//                     {item.name}
//                   </Cell>
//                   <Cell width="25%" >
//                     {item.stars}
//                   </Cell>
//                   <Cell width="25%" >
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
//                   <Cell width="25%">{item.count}</Cell>
//                 </Row>
//               ))}
//             </Body>
//           <>
//         )}
//       </Table>
//     </>
//   );
// });
