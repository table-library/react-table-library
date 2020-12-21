import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { RowContainer } from '@common/components/Row';
import { ThemeContext } from '@common/context/Theme';
import { isRowClick } from '@common/util/isRowClick';

import { useRowLayout } from './useRowLayout';
import { useDoubleClick } from './useDoubleClick';

const evaluatePlugins = (plugins, props) => {
  const onRowClick = (tableItem, event) => {
    if (props.onClick && isRowClick(event)) {
      props.onClick(tableItem, event);
    }
  };

  const {
    pluginNames,
    themeByPlugins,
    classNameByPlugins,
    onClickByPlugins,
    ...specificsByPlugins
  } = plugins.reduce(
    (acc, { plugin, options }) => {
      const {
        name,
        theme,
        className,
        onClick,
        ...pluginSpecific
      } = plugin({
        ...props,
        ...options
      });

      const mergedPluginNames = acc.pluginNames.concat(name);

      const mergedTheme = css`
        ${acc.themeByPlugins}
        ${theme}
      `;

      const mergedClassName = cs(acc.classNameByPlugins, className);

      const mergedOnClick = (tableItem, event) => {
        onClick(tableItem, event);
        acc.onClickByPlugins(tableItem, event);
      };

      return {
        ...acc,
        pluginNames: mergedPluginNames,
        themeByPlugins: mergedTheme,
        classNameByPlugins: mergedClassName,
        onClickByPlugins: mergedOnClick,
        ...pluginSpecific
      };
    },
    {
      pluginNames: [],
      themeByPlugins: '',
      classNameByPlugins: '',
      onClickByPlugins: onRowClick
    }
  );

  return {
    pluginNames,
    themeByPlugins,
    classNameByPlugins,
    onClickByPlugins,
    ...specificsByPlugins
  };
};

const Row = props => {
  const theme = React.useContext(ThemeContext);

  const {
    pluginNames,
    themeByPlugins,
    classNameByPlugins,
    onClickByPlugins,
    // specificsByPlugins
    tree,
    expand,
    fetching
    // eslint-disable-next-line react/destructuring-assignment
  } = evaluatePlugins(props.plugins || [], props);

  const {
    item,
    className,
    rowLayout,
    disabled,
    onDoubleClick,
    children
  } = props;

  const ref = React.useRef();

  useDoubleClick(ref, onClickByPlugins, onDoubleClick, item);
  useRowLayout(ref, '.td', rowLayout, children);

  return (
    <>
      <RowContainer
        role="row"
        className={cs(
          'tr',
          'tr-body',
          classNameByPlugins,
          className,
          {
            disabled,
            clickable: onClickByPlugins || onDoubleClick
          }
        )}
        css={css`
          ${themeByPlugins}
          ${theme?.BaseRow}
          ${theme?.Row}
        `}
        ref={ref}
      >
        {children(item)}
      </RowContainer>

      {expand?.expansionPanel &&
        pluginNames.findIndex(name => name === 'expandPlugin') <
          pluginNames.findIndex(name => name === 'treePlugin') &&
        expand?.expansionPanel}

      {tree?.treePanel}

      {expand?.expansionPanel &&
        pluginNames.findIndex(name => name === 'expandPlugin') >
          pluginNames.findIndex(name => name === 'treePlugin') &&
        expand?.expansionPanel}

      {fetching?.fetchPanel}
    </>
  );
};

Row.propTypes = {
  item: PropTypes.shape(PropTypes.any),
  rowLayout: PropTypes.arrayOf(PropTypes.any),
  plugins: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onDoubleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Row };
