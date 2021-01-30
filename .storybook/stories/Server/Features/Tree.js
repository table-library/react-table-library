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

import {
  useTree,
  CellTree
} from '@table-library/react-table-library/lib/tree';

// import { useFetch } from '@table-library/react-table-library/lib/fetch';

import { findNodeById, recursiveMergeInsert } from '@common/util';

import { getData } from '../../server';

// const needsToFetch = (nodes, id) => {
//   const item = findNodeById(nodes, id);

//   return item && item.hasContent && item.nodes && !item.nodes.length;
// };

// const insertTree = (targetId, nodes) => state => {
//   if (!targetId) {
//     return nodes;
//   }

//   return state.map(recursiveMergeInsert(targetId, nodes));
// };

// const insertPaginatedTree = (targetId, nodes, pageInfo) => state => {
//   if (!targetId) {
//     return {
//       pageInfo,
//       nodes: [...state.nodes, ...nodes]
//     };
//   }

//   return {
//     pageInfo: state.pageInfo,
//     nodes: state.nodes.map(
//       recursiveMergeInsert(targetId, nodes, { pageInfo })
//     )
//   };
// };

storiesOf('07. Server/ 05. Tree (WIP)', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [data, setData] = React.useState({
      nodes: []
    });

    const doGet = React.useCallback(async params => {
      setData(await getData(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    // features

    const tree = useTree({
      data,
      onChange: onTreeChange
    });

    function onTreeChange(action, state) {
      console.log(action, state);
    }

    return (
      <Table data={data} tree={tree}>
        {tableList => (
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
              {tableList.map(item => (
                <Row key={item.id} item={item}>
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <Cell>{tableItem.name}</Cell>
                      <Cell>
                        {tableItem.deadline.toLocaleDateString(
                          'fr-CA',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          }
                        )}
                      </Cell>
                      <Cell>{tableItem.type}</Cell>
                      <Cell>{tableItem.isComplete.toString()}</Cell>
                      <Cell>{tableItem.nodes?.length}</Cell>
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
// .add('fetch iterative', () => {
//   const [tree, setList] = React.useState([]);

//   const doGet = React.useCallback(async params => {
//     const nodes = await getIterativeTree(params);

//     setList(insertTree(params.id, nodes));
//   }, []);

//   React.useEffect(() => {
//     doGet({});
//   }, [doGet]);

//   const handleTableStateChange = React.useCallback(
//     (type, tableState, action) => {
//       console.log(type, tableState, action);

//       const SERVER_SIDE_OPERATIONS = ['tree'];

//       let params = {};

//       if (type === 'tree' && action.type === 'ADD_BY_ID') {
//         params = {
//           id: action.payload.id
//         };
//       }

//       if (
//         SERVER_SIDE_OPERATIONS.includes(type) &&
//         needsToFetch(tableState.data.nodes, params.id)
//       ) {
//         doGet(params);
//       }
//     },
//     [doGet]
//   );

//   return (
//     <Table
//       data={{ nodes: tree }}
//       onTableStateChange={handleTableStateChange}
//     >
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
//                 key={item.id}
//                 item={item}
//                 plugins={[{ plugin: useTreeRow }]}
//               >
//                 {tableItem => (
//                   <React.Fragment key={tableItem.id}>
//                     <CellTree item={tableItem}>
//                       {tableItem.name}
//                     </CellTree>
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
// .add('fetch iterative (loading)', () => {
//   const [tree, setList] = React.useState([]);

//   const doGet = React.useCallback(async params => {
//     const nodes = await getIterativeTree(params);

//     setList(insertTree(params.id, nodes));
//   }, []);

//   React.useEffect(() => {
//     doGet({});
//   }, [doGet]);

//   const handleTableStateChange = React.useCallback(
//     (type, tableState, action) => {
//       console.log(type, tableState, action);

//       const SERVER_SIDE_OPERATIONS = ['tree'];

//       let params = {};

//       if (type === 'tree' && action.type === 'ADD_BY_ID') {
//         params = {
//           id: action.payload.id
//         };
//       }

//       if (
//         SERVER_SIDE_OPERATIONS.includes(type) &&
//         needsToFetch(tableState.data.nodes, params.id)
//       ) {
//         doGet(params);
//       }
//     },
//     [doGet]
//   );

//   const LoadingPanel = (tableItem, { treeXLevel, treeYLevel }) => (
//     <div style={{ marginLeft: `${8 + treeXLevel * 20}px` }}>
//       Loading ...
//     </div>
//   );

//   return (
//     <Table
//       data={{ nodes: tree }}
//       onTableStateChange={handleTableStateChange}
//     >
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
//                 key={item.id}
//                 item={item}
//                 plugins={[
//                   {
//                     plugin: useTreeRow,
//                     options: {
//                       panelShowCondition: tableItem =>
//                         tableItem.hasContent &&
//                         !tableItem.nodes.length,
//                       loadingPanel: LoadingPanel
//                     }
//                   }
//                 ]}
//               >
//                 {tableItem => (
//                   <React.Fragment key={tableItem.id}>
//                     <CellTree item={tableItem}>
//                       {tableItem.name}
//                     </CellTree>
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
// .add('fetch iterative (paginated)', () => {
//   const [data, setData] = React.useState({
//     nodes: [],
//     pageInfo: null
//   });

//   const doGet = React.useCallback(async params => {
//     const { nodes, pageInfo } = await getPaginatedTree(params);

//     setData(insertPaginatedTree(params.id, nodes, pageInfo));
//   }, []);

//   React.useEffect(() => {
//     doGet({
//       offset: 0,
//       limit: 2
//     });
//   }, [doGet]);

//   const handleTableStateChange = React.useCallback(
//     (type, tableState, action) => {
//       console.log(type, tableState, action);

//       const SERVER_SIDE_OPERATIONS = ['tree'];

//       let params = {};

//       if (type === 'tree' && action.type === 'ADD_BY_ID') {
//         params = {
//           id: action.payload.id,
//           offset: 0,
//           limit: 2
//         };
//       }

//       if (
//         SERVER_SIDE_OPERATIONS.includes(type) &&
//         needsToFetch(tableState.data.nodes, params.id)
//       ) {
//         doGet(params);
//       }
//     },
//     [doGet]
//   );

//   const handleLoadMore = React.useCallback(
//     async (tableState, tableItem) => {
//       console.log(tableState, tableItem);

//       let params = {
//         id: tableItem.id,
//         offset: tableItem.pageInfo.nextOffset,
//         limit: 2
//       };

//       return doGet(params);
//     },
//     []
//   );

//   const LoadingPanel = (tableItem, { treeXLevel, treeYLevel }) => (
//     <div style={{ marginLeft: `${8 + treeXLevel * 20}px` }}>
//       Loading ...
//     </div>
//   );

//   const IdlePanel = (tableItem, { treeXLevel, treeYLevel }) => (
//     <button
//       style={{ marginLeft: `${8 + treeXLevel * 20}px` }}
//       onClick={handleLoadMore}
//     >
//       More ...
//     </button>
//   );

//   return (
//     <Table data={data} onTableStateChange={handleTableStateChange}>
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
//                 key={item.id}
//                 item={item}
//                 plugins={[
//                   {
//                     plugin: useTreeRow,
//                     options: {
//                       panelShowCondition: tableItem =>
//                         tableItem.hasContent &&
//                         !tableItem.nodes.length,
//                       loadingPanel: LoadingPanel
//                     }
//                   },
//                   {
//                     plugin: useFetch,
//                     options: {
//                       panelShowCondition: tableItem =>
//                         tableItem.pageInfo &&
//                         tableItem.pageInfo.nextOffset <
//                           tableItem.pageInfo.total,
//                       idlePanel: IdlePanel,
//                       loadingPanel: LoadingPanel
//                     }
//                   }
//                 ]}
//               >
//                 {tableItem => (
//                   <React.Fragment key={tableItem.id}>
//                     <CellTree item={tableItem}>
//                       {tableItem.name}
//                     </CellTree>
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
