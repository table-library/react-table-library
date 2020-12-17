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
  useTreeRow,
  CellTree
} from '@table-library/react-table-library/lib/tree';

import {
  useExpandRow,
  EXPAND_TYPES
} from '@table-library/react-table-library/lib/expand';

import { useFetch } from '@table-library/react-table-library/lib/fetch';

import { get as getSimpleStree } from '../server/tree/simple';
import { get as getIterativeTree } from '../server/tree/iterative';
import {
  getFolders,
  getFilesByFolder
} from '../server/tree/directory';
import { getPaginatedFilesByFolder } from '../server/tree/pagination';
import { get as getPaginatedTree } from '../server/tree/pagination';

const findParentItem = (tree, id) =>
  tree.reduce((acc, value) => {
    if (acc) return acc;

    if (value.nodes?.map(node => node.id).includes(id)) {
      acc = value;
    } else if (value.nodes) {
      acc = findParentItem(value.nodes, id);
    }

    return acc;
  }, null);

const findItemById = (tree, id) =>
  tree.reduce((acc, value) => {
    if (acc) return acc;

    if (value.id === id) {
      acc = value;
    } else if (value.nodes) {
      acc = findItemById(value.nodes, id);
    }

    return acc;
  }, null);

const needsToFetch = (tree, id) => {
  const item = findItemById(tree, id);

  return (
    item &&
    item.nodes &&
    item.hasContent &&
    !item.nodes.filter(node => !node.nodes).length
  );
};

const needsToFetchPaginated = (tree, id) => {
  const item = findItemById(tree, id);

  return item && item.nodes && !item.nodes.length && item.hasContent;
};

storiesOf('06. Server/ 05. Tree', module)
  .addParameters({ component: Table })
  .add('default', () => {
    const [list, setList] = React.useState([]);

    const doGet = React.useCallback(async params => {
      setList(await getSimpleStree(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

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
                  plugins={[{ plugin: useTreeRow }]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
  .add('fetch iterative', () => {
    const [list, setList] = React.useState([]);

    const doGet = React.useCallback(async params => {
      setList(await getIterativeTree(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    const doGetMore = React.useCallback(
      async params => {
        if (!needsToFetch(list, params.id)) return;

        const nestedList = await getIterativeTree(params);

        const insert = item => {
          if (item.id === params.id) {
            return { ...item, nodes: [...item.nodes, ...nestedList] };
          } else if (item.nodes) {
            return { ...item, nodes: item.nodes.map(insert) };
          } else {
            return item;
          }
        };

        setList(list.map(insert));
      },
      [list]
    );

    const handleTableStateChange = React.useCallback(
      (type, tableState, action) => {
        console.log(type, tableState, action);

        const SERVER_SIDE_OPERATIONS = ['tree'];

        let params = {};

        if (action?.type === 'ADD_TREE_EXPAND_BY_ID') {
          params = {
            ...params,
            id: action.payload.id
          };
        }

        if (SERVER_SIDE_OPERATIONS.includes(type)) {
          doGetMore(params);
        }
      },
      [doGetMore]
    );

    return (
      <Table list={list} onTableStateChange={handleTableStateChange}>
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
                  plugins={[{ plugin: useTreeRow }]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
  .add('fetch iterative (loading)', () => {
    const [list, setList] = React.useState([]);

    const doGet = React.useCallback(async params => {
      setList(await getIterativeTree(params));
    }, []);

    React.useEffect(() => {
      doGet({});
    }, [doGet]);

    const doGetMore = React.useCallback(
      async (params, expand) => {
        if (!needsToFetch(list, params.id)) return;

        params.id && expand.onAddExpandById(params.id);

        const nestedList = await getIterativeTree(params);

        const insert = item => {
          if (item.id === params.id) {
            return { ...item, nodes: [...item.nodes, ...nestedList] };
          } else if (item.nodes) {
            return { ...item, nodes: item.nodes.map(insert) };
          } else {
            return item;
          }
        };

        params.id && expand.onRemoveExpandById(params.id);

        setList(list.map(insert));
      },
      [list]
    );

    const handleTableStateChange = React.useCallback(
      (type, tableState, action) => {
        console.log(type, tableState, action);

        const SERVER_SIDE_OPERATIONS = ['tree'];

        let params = {};

        if (action?.type === 'ADD_TREE_EXPAND_BY_ID') {
          params = {
            ...params,
            id: action.payload.id
          };
        }

        if (SERVER_SIDE_OPERATIONS.includes(type)) {
          doGetMore(params, tableState.expand);
        }
      },
      [doGetMore]
    );

    return (
      <Table list={list} onTableStateChange={handleTableStateChange}>
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
                  plugins={[
                    { plugin: useTreeRow },
                    {
                      plugin: useExpandRow,
                      options: {
                        expandType: EXPAND_TYPES.NoClick,
                        expansionPanel: () => (
                          <div
                            style={{
                              background: 'grey'
                            }}
                          >
                            Loading ...
                          </div>
                        )
                      }
                    }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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
  .add('fetch iterative (paginated)', () => {
    const [data, setData] = React.useState({
      nodes: [],
      pageInfo: null
    });

    const doGet = React.useCallback(async params => {
      const { nodes, pageInfo } = await getPaginatedTree(params);

      setData(state => ({
        pageInfo,
        nodes: [...state.nodes, ...nodes]
      }));
    }, []);

    React.useEffect(() => {
      doGet({
        offset: 0,
        limit: 3
      });
    }, [doGet]);

    const doGetMore = React.useCallback(
      async (params, expand) => {
        if (!needsToFetchPaginated(data.nodes, params.id)) return;

        params.id && expand.onAddExpandById(params.id);

        const { nodes, pageInfo } = await getPaginatedTree(params);

        const insert = item => {
          if (item.id === params.id) {
            return {
              ...item,
              nodes: [...item.nodes, ...nodes],
              pageInfo
            };
          } else if (item.nodes) {
            return { ...item, nodes: item.nodes.map(insert) };
          } else {
            return item;
          }
        };

        params.id && expand.onRemoveExpandById(params.id);

        setData(state => ({
          pageInfo: state.pageInfo,
          nodes: state.nodes.map(insert)
        }));
      },
      [data]
    );

    const handleTableStateChange = React.useCallback(
      (type, tableState, action) => {
        console.log(type, tableState, action);

        const SERVER_SIDE_OPERATIONS = ['tree'];

        let params = {};

        if (action?.type === 'ADD_TREE_EXPAND_BY_ID') {
          params = {
            ...params,
            id: action.payload.id,
            offset: 0,
            limit: 1
          };
        }

        if (SERVER_SIDE_OPERATIONS.includes(type)) {
          doGetMore(params, tableState.expand);
        }
      },
      [doGetMore]
    );

    const handleLoadMore = React.useCallback(
      async (tableItem, tablestate) => {
        console.log(tableItem, tablestate);

        let params = {
          ...params,
          offset: data.pageInfo.nextOffset, // get right pageInfo from tree
          limit: 2
        };

        return doGet(params);
      },
      [data]
    );

    const LoadingPanel = () => <div>Loading ...</div>;

    const IdlePanel = () => (
      <button onClick={handleLoadMore}>More ...</button>
    );

    return (
      <Table
        list={data.nodes}
        onTableStateChange={handleTableStateChange}
      >
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
                  plugins={[
                    { plugin: useTreeRow },
                    {
                      plugin: useExpandRow,
                      options: {
                        expandType: EXPAND_TYPES.NoClick,
                        expansionPanel: LoadingPanel
                      }
                    },
                    {
                      plugin: useFetch,
                      options: {
                        showCondition: tableItem =>
                          data.pageInfo.nextOffset <
                          data.pageInfo.total,
                        idlePanel: IdlePanel,
                        loadingPanel: LoadingPanel
                      }
                    }
                  ]}
                >
                  {tableItem => (
                    <React.Fragment key={tableItem.id}>
                      <CellTree item={tableItem}>
                        {tableItem.name}
                      </CellTree>
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

// .add('fetch folders once and files iterative', () => {
//   const [list, setList] = React.useState([]);

//   const doGetTopLevel = React.useCallback(async () => {
//     const folders = await getFolders();
//     const files = await getFilesByFolder({});

//     setList([...folders, ...files]);
//   }, []);

//   React.useEffect(() => {
//     doGetTopLevel();
//   }, [doGetTopLevel]);

//   const doGetByFolder = React.useCallback(
//     async (params, expand) => {
//       if (!needsToFetch(list, params.id)) return;

//       params.id && expand.onAddExpandById(params.id);

//       const nestedList = await getFilesByFolder(params);

//       const insert = item => {
//         if (item.id === params.id) {
//           return { ...item, nodes: [...item.nodes, ...nestedList] };
//         } else if (item.nodes) {
//           return { ...item, nodes: item.nodes.map(insert) };
//         } else {
//           return item;
//         }
//       };

//       params.id && expand.onRemoveExpandById(params.id);

//       setList(list.map(insert));
//     },
//     [list]
//   );

//   const handleTableStateChange = React.useCallback(
//     (type, tableState, action) => {
//       console.log(type, tableState, action);

//       const SERVER_SIDE_OPERATIONS = ['tree'];

//       let params = {};

//       if (action?.type === 'ADD_TREE_EXPAND_BY_ID') {
//         params = {
//           ...params,
//           id: action.payload.id
//         };
//       }

//       if (SERVER_SIDE_OPERATIONS.includes(type)) {
//         doGetByFolder(params, tableState.expand);
//       }
//     },
//     [doGetByFolder]
//   );

//   return (
//     <Table list={list} onTableStateChange={handleTableStateChange}>
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
//                   { plugin: useTreeRow },
//                   {
//                     plugin: useExpandRow,
//                     options: {
//                       expandType: EXPAND_TYPES.NoClick,
//                       expansionPanel: () => (
//                         <div
//                           style={{
//                             background: 'grey'
//                           }}
//                         >
//                           Loading ...
//                         </div>
//                       )
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
// .add('fetch folders once and paginated files iterative', () => {
//   const [data, setData] = React.useState({
//     nodes: [],
//     pageInfo: null
//   });
//   // const [loadExpand, setLoadExpand] = React.useState([]);

//   const doGetTopLevel = React.useCallback(async (offset, limit) => {
//     const folders = await getFolders();
//     const files = await getPaginatedFilesByFolder({
//       offset,
//       limit
//     });

//     setData({
//       nodes: [...folders, ...files.nodes],
//       pageInfo: files.pageInfo
//     });
//   }, []);

//   // const doGetMore = React.useCallback(async () => {

//   // }, [])

//   React.useEffect(() => {
//     doGetTopLevel(0, 1);
//   }, [doGetTopLevel]);

//   const doGetByFolder = React.useCallback(
//     async (params, expand) => {
//       if (!needsToFetch(data.nodes, params.id)) return;

//       params.id && expand.onAddExpandById(params.id);

//       const { nodes, pageInfo } = await getPaginatedFilesByFolder(
//         params
//       );

//       const insert = item => {
//         if (item.id === params.id) {
//           return {
//             ...item,
//             nodes: [...item.nodes, ...nodes],
//             pageInfo
//           };
//         } else if (item.nodes) {
//           return { ...item, nodes: item.nodes.map(insert) };
//         } else {
//           return item;
//         }
//       };

//       params.id && expand.onRemoveExpandById(params.id);

//       setData(state => ({
//         pageInfo: state.pageInfo,
//         nodes: state.nodes.map(insert)
//       }));
//     },
//     [data]
//   );

//   const handleTableStateChange = React.useCallback(
//     (type, tableState, action) => {
//       console.log(type, tableState, action);

//       const SERVER_SIDE_OPERATIONS = ['tree'];

//       let params = {};

//       if (action?.type === 'ADD_TREE_EXPAND_BY_ID') {
//         params = {
//           ...params,
//           id: action.payload.id,
//           offset: 0,
//           limit: 1
//         };
//       }

//       if (SERVER_SIDE_OPERATIONS.includes(type)) {
//         doGetByFolder(params, tableState.expand);
//       }
//     },
//     [doGetByFolder]
//   );

//   return (
//     <Table
//       list={data.nodes}
//       // defaultExpand={{
//       //   ids: loadExpand
//       // }}
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
//                   { plugin: useTreeRow },
//                   {
//                     plugin: useExpandRow,
//                     options: {
//                       expandType: EXPAND_TYPES.NoClick,
//                       expansionPanel: tableItem => {
//                         const parentItem = findParentItem(
//                           data.nodes,
//                           tableItem.id
//                         );

//                         console.log(parentItem);

//                         // if (
//                         //   tableItem.pageInfo.includes(tableItem.id)
//                         // ) {
//                         //   return (
//                         //     <button
//                         //       type="button"
//                         //       onClick={() => {}}
//                         //     >
//                         //       Load More
//                         //     </button>
//                         //   );
//                         // }

//                         return (
//                           <div
//                             style={{
//                               background: 'grey'
//                             }}
//                           >
//                             Loading ...
//                           </div>
//                         );
//                       }
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
