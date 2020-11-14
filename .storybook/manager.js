import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

import { version } from '../package.json';

addons.setConfig({
  theme: create({
    brandTitle: `React Table Library (v${version})`,
    brandUrl: '#'
  }),
  enableShortcuts: false,
  isToolshown: false,
  showPanel: false,
  showRoots: true
});
