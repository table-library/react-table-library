import * as React from 'react';
import cs from 'clsx';

import { RowContainer } from '@table-library/react-table-library/common/components/Row';
import { isRowClick } from '@table-library/react-table-library/common/util/isRowClick';
// import { ThemeContext } from '@table-library/react-table-library/common/context/Theme';
import { SelectContext } from '@table-library/react-table-library/common/context/Select';
import { TreeContext } from '@table-library/react-table-library/common/context/Tree';
import { SortContext } from '@table-library/react-table-library/common/context/Sort';
import { PaginationContext } from '@table-library/react-table-library/common/context/Pagination';

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
  const { themeByFeature, classNamesByFeature, onClickByFeature } = rowPropsByFeature.reduce(
    (acc, value) => {
      const { theme, className, onClick } = value;

      const mergedTheme = `
        ${acc.themeByFeature}
        ${theme}
      `;

      const mergedClassName = cs(acc.classNamesByFeature, className);

      const mergedOnClick = (node: TableNode, event: React.SyntheticEvent) => {
        onClick(node, event);
        acc.onClickByFeature(node, event);
      };

      return {
        ...acc,
        themeByFeature: mergedTheme,
        classNamesByFeature: mergedClassName,
        onClickByFeature: mergedOnClick,
      };
    },
    {
      themeByFeature: '',
      classNamesByFeature: '',
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
    onClickByFeature,
  };
};

export const Row: React.FC<RowProps> = (props: RowProps) => {
  const { item, className, disabled, onClick, onDoubleClick, children, ...rest } = props;

  const select = React.useContext(SelectContext);
  const tree = React.useContext(TreeContext);
  const sort = React.useContext(SortContext);
  const pagination = React.useContext(PaginationContext);

  const features = {
    select,
    tree,
    sort,
    pagination,
    // others
  };

  const rowPropsByFeature = getRowProps(features, props);

  // const theme = React.useContext(ThemeContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { themeByFeature, classNamesByFeature, onClickByFeature } = evaluateProps(
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
        clickable: onClickByFeature || onDoubleClick,
      })}
      // css={css`
      //   ${themeByFeature}
      //   ${theme?.BaseRow}
      //   ${theme?.Row}
      // `}
      ref={ref}
    >
      {children}
    </RowContainer>
  );
};
