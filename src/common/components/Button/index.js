import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

const Button = React.forwardRef(({ margin, ...props }, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      {...props}
      css={styles({ margin })}
    />
  );
});

Button.propTypes = {
  margin: PropTypes.string,
};

export { Button };
