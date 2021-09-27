import * as React from 'react';
import 'loki/configure-react';

export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Getting Started',
        ['Introduction', 'Roadmap'],
        'First Steps',
        ['Demo', 'Table', 'Create', 'Update', 'Delete'],
        'Library Themes',
        ['Material UI', 'Semantic UI', 'Bootstrap UI', 'Ant Design'],
        'Features',
        [
          'Theme',
          'Layout',
          'Resize',
          'Sort',
          'Search',
          'Filter',
          'Select',
          'Tree',
          'Expand',
          'Pagination',
          'Fixed Header',
          'Column Hiding',
          'Column Ordering',
          'Column Grouping (WIP)',
        ],
        'Composites',
        ['Sort & Select (WIP)', 'Tree & Select', 'Tree & Sort'],
        'Misc',
        ['Cell', 'Row', 'Column', 'Configuration (WIP)'],
        'Product Themes',
        ['Google Drive (WIP)', 'Stripe (WIP)'],
        'Recipes',
        ['Controlled', 'Large Table (WIP)', 'Memoized Row (WIP)'],
        'Server',
        [
          'Table',
          'Sort',
          'Search',
          'Filter',
          'Expand',
          'Fetch',
          'Tree',
          'Pagination',
          'Infinite Scroll (WIP)',
        ],
        'Server Recipes',
        [
          'Origin Table',
          'Origin External',
          'Origin Mixed',
          'Debounce',
          'Overlay',
          'Hybrid',
        ],
        'Kitchen Sink',
        ['Tree'],
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
