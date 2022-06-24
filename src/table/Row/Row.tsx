import * as React from 'react';
import cs from 'clsx';

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { isRowClick } from '@table-library/react-table-library/common/util/isRowClick';
import { RowContainer } from '@table-library/react-table-library/common/components/Row';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { LayoutContext } from '@table-library/react-table-library/common/context';
import {
  toDataColumn,
  applyProgrammaticHide,
  getHeaderColumns,
} from '@table-library/react-table-library/common/util/columns';
import { useFeatures } from '@table-library/react-table-library/common/context/Feature';

import { Nullish } from '@table-library/react-table-library/types/common';
import {
  OnClick,
  Event,
  Features,
  RowProps,
  FeatureProps,
  TableNode,
} from '@table-library/react-table-library/types/table';

import { useDoubleClick } from './useDoubleClick';

const getRowProps = (features: Features, props: RowProps) =>
  Object.values(features)
    .filter(Boolean)
    .filter((feature) => feature?.hasOwnProperty('_getRowProps'))
    .map((feature) => (feature as any)._getRowProps(props, features));

const evaluateProps = (rowPropsByFeature: FeatureProps[], onSingleClick: OnClick | Nullish) => {
  const { themeByFeature, classNamesByFeature, clickable, onClickByFeature } =
    rowPropsByFeature.reduce(
      (acc, value) => {
        const { theme, className, onClick } = value;

        const mergedTheme = `
        ${acc.themeByFeature}
        ${theme}
      `;

        const mergedClassName = cs(acc.classNamesByFeature, className);

        const mergedClickable = acc.clickable || !!onClick;

        const mergedOnClick = (node: TableNode, event: React.SyntheticEvent) => {
          onClick(node, event);
          acc.onClickByFeature(node, event);
        };

        return {
          ...acc,
          themeByFeature: mergedTheme,
          classNamesByFeature: mergedClassName,
          clickable: mergedClickable,
          onClickByFeature: mergedOnClick,
        };
      },
      {
        themeByFeature: '',
        classNamesByFeature: '',
        clickable: !!onSingleClick,
        onClickByFeature: (node: TableNode, event: React.SyntheticEvent) => {
          if (onSingleClick && isRowClick(event)) {
            onSingleClick(node, event);
          }
        },
      },
    );

  return {
    themeByFeature,
    classNamesByFeature,
    clickable,
    onClickByFeature,
  };
};

const useInitialHide = () => {
  const context = React.useContext(LayoutContext);

  const onlyOnce = React.useRef(false);

  React.useLayoutEffect(() => {
    if (!context) {
      throw new Error('No Layout Context.');
    }

    const { tableElementRef } = context;

    if (onlyOnce.current) return;
    onlyOnce.current = true;

    const dataColumns = getHeaderColumns(tableElementRef).map(toDataColumn);

    applyProgrammaticHide(tableElementRef, dataColumns);
  }, [context]);
};

export const Row: React.FC<RowProps> = (props: RowProps) => {
  const { item, className, disabled, onClick, onDoubleClick, children, ...rest } = props;

  const features = useFeatures();
  const rowPropsByFeature = getRowProps(features, props);

  const theme = React.useContext(ThemeContext);

  // needed for virtualized rows where cells might not be programmatically hidden on render yet
  useInitialHide();

  const { themeByFeature, classNamesByFeature, clickable, onClickByFeature } = evaluateProps(
    rowPropsByFeature,
    onClick,
  );

  const ref = React.useRef<HTMLTableRowElement>(null);

  useDoubleClick(ref, onClickByFeature, onDoubleClick, item);

  return (
    <RowContainer
      role="row"
      data-table-library_tr-body=""
      onClick={onDoubleClick ? () => {} : (event: Event) => onClickByFeature(item, event)}
      css={css`
        ${themeByFeature}
        ${theme?.BaseRow}
        ${theme?.Row}
      `}
      className={cs('tr', 'tr-body', classNamesByFeature, className, {
        disabled,
        clickable: clickable || !!onDoubleClick,
      })}
      ref={ref}
      {...rest}
    >
      {children}
    </RowContainer>
  );
};
