import * as React from 'react';

const useFetch = ({
  // general
  tableState,
  item,
  parentItem,
  lastRow,
  // options
  panelShowCondition,
  idlePanel,
  loadingPanel,
  // context
  fetching,
  // tree specific
  treeXLevel = 0,
  treeYLevel = 1
}) => {
  const idlePanelElement = idlePanel
    ? idlePanel(parentItem, {
        treeXLevel,
        treeYLevel
      })
    : null;

  const loadingPanelElement = loadingPanel
    ? loadingPanel(parentItem, {
        treeXLevel,
        treeYLevel
      })
    : null;

  const fetchPanel = {
    false: React.cloneElement(idlePanelElement, {
      onClick: async () => {
        fetching.onAddById(item.id);
        await idlePanelElement.props.onClick(tableState, parentItem);
        fetching.onRemoveById(item.id);
      }
    }),
    true: loadingPanelElement
  }[fetching.isFetching];

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
