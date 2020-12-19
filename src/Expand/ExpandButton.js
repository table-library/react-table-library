import * as React from 'react';
import PropTypes from 'prop-types';

import IconChevronSingleDown from '@common/icons/IconChevronSingleDown';
import IconChevronSingleUp from '@common/icons/IconChevronSingleUp';
import { getIcon } from '@common/util/getIcon';
import { isRenderProp } from '@common/util/isRenderProp';
import { Button } from '@common/components/Button';

const EXPAND_ICON_SIZE = '14px';

const getExpandIcon = (
  isExpanded,
  expandIconSize,
  ExpandIconUp,
  ExpandIconDown
) => {
  const size = {
    height: `${expandIconSize}`,
    width: `${expandIconSize}`
  };

  if (isExpanded) {
    return ExpandIconUp
      ? React.cloneElement(ExpandIconUp, { ...size })
      : null;
  }

  return ExpandIconDown
    ? React.cloneElement(ExpandIconDown, { ...size })
    : null;
};

const ExpandButton = ({
  expand,
  isExpanded,
  expandIcon,
  onClick,
  children
}) => {
  if (isRenderProp(children)) {
    return children(expand);
  }

  const expandIconSize = expandIcon.size || EXPAND_ICON_SIZE;
  const expandIconUp = getIcon(
    expandIcon.iconUp,
    <IconChevronSingleUp />
  );
  const expandIconDown = getIcon(
    expandIcon.iconDown,
    <IconChevronSingleDown />
  );

  const icon = getExpandIcon(
    isExpanded,
    expandIconSize,
    expandIconUp,
    expandIconDown
  );

  return (
    <Button className="narrow" onClick={onClick}>
      {icon && <span>{icon}</span>}
    </Button>
  );
};

ExpandButton.propTypes = {
  expand: PropTypes.shape(PropTypes.any),
  isExpanded: PropTypes.bool,
  expandIcon: PropTypes.shape({
    size: PropTypes.string,
    iconUp: PropTypes.node,
    iconDown: PropTypes.node
  }),
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export { ExpandButton };
