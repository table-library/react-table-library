import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { RowContainer } from '@common/components/Row';
import { ThemeContext } from '@common/context/Theme';
import { isRowClick } from '@common/util/isRowClick';

import { useRowLayout } from './useRowLayout';
import { useDoubleClick } from './useDoubleClick';

const evaluateProps = (rowPropsByFeature, onSingleClick) => {
  const {
    namesByFeature,
    themeByFeature,
    classNamesByFeature,
    onClickByFeature,
    ...specificsByFeature
  } = rowPropsByFeature.reduce(
    (acc, value) => {
      const {
        name,
        theme,
        className,
        onClick,
        ...featureSpecific
      } = value;

      const mergedNames = acc.namesByFeature.concat(name);

      const mergedTheme = css`
        ${acc.themeByFeature}
        ${theme}
      `;

      const mergedClassName = cs(acc.classNamesByFeature, className);

      const mergedOnClick = (tableItem, event) => {
        onClick(tableItem, event);
        acc.onClickByFeature(tableItem, event);
      };

      return {
        ...acc,
        namesByFeature: mergedNames,
        themeByFeature: mergedTheme,
        classNamesByFeature: mergedClassName,
        onClickByFeature: mergedOnClick,
        ...featureSpecific
      };
    },
    {
      namesByFeature: [],
      themeByFeature: '',
      classNamesByFeature: '',
      onClickByFeature: (tableItem, event) => {
        if (onSingleClick && isRowClick(event)) {
          onSingleClick(tableItem, event);
        }
      }
    }
  );

  return {
    namesByFeature,
    themeByFeature,
    classNamesByFeature,
    onClickByFeature,
    ...specificsByFeature
  };
};

const Row = ({
  item,
  className,
  disabled,
  rowLayout,
  rowPropsByFeature,
  onClick,
  onDoubleClick,
  children
}) => {
  const theme = React.useContext(ThemeContext);

  const {
    namesByFeature,
    themeByFeature,
    classNamesByFeature,
    onClickByFeature,
    // specificsByFeature
    // TODO: exchange with panelByFeature
    tree,
    expand,
    fetching
  } = evaluateProps(rowPropsByFeature, onClick);

  const ref = React.useRef();

  useDoubleClick(ref, onClickByFeature, onDoubleClick, item);
  useRowLayout(ref, '.td', rowLayout, children);

  return (
    <>
      <RowContainer
        role="row"
        className={cs(
          'tr',
          'tr-body',
          classNamesByFeature,
          className,
          {
            disabled,
            clickable: onClickByFeature || onDoubleClick
          }
        )}
        css={css`
          ${themeByFeature}
          ${theme?.BaseRow}
          ${theme?.Row}
        `}
        ref={ref}
      >
        {children(item)}
      </RowContainer>

      {/* {expand?.expansionPanel &&
        namesByFeature.findIndex(name => name === 'expand') <
          namesByFeature.findIndex(name => name === 'tree') &&
        expand?.expansionPanel}

      {tree?.treePanel}

      {expand?.expansionPanel &&
        namesByFeature.findIndex(name => name === 'expand') >
          namesByFeature.findIndex(name => name === 'tree') &&
        expand?.expansionPanel}

      {fetching?.fetchPanel} */}
    </>
  );
};

Row.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  rowLayout: PropTypes.arrayOf(PropTypes.any),
  rowPropsByFeature: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { Row };
