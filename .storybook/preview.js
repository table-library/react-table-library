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
        ['Table', 'Create', 'Update', 'Delete'],
        'Features',
        [
          'Theme',
          'Layout',
          'Resize',
          'Sort',
          'Search',
          'Filter (WIP)',
          'Select',
          'Tree',
          'Expand',
          'Pagination',
          'Column Hiding',
          'Column Ordering',
          'Column Grouping (WIP)',
        ],
        'Composites',
        ['Sort & Select (WIP)', 'Tree & Select', 'Tree & Sort'],
        'Library Themes',
        [
          'Material UI (WIP)',
          'Semantic UI (WIP)',
          'Bootstrap UI (WIP)',
        ],
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
          'Filter (WIP)',
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
