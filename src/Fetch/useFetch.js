import React from 'react';

const useFetch = ({
  tableState,
  item,
  lastRow,
  showCondition,
  idlePanel,
  loadingPanel,
  isFetching,
  onAddFetchById,
  onRemoveFetchById
}) => {
  const idlePanelElement = idlePanel(item);
  const loadingPanelElement = loadingPanel(item);

  const fetchPanel = {
    false: React.cloneElement(idlePanelElement, {
      onClick: async () => {
        onAddFetchById(item.id);
        await idlePanelElement.props.onClick(item, tableState);
        onRemoveFetchById(item.id);
      }
    }),
    true: loadingPanelElement
  }[isFetching];

  const showFetchPanel = lastRow && showCondition(item);

  return {
    name: 'fetchPlugin',
    theme: '',
    className: '',
    onClick: () => {},
    fetching: {
      fetchPanel: showFetchPanel ? fetchPanel : null
    }
  };
};

export { useFetch };
