export const fromNodesToList = (nodes) =>
  (nodes || []).reduce((acc, value) => {
    // eslint-disable-next-line no-param-reassign
    acc = acc.concat(value);

    if (value.nodes) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(fromNodesToList(value.nodes));
    }

    return acc;
  }, []);
