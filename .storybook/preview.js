import * as React from 'react';
import 'loki/configure-react';

export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Introduction',
        [
          'Welcome',
          'Features',
          'Installation',
          'License',
          'Code of Conduct',
          'Changelog',
          'Roadmap',
        ],
        'Getting Started',
        'Features',
        'Composites',
        'Library Themes',
        'Product Themes',
        'Recipes',
        'Server',
        'Server Recipes',
        'Kitchen Sink',
      ],
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <Story />
    </>
  ),
];
