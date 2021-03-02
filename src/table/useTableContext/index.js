import * as React from 'react';

const useTableContext = (context) => {
  const contextRef = React.useRef(context);

  React.useEffect(() => {
    contextRef.current = context;
  }, [context]);

  return contextRef;
};

export { useTableContext };
