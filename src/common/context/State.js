import * as React from 'react';

import { TableContext } from './Table';
import { ThemeContext } from './Theme';
import { ResizeContext } from './Resize';
import { SelectContext } from './Select';
import { TreeContext } from './Tree';
import { ExpandContext } from './Expand';
import { SortContext } from './Sort';

const State = () => {
  const { list, tableFeatureRef } = React.useContext(TableContext);

  const theme = React.useContext(ThemeContext);
  const resize = React.useContext(ResizeContext);
  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const expand = React.useContext(ExpandContext);
  const sort = React.useContext(SortContext);

  React.useEffect(() => {
    tableFeatureRef.current = {
      list,
      theme,
      resize,
      select,
      tree,
      expand,
      sort
    };
  }, [
    list,
    tableFeatureRef,
    theme,
    resize,
    select,
    tree,
    expand,
    sort
  ]);

  return null;
};

export { State };
