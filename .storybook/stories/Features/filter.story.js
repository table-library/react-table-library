/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  useCustom,
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { nodes } from '../data';

storiesOf('Features/Filter', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const [filters, setFilters] = React.useState(['SETUP', 'LEARN']);

    const handleFilter = (filter) => {
      filters.includes(filter)
        ? setFilters(filters.filter((value) => value !== filter))
        : setFilters(filters.concat(filter));
    };

    const data = {
      nodes: nodes.filter(
        (item) =>
          (filters.includes('SETUP') && item.type === 'SETUP') ||
          (filters.includes('LEARN') && item.type === 'LEARN')
      ),
    };

    return (
      <>
        <div>
          <label htmlFor="setup">
            Include SETUP:
            <input
              id="setup"
              type="checkbox"
              checked={filters.includes('SETUP')}
              onChange={() => handleFilter('SETUP')}
            />
          </label>
        </div>

        <div>
          <label htmlFor="learn">
            Include LEARN:
            <input
              id="learn"
              type="checkbox"
              checked={filters.includes('LEARN')}
              onChange={() => handleFilter('LEARN')}
            />
          </label>
        </div>

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
  })
  .add('with callback', () => {
    const [filters, setFilters] = React.useState(['SETUP', 'LEARN']);

    const handleFilter = (filter) => {
      filters.includes(filter)
        ? setFilters(filters.filter((value) => value !== filter))
        : setFilters(filters.concat(filter));
    };

    const data = {
      nodes: nodes.filter(
        (item) =>
          (filters.includes('SETUP') && item.type === 'SETUP') ||
          (filters.includes('LEARN') && item.type === 'LEARN')
      ),
    };

    useCustom('filters', data, {
      state: { filters },
      onChange: onFiltersChange,
    });

    function onFiltersChange(action, state) {
      console.log(action, state);
    }

    return (
      <>
        <div>
          <label htmlFor="setup">
            Include SETUP:
            <input
              id="setup"
              type="checkbox"
              checked={filters.includes('SETUP')}
              onChange={() => handleFilter('SETUP')}
            />
          </label>
        </div>

        <div>
          <label htmlFor="learn">
            Include LEARN:
            <input
              id="learn"
              type="checkbox"
              checked={filters.includes('LEARN')}
              onChange={() => handleFilter('LEARN')}
            />
          </label>
        </div>

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
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.robinwieruch.de/react-table-filter"
        >
          Tutorial
        </a>
      </li>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
