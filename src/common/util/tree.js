export const findItemById = (nodes, id) =>
  nodes.reduce((acc, value) => {
    if (acc) return acc;

    if (value.id === id) {
      return value;
    }

    if (value.nodes) {
      return findItemById(value.nodes, id);
    }

    return acc;
  }, null);

export const findAllItems = nodes =>
  nodes.reduce((acc, value) => {
    // eslint-disable-next-line no-param-reassign
    acc = acc.concat(value);

    if (value.nodes) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(findAllItems(value.nodes));
    }

    return acc;
  }, []);

export const findItemsById = (nodes, id) => {
  const item = findItemById(nodes, id);

  if (!item.nodes) {
    return [item];
  }

  return [item, ...findAllItems(item.nodes)];
};

export const isAll = (idsOne, idsTwo) => {
  return idsOne.every(id => idsTwo.includes(id));
};
