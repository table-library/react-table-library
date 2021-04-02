import * as React from 'react';
import PropTypes from 'prop-types';

import { classnames } from '@table-library/react-table-library/common/classnames';

import styles from './styles.module.scss';

const Button = React.forwardRef(
  ({ className, margin, ...props }, ref) => {
    return (
      <button
        type="button"
        ref={ref}
        {...props}
        className={classnames([styles.button], className, styles)}
        // css={`
        //   &.prefix span {
        //     margin-right: ${({ margin }) => margin};
        //   }

        //   &.suffix span {
        //     margin-left: ${({ margin }) => margin};
        //   }
        // `}
      />
    );
  }
);

Button.propTypes = {
  className: PropTypes.string,
  margin: PropTypes.string,
};

export { Button };
