import { getParentItem } from '@table-library/react-table-library/common/util/tree/getParentItem';

const createPanel = ({ panel, condition }) => (
  { item, ...props },
  data
) => {
  const parentItem = getParentItem(data, item.id);

  return condition(item, props, parentItem)
    ? panel(item, props, parentItem)
    : null;
};

export { createPanel };
