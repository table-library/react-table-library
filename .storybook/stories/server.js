import { findNodeById } from '@common/util/tree';

import { nodes as NODES } from './data';

const TIMEOUT = 500;

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
          ...getPaginatedNodes(value.nodes, 0, nextOffset) // offset 0, because we want to this for nested search
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
  offset,
  limit,
  searchText = '',
  filters = []
}) =>
  new Promise(resolve => {
    let nodes = [...NODES];

    console.log({ id, offset, limit, searchText });

    const isSearch = !!searchText;
    const isFilter = !!filters.length;
    const isLookup = isSearch || isFilter;

    const searchFn = isSearch
      ? value =>
          value.name.toLowerCase().includes(searchText.toLowerCase())
      : () => true;

    const filterFn = isFilter
      ? value => filters.includes(value.type)
      : () => true;

    const lookupNodes = id ? findNodeById(nodes, id).nodes : nodes;

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
      nodes: isLookup
        ? paginatedNodes
        : getShallowNodes(paginatedNodes),
      pageInfo: paginatedPageInfo
    };

    console.log(result);

    setTimeout(() => resolve(result), TIMEOUT);
  });

export { getSimple, getAdvanced };
