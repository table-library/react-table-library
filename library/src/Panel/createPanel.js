const createPanel = ({ panel, condition }) => (
  { item, ...props },
  index
) => (condition(item) ? panel(item, props, index) : null);

export { createPanel };
