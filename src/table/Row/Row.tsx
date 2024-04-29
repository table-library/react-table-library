import * as React from 'react';
import cs from 'clsx';

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { isRowClick } from '@overmap-ai/react-table-library/common/util/isRowClick';
import { RowContainer } from '@overmap-ai/react-table-library/common/components/Row';
import { ThemeContext } from '@overmap-ai/react-table-library/common/context/Theme';
import { useFeatures } from '@overmap-ai/react-table-library/common/context/Feature';
import { isReactFragment } from '@overmap-ai/react-table-library/common/util/isFragment';
import { getPreviousColSpans } from '@overmap-ai/react-table-library/common/util/getPreviousColSpans';

import { Nullish } from '@overmap-ai/react-table-library/types/common';
import {
  OnClick,
  Event,
  Features,
  RowProps,
  FeatureProps,
  TableNode,
} from '@overmap-ai/react-table-library/types/table';

import { useDoubleClick } from './useDoubleClick';

const getRowProps = <T extends TableNode>(features: Features<T>, props: RowProps<T>) =>
  Object.values(features)
    .filter(Boolean)
    .filter((feature) => feature?.hasOwnProperty('_getRowProps'))
    .map((feature) => (feature as any)._getRowProps(props, features));

const evaluateProps = <T extends TableNode>(
  rowPropsByFeature: FeatureProps<T>[],
  onSingleClick: OnClick<T> | Nullish,
) => {
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

        const mergedOnClick = (node: T, event: React.SyntheticEvent) => {
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
        onClickByFeature: (node: T, event: React.SyntheticEvent) => {
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

export const Row = <T extends TableNode>(props: RowProps<T>) => {
  const { item, className, disabled, onClick, onDoubleClick, children, ...rest } = props;

  const features = useFeatures<T>();
  const rowPropsByFeature = getRowProps<T>(features, props);

  const theme = React.useContext(ThemeContext);

  const { themeByFeature, classNamesByFeature, clickable, onClickByFeature } = evaluateProps<T>(
    rowPropsByFeature,
    onClick,
  );

  const ref = React.useRef<HTMLTableRowElement>(null);

  useDoubleClick<T>(ref, onClickByFeature, onDoubleClick, item);

  const handleClick = disabled
    ? () => {}
    : onDoubleClick
    ? () => {}
    : (event: Event) => onClickByFeature(item, event);

  return (
    <RowContainer
      role="row"
      data-table-library_tr-body=""
      onClick={handleClick}
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
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child, index) => {
          if (React.isValidElement(child)) {
            let extraProps = {};

            // edge case: CompactTable renders checkbox (select feature) + cell in one fragment
            // this would break the resize feature
            // hence we need to pass the index from the outside then (see CompactTable)

            // also column grouping
            if (!isReactFragment(child)) {
              extraProps = {
                ...extraProps,
                index,
                previousColSpans: getPreviousColSpans(children, index),
              };
            }

            return React.cloneElement(child, extraProps);
          }
        })}
    </RowContainer>
  );
};
