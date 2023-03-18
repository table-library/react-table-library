import * as React from 'react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { nodes } from '../../data';

const Component = () => {
  const data = { nodes };

  const escapeCsvCell = (cell) => {
    if (cell == null) {
      return '';
    }
    const sc = cell.toString().trim();
    if (sc === '' || sc === '""') {
      return sc;
    }
    if (sc.includes('"') || sc.includes(',') || sc.includes('\n') || sc.includes('\r')) {
      return '"' + sc.replace(/"/g, '""') + '"';
    }
    return sc;
  };

  const makeCsvData = (columns, data) => {
    return data.reduce((csvString, rowItem) => {
      return (
        csvString +
        columns.map(({ accessor }) => escapeCsvCell(accessor(rowItem))).join(',') +
        '\r\n'
      );
    }, columns.map(({ name }) => escapeCsvCell(name)).join(',') + '\r\n');
  };

  const downloadAsCsv = (columns, data, filename) => {
    const csvData = makeCsvData(columns, data);
    const csvFile = new Blob([csvData], { type: 'text/csv' });
    const downloadLink = document.createElement('a');

    downloadLink.display = 'none';
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDownloadCsv = () => {
    const columns = [
      { accessor: (item) => item.name, name: 'Task' },
      { accessor: (item) => item.deadline, name: 'Deadline' },
      { accessor: (item) => item.type, name: 'Type' },
      { accessor: (item) => item.isComplete, name: 'Complete' },
      { accessor: (item) => item.nodes?.length, name: 'Tasks' },
    ];

    downloadAsCsv(columns, data.nodes, 'table');
  };

  return (
    <>
      <button type="button" onClick={handleDownloadCsv}>
        Download as CSV
      </button>

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
    </>
  );
};

export default Component;
