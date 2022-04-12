import * as React from 'react';
import cs from 'clsx';

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { isRowClick } from '@table-library/react-table-library/common/util/isRowClick';
import { RowContainer } from '@table-library/react-table-library/common/components/Row';
import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { useFeatures } from '@table-library/react-table-library/common/context/Feature';

import { useConsumeRowLayout } from '@table-library/react-table-library/resize/useConsumeRowLayout';

import { Nullish } from '@table-library/react-table-library/types/common';
import {
  OnClick,
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
  const {
    themeByFeature,
    classNamesByFeature,
    clickable,
    onClickByFeature,
  } = rowPropsByFeature.reduce(
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

export const Row: React.FC<RowProps> = (props: RowProps) => {
  const { item, className, disabled, onClick, onDoubleClick, children, ...rest } = props;

  const features = useFeatures();
  const rowPropsByFeature = getRowProps(features, props);

  const theme = React.useContext(ThemeContext);

  const { themeByFeature, classNamesByFeature, clickable, onClickByFeature } = evaluateProps(
    rowPropsByFeature,
    onClick,
  );

  const ref = React.useRef<HTMLInputElement>(null);

  useDoubleClick(ref, onClickByFeature, onDoubleClick, item);
  useConsumeRowLayout(ref, '.td');

  return (
    <RowContainer
      {...rest}
      role="row"
      className={cs('tr', 'tr-body', classNamesByFeature, className, {
        disabled,
        clickable: clickable || !!onDoubleClick,
      })}
      css={css`
        ${themeByFeature}
        ${theme?.BaseRow}
        ${theme?.Row}
      `}
      ref={ref}
    >
      {children}
    </RowContainer>
  );
};
