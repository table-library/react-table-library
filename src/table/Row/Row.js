import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import cs from 'classnames';

import { RowContainer } from '@table-library/react-table-library/lib/common/components/Row';
import { ThemeContext } from '@table-library/react-table-library/lib/common/context/Theme';
import { isRowClick } from '@table-library/react-table-library/lib/common/util/isRowClick';

import { useRowLayout } from './useRowLayout';
import { useDoubleClick } from './useDoubleClick';

const evaluateProps = (rowPropsByFeature, onSingleClick) => {
  const {
    themeByFeature,
    classNamesByFeature,
    onClickByFeature,
    ...specificsByFeature
  } = rowPropsByFeature.reduce(
    (acc, value) => {
      const { theme, className, onClick, panels } = value;

      const mergedTheme = css`
        ${acc.themeByFeature}
        ${theme}
      `;

      const mergedClassName = cs(acc.classNamesByFeature, className);

      const mergedOnClick = (tableItem, event) => {
        onClick(tableItem, event);
        acc.onClickByFeature(tableItem, event);
      };

      const mergedPanels = acc.panelsByFeature.concat(panels || []);

      return {
        ...acc,
        themeByFeature: mergedTheme,
        classNamesByFeature: mergedClassName,
        onClickByFeature: mergedOnClick,
        panelsByFeature: mergedPanels,
      };
    },
    {
      themeByFeature: '',
      classNamesByFeature: '',
      onClickByFeature: (tableItem, event) => {
        if (onSingleClick && isRowClick(event)) {
          onSingleClick(tableItem, event);
        }
      },
      panelsByFeature: [],
    }
  );

  return {
    themeByFeature,
    classNamesByFeature,
    onClickByFeature,
    ...specificsByFeature,
  };
};

const Row = React.memo(
  ({
    item,
    className,
    disabled,
    rowPropsByFeature,
    panels,
    onClick,
    onDoubleClick,
    children,
  }) => {
    const theme = React.useContext(ThemeContext);

    const {
      themeByFeature,
      classNamesByFeature,
      onClickByFeature,
      panelsByFeature,
    } = evaluateProps(rowPropsByFeature, onClick);

    const ref = React.useRef();

    useDoubleClick(ref, onClickByFeature, onDoubleClick, item);
    useRowLayout(ref, '.td');

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
              clickable: onClickByFeature || onDoubleClick,
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

        {panelsByFeature.map((panel) =>
          React.cloneElement(panel, { key: item.id })
        )}

        {panels.map((panel) =>
          React.cloneElement(panel, { key: item.id })
        )}
      </>
    );
  }
);

Row.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  rowPropsByFeature: PropTypes.arrayOf(PropTypes.any),
  panels: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { Row };
