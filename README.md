# React Table Library

[Live](https://www.react-table-library.com)

## Requirements

- [node & npm](https://nodejs.org/en/)
- [git](https://git-scm.com/)

## Installation & Usage

Project Setup:

```
create-react-app my-app
cd my-app
touch .npmrc
```

Copy the content of this proejct's _.npmrc.azure_ file to your project's _.npmrc_ and enter your credentials (password etc.) in this file for the placeholders.

Then on command line:

```
npm install @table-library/react-table-library
```

In your global CSS:

```
html {
  font-size: 1px;
}

body {
  font-size: 14rem;
}
```

And last but not least, in one of your React components:

```
import * as React from 'react';

import { Atoms } from '@table-library/react-table-library';

const { ContentButtonPrimary } = Atoms;

const App = () => {
  return (
    <div>
      <ContentButtonPrimary label="Click me" />
    </div>
  );
};

export default App;
```

You are ready to go.

### Relative Imports

Keep the bundle size small with relative imports:

```
// imports the whole library
import { Atoms } from '@table-library/react-table-library';

// imports all Atoms from the library
import { ContentButtonPrimary } from '@table-library/react-table-library/Atoms';

// imports only the component and its dependencies
import ContentButtonPrimary from '@table-library/react-table-library/ContentButtonPrimary';

// same goes for icons
// which is why its better to import them directly
// instead of importing all icons at once
import IconCockpit from '@table-library/react-table-library/IconCockpit';
```

## Contribution to Library

Setup:

- `git@github.com:table-library/react-table-library.git`
- follow ".npmrc"
- `npm install`
- follow "Docker" for Screenshot Testing

### .npmrc

### Docker

- [MacOS Setup](https://www.robinwieruch.de/docker-macos) / Windows Setup (TODO someone else needs to provide a working link here)
- [Docker Cheatsheet](https://www.robinwieruch.de/docker-cheatsheet)

### Scripts

Run Storybook:

- `npm run storybook:dev`

Build Storybook:

- `npm run storybook:build`
- `npx http-server dist/`

Build Library:

- `npm run library:build`

Run Tests:

- Run Once: `npm test`
- Watch: `npm run test:watch`
- Run Screenshot Tests with Docker: `make loki:test`
- Update Screenshot Tests with Docker: `make loki:update`
