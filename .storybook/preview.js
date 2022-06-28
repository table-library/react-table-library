import * as React from 'react';
import 'loki/configure-react';
import isLokiRunning from '@loki/is-loki-running';

import { DisableAnimationsContext } from './stories/loki.js';

const Features = [
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
  'Horizontal Scroll',
  'Fixed Column',
  'Virtualized',
  'Editable',
  'Data Grid',
  'Column Hiding',
  'Column Replace',
  'Column Ordering',
  'Column Grouping (WIP)',
];

export const parameters = {
  layout: 'fullscreen',
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
  options: {
    storySort: {
      order: [
        'Getting Started',
        ['Installation', 'FAQ'],
        'First Steps',
        ['Compact Table', 'Composed Table'],
        'Types',
        ['Data', 'Compact Table', 'Composed Table', ...Features, 'Virtualized'],
        'Compact Table',
        ['Base', ...Features],
        'Theming',
        ['Themes', 'CSS Class', 'Imperative Style'],
        'Library Themes',
        [
          'Mantine',
          'Chakra UI',
          'Material UI',
          'Semantic UI (WIP)',
          'Bootstrap (WIP)',
          'Ant Design (WIP)',
        ],
        'Product Themes',
        ['Google Drive (WIP)', 'Stripe (WIP)'],
        'Features',
        Features,
        'Composites',
        ['Sort & Select', 'Tree & Select', 'Tree & Sort'],
        'CRUD',
        ['Create', 'Update', 'Delete'],
        'Misc',
        ['Cell', 'Row', 'Table', 'Column', 'Footer', 'Actions'],
        'Recipes',
        ['Controlled'],
        'Client vs Server',
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
        ['Origin Table', 'Origin External', 'Origin Mixed', 'Debounce', 'Overlay', 'Hybrid'],
        'Kitchen Sink',
        ['CSV Download', 'PDF Download', 'Image Download'],
      ],
    },
  },
};

export const decorators = [
  (Story) => (
    <DisableAnimationsContext.Provider value={isLokiRunning()}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '20px',
        }}
      >
        <Story />
      </div>
    </DisableAnimationsContext.Provider>
  ),
];
