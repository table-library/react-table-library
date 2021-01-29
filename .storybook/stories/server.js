import { findNodeById } from '@common/util/tree';

import { nodes as NODES } from './data';

const TIMEOUT = 500;

const SORTS = {
  NONE: {
    label: 'None',
    sortKey: 'NONE',
    sortFn: array => array
  },
  TASK: {
    label: 'Task',
    sortKey: 'TASK',
    sortFn: array =>
      array.sort((a, b) => a.name.localeCompare(b.name))
  },
  DEADLINE: {
    label: 'Deadline',
    sortKey: 'DEADLINE',
    sortFn: array => array.sort((a, b) => a.deadline - b.deadline)
  },
  TYPE: {
    label: 'Type',
    sortKey: 'TYPE',
    sortFn: array =>
      array.sort((a, b) => a.type.localeCompare(b.type))
  },
  COMPLETE: {
    label: 'Complete',
    sortKey: 'COMPLETE',
    sortFn: array => array.sort((a, b) => a.isComplete - b.isComplete)
  },
  TASKS: {
    label: 'Tasks',
    sortKey: 'TASKS',
    sortFn: array =>
      array.sort(
        (a, b) => (a.nodes || []).length - (b.nodes || []).length
      )
  }
};

const sortNodes = (nodes, sort) => {
  const { sortKey, reverse } = sort;

  return reverse
    ? SORTS[sortKey].sortFn(nodes).reverse()
    : SORTS[sortKey].sortFn(nodes);
};

const findBySearch = (nodes, conditionFn, path = []) =>
  nodes.reduce((acc, value) => {
    const currentPath = [...path, value.id];

    if (conditionFn(value)) {
      acc = acc.concat(currentPath);
    }

    if (value.nodes) {
      acc = acc.concat(
        findBySearch(value.nodes, conditionFn, currentPath)
      );
    }

    return acc;
  }, []);

const createTree = (nodes, paths) =>
  nodes.reduce((acc, value) => {
    if (paths.includes(value.id)) {
      if (value.nodes) {
        return acc.concat({
          ...value,
          nodes: createTree(value.nodes, paths)
        });
      }

      if (!value.nodes) {
        return acc.concat(value);
      }
    }

    return acc;
  }, []);

const getSearchedNodes = (nodes, conditionFn) => {
  const allPaths = findBySearch(nodes, conditionFn);
  return createTree(nodes, allPaths);
};

const getPaginatedNodes = (nodes, offset, nextOffset) =>
  nodes.slice(offset, nextOffset).reduce(
    (acc, value) => {
      if (value.nodes) {
        acc.nodes = acc.nodes.concat({
          ...value,
          // offset 0, because we want to include it for nested search
          ...getPaginatedNodes(value.nodes, 0, nextOffset)
        });
      } else {
        acc.nodes = acc.nodes.concat(value);
      }

      return acc;
    },
    {
      nodes: [],
      pageInfo: {
        total: nodes.length,
        nextOffset
      }
    }
  );

const getShallowNodes = nodes =>
  nodes.map(value => {
    if (value.nodes) {
      return { ...value, nodes: [] };
    } else {
      return value;
    }
  });

const getSimple = () =>
  new Promise(resolve => {
    setTimeout(() => resolve([...NODES]), TIMEOUT);
  });

const getAdvanced = ({
  id,
  offset = 0,
  limit = 100,
  searchText = '',
  filters = [],
  sort = { sortKey: 'NONE', reverse: false },
  isShallow = false
}) =>
  new Promise(resolve => {
    let nodes = [...NODES];

    console.log({
      id,
      offset,
      limit,
      searchText,
      filters,
      sort,
      isShallow
    });

    const isSearch = !!searchText;
    const isFilter = !!filters.length;

    const searchFn = isSearch
      ? value =>
          value.name.toLowerCase().includes(searchText.toLowerCase())
      : () => true;

    const filterFn = isFilter
      ? value => filters.includes(value.type)
      : () => true;

    const sortedNodes = sortNodes(nodes, sort);

    const lookupNodes = id
      ? findNodeById(sortedNodes, id).nodes
      : sortedNodes;

    const searchedNodes = isSearch
      ? getSearchedNodes(lookupNodes, searchFn)
      : lookupNodes;

    const filteredNodes = isFilter
      ? getSearchedNodes(searchedNodes, filterFn)
      : searchedNodes;

    const {
      nodes: paginatedNodes,
      pageInfo: paginatedPageInfo
    } = getPaginatedNodes(filteredNodes, offset, offset + limit);

    const result = {
      nodes: isShallow
        ? getShallowNodes(paginatedNodes)
        : paginatedNodes,
      pageInfo: paginatedPageInfo
    };

    console.log(result);

    setTimeout(() => resolve(result), TIMEOUT);
  });

export { getSimple, getAdvanced };
