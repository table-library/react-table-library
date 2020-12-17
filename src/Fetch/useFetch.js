import React from 'react';

const useFetch = ({
  tableState,
  item,
  parentItem,
  lastRow,
  panelShowCondition,
  idlePanel,
  loadingPanel,
  isFetching,
  onAddFetchById,
  onRemoveFetchById
}) => {
  const idlePanelElement = idlePanel(parentItem);
  const loadingPanelElement = loadingPanel(parentItem);

  const fetchPanel = {
    false: React.cloneElement(idlePanelElement, {
      onClick: async () => {
        onAddFetchById(item.id);
        await idlePanelElement.props.onClick(tableState, parentItem);
        onRemoveFetchById(item.id);
      }
    }),
    true: loadingPanelElement
  }[isFetching];

  const showFetchPanel = lastRow && panelShowCondition(parentItem);

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
