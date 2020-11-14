import React from 'react';
import 'loki/configure-react';

export const parameters = {
  options: {
    storySort: (a, b) => a[1].id.localeCompare(b[1].id)
  }
};

export const decorators = [
  Story => (
    <>
      <Story />
    </>
  )
];
