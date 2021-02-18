import * as React from "react";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/lib/table";

import {
  HeaderCellSelect,
  CellSelect,
  useSelect,
} from "@table-library/react-table-library/lib/select";

const nodes = [
  {
    id: "0",
    name: "Operating System",
    deadline: new Date(2020, 1, 15),
    type: "SETUP",
    isComplete: true,
    _hasContent: false,
    nodes: null,
  },
  {
    id: "1",
    name: "VSCode",
    deadline: new Date(2020, 1, 17),
    type: "SETUP",
    isComplete: true,
    _hasContent: false,
    nodes: [],
  },
  {
    id: "2",
    name: "JavaScript",
    deadline: new Date(2020, 2, 28),
    type: "LEARN",
    isComplete: true,
    _hasContent: true,
    nodes: [
      {
        id: "22",
        name: "Data Types",
        deadline: new Date(2020, 2, 20),
        type: "LEARN",
        isComplete: true,
        _hasContent: true,
        nodes: [
          {
            id: "221",
            name: "Strings",
            deadline: new Date(2020, 2, 18),
            type: "LEARN",
            isComplete: true,
            _hasContent: false,
            nodes: null,
          },
          {
            id: "222",
            name: "Numbers",
            deadline: new Date(2020, 2, 19),
            type: "LEARN",
            isComplete: true,
            _hasContent: false,
            nodes: null,
          },
        ],
      },
      {
        id: "23",
        name: "Objects",
        deadline: new Date(2020, 2, 22),
        type: "LEARN",
        isComplete: true,
        _hasContent: true,
        nodes: [
          {
            id: "231",
            name: "Object Methods",
            deadline: new Date(2020, 2, 20),
            type: "LEARN",
            isComplete: true,
            _hasContent: false,
            nodes: null,
          },
          {
            id: "232",
            name: "Garbage Collection",
            deadline: new Date(2020, 2, 21),
            type: "LEARN",
            isComplete: true,
            _hasContent: false,
            nodes: null,
          },
        ],
      },
      {
        id: "24",
        name: "Code Style",
        deadline: new Date(2020, 2, 23),
        type: "LEARN",
        isComplete: true,
        _hasContent: false,
        nodes: [],
      },
    ],
  },
  {
    id: "3",
    name: "React",
    deadline: new Date(2020, 3, 8),
    type: "LEARN",
    isComplete: false,
    _hasContent: true,
    nodes: [
      {
        id: "31",
        name: "Create React App",
        deadline: new Date(2020, 3, 1),
        type: "SETUP",
        isComplete: true,
        _hasContent: false,
        nodes: null,
      },
      {
        id: "32",
        name: "JSX",
        deadline: new Date(2020, 3, 1),
        type: "LEARN",
        isComplete: true,
        _hasContent: false,
        nodes: null,
      },
      {
        id: "33",
        name: "Components",
        deadline: new Date(2020, 4, 1),
        type: "LEARN",
        isComplete: false,
        _hasContent: false,
        nodes: [],
      },
      {
        id: "34",
        name: "Props",
        deadline: new Date(2020, 5, 1),
        type: "LEARN",
        isComplete: false,
        _hasContent: false,
        nodes: null,
      },
      {
        id: "35",
        name: "State",
        deadline: new Date(2020, 6, 1),
        type: "LEARN",
        isComplete: false,
        _hasContent: false,
        nodes: [
          {
            id: "351",
            name: "Remote State",
            deadline: new Date(2020, 7, 1),
            type: "LEARN",
            isComplete: true,
            _hasContent: false,
            nodes: [],
          },
          {
            id: "351",
            name: "Local State",
            deadline: new Date(2020, 7, 1),
            type: "LEARN",
            isComplete: false,
            _hasContent: false,
            nodes: [],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Git",
    deadline: new Date(2020, 4, 28),
    type: "SETUP",
    isComplete: false,
    _hasContent: false,
    nodes: [],
  },
  {
    id: "5",
    name: "Node",
    deadline: new Date(2020, 5, 18),
    type: "LEARN",
    isComplete: true,
    _hasContent: true,
    nodes: [
      {
        id: "51",
        name: "Express",
        deadline: new Date(2020, 5, 10),
        type: "LEARN",
        isComplete: false,
        _hasContent: false,
        nodes: null,
      },
    ],
  },
  {
    id: "6",
    name: "GraphQL",
    deadline: new Date(2020, 6, 30),
    type: "LEARN",
    isComplete: false,
    _hasContent: true,
    nodes: [
      {
        id: "61",
        name: "Queries and Mutations",
        deadline: new Date(2020, 6, 28),
        type: "LEARN",
        isComplete: false,
        _hasContent: true,
        nodes: [
          {
            id: "611",
            name: "Fields",
            deadline: new Date(2020, 6, 20),
            type: "LEARN",
            isComplete: false,
            _hasContent: false,
            nodes: null,
          },
          {
            id: "612",
            name: "Arguments",
            deadline: new Date(2020, 6, 21),
            type: "LEARN",
            isComplete: false,
            _hasContent: false,
            nodes: null,
          },
          {
            id: "613",
            name: "Aliases",
            deadline: new Date(2020, 6, 22),
            type: "LEARN",
            isComplete: false,
            _hasContent: false,
            nodes: null,
          },
          {
            id: "614",
            name: "Fragments",
            deadline: new Date(2020, 6, 23),
            type: "LEARN",
            isComplete: false,
            _hasContent: true,
            nodes: [
              {
                id: "6141",
                name: "Inline Fragments",
                deadline: new Date(2020, 6, 23),
                type: "LEARN",
                isComplete: false,
                _hasContent: false,
                nodes: null,
              },
            ],
          },
          {
            id: "615",
            name: "Variables",
            deadline: new Date(2020, 6, 24),
            type: "LEARN",
            isComplete: false,
            _hasContent: false,
            nodes: null,
          },
          {
            id: "616",
            name: "Directives",
            deadline: new Date(2020, 6, 25),
            type: "LEARN",
            isComplete: false,
            _hasContent: false,
            nodes: null,
          },
        ],
      },
    ],
  },
];

function App() {
  const data = { nodes };

  const select = useSelect({
    data,
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  return (
    <Table data={data} select={select}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              {/* <HeaderCellSelect /> */}
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
                {(tableItem) => (
                  <React.Fragment key={tableItem.id}>
                    {/* <CellSelect item={tableItem} /> */}
                    <Cell>{tableItem.name}</Cell>
                    <Cell>
                      {tableItem.deadline.toLocaleDateString("fr-CA", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
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
}

export default App;
