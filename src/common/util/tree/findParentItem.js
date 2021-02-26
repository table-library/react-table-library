export const findParentItem = (data, id) =>
  data.nodes.reduce((acc, value) => {
    if (acc) return acc;

    if (value.nodes?.map((node) => node.id).includes(id)) {
      return value;
    }

    if (value.nodes) {
      return findParentItem(value, id);
    }

    return acc;
  }, null);
