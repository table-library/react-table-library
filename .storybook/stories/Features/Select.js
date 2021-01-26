/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from '@material-ui/core/Checkbox';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell
} from '@table-library/react-table-library/lib/table';

import {
  HeaderCellSelect,
  CellSelect,
  useSelectRow,
  SELECT_TYPES,
  useSelect
} from '@table-library/react-table-library/lib/select';

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

storiesOf('01. Features/06. Select', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const data = { nodes: list };

    const [selectState, selectFns, selectTableProps] = useSelect({
      data,
      onChange: onSelectChange
    });

    function onSelectChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} {...selectTableProps}>
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
                <Row item={item} key={item.id}>
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
  });
// .add('default select', () => {
// const data = { nodes: list };

//   const defaultSelect = {
//     ids: ['2', '4']
//   };

//   return (
//     <Table data={data} defaultSelect={defaultSelect}>
//       {tableList => (
//         <>
//           <Header>
//             <HeaderRow>
//               <HeaderCell>Name</HeaderCell>
//               <HeaderCell>Stars</HeaderCell>
//               <HeaderCell>Light</HeaderCell>
//               <HeaderCell>Count</HeaderCell>
//             </HeaderRow>
//           </Header>

//           <Body>
//             {tableList.map(item => (
//               <Row
//                 item={item}
//                 key={item.id}
//                 plugins={[{ plugin: useSelectRow }]}
//               >
//                 {tableItem => (
//                   <>
//                     <Cell>{tableItem.name}</Cell>
//                     <Cell>{tableItem.stars}</Cell>
//                     <Cell>{tableItem.light.toString()}</Cell>
//                     <Cell>{tableItem.count}</Cell>
//                   </>
//                 )}
//               </Row>
//             ))}
//           </Body>
//         </>
//       )}
//     </Table>
//   );
// })
// .add('checkbox', () => {
// const data = { nodes: list };

//   return (
//     <Table data={data}>
//       {tableList => (
//         <>
//           <Header>
//             <HeaderRow>
//               <HeaderCellSelect />
//               <HeaderCell>Name</HeaderCell>
//               <HeaderCell>Stars</HeaderCell>
//               <HeaderCell>Light</HeaderCell>
//               <HeaderCell>Count</HeaderCell>
//             </HeaderRow>
//           </Header>

//           <Body>
//             {tableList.map(item => (
//               <Row
//                 key={item.id}
//                 item={item}
//                 plugins={[{ plugin: useSelectRow }]}
//               >
//                 {tableItem => (
//                   <React.Fragment key={tableItem.id}>
//                     <CellSelect item={tableItem} />
//                     <Cell>{tableItem.name}</Cell>
//                     <Cell>{tableItem.stars}</Cell>
//                     <Cell>{tableItem.light.toString()}</Cell>
//                     <Cell>{tableItem.count}</Cell>
//                   </React.Fragment>
//                 )}
//               </Row>
//             ))}
//           </Body>
//         </>
//       )}
//     </Table>
//   );
// })
// .add('select on checkbox ', () => {
// const data = { nodes: list };

//   return (
//     <Table data={data}>
//       {tableList => (
//         <>
//           <Header>
//             <HeaderRow>
//               <HeaderCellSelect />
//               <HeaderCell>Name</HeaderCell>
//               <HeaderCell>Stars</HeaderCell>
//               <HeaderCell>Light</HeaderCell>
//               <HeaderCell>Count</HeaderCell>
//             </HeaderRow>
//           </Header>

//           <Body>
//             {tableList.map(item => (
//               <Row
//                 key={item.id}
//                 item={item}
//                 plugins={[
//                   {
//                     plugin: useSelectRow,
//                     options: {
//                       selectType: SELECT_TYPES.ButtonClick
//                     }
//                   }
//                 ]}
//               >
//                 {tableItem => (
//                   <React.Fragment key={tableItem.id}>
//                     <CellSelect item={tableItem} />
//                     <Cell>{tableItem.name}</Cell>
//                     <Cell>{tableItem.stars}</Cell>
//                     <Cell>{tableItem.light.toString()}</Cell>
//                     <Cell>{tableItem.count}</Cell>
//                   </React.Fragment>
//                 )}
//               </Row>
//             ))}
//           </Body>
//         </>
//       )}
//     </Table>
//   );
// })
// .add('custom checkbox (Material UI)', () => {
// const data = { nodes: list };

//   return (
//     <Table data={data}>
//       {tableList => (
//         <>
//           <Header>
//             <HeaderRow>
//               <HeaderCellSelect>
//                 {({ selectState, onToggleAll }) => (
//                   <Checkbox
//                     size="small"
//                     checked={selectState.all}
//                     indeterminate={
//                       !selectState.all && !selectState.none
//                     }
//                     onChange={onToggleAll}
//                   />
//                 )}
//               </HeaderCellSelect>
//               <HeaderCell>Name</HeaderCell>
//               <HeaderCell>Stars</HeaderCell>
//               <HeaderCell>Light</HeaderCell>
//               <HeaderCell>Count</HeaderCell>
//             </HeaderRow>
//           </Header>

//           <Body>
//             {tableList.map(item => (
//               <Row
//                 key={item.id}
//                 item={item}
//                 plugins={[{ plugin: useSelectRow }]}
//               >
//                 {tableItem => (
//                   <React.Fragment key={tableItem.id}>
//                     <CellSelect item={tableItem}>
//                       {({ selectState, onToggleById }) => (
//                         <Checkbox
//                           size="small"
//                           checked={selectState.ids.includes(
//                             tableItem.id
//                           )}
//                           onChange={() =>
//                             onToggleById(tableItem.id)
//                           }
//                         />
//                       )}
//                     </CellSelect>
//                     <Cell>{tableItem.name}</Cell>
//                     <Cell>{tableItem.stars}</Cell>
//                     <Cell>{tableItem.light.toString()}</Cell>
//                     <Cell>{tableItem.count}</Cell>
//                   </React.Fragment>
//                 )}
//               </Row>
//             ))}
//           </Body>
//         </>
//       )}
//     </Table>
//   );
// });
