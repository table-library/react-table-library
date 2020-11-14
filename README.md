# Treact UI Components

- [Live UI Storybook](https://www.treact-ui.site)
- [Live Template](https://www.treact-ui.site/app)

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
npm install @tls/treact-ui styled-components
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
import React from 'react';

import { Atoms } from '@tls/treact-ui';

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
import { Atoms } from '@tls/treact-ui';

// imports all Atoms from the library
import { ContentButtonPrimary } from '@tls/treact-ui/lib/Atoms';

// imports only the component and its dependencies
import ContentButtonPrimary from '@tls/treact-ui/lib/ContentButtonPrimary';

// same goes for icons
// which is why its better to import them directly
// instead of importing all icons at once
import IconCockpit from '@tls/treact-ui/lib/IconCockpit';
```

## Contribution to Library

Setup:

- `git clone git@gitlab.com:TRUMPF-corp/treui/ui-components.git`
- `cd ui-components`
- follow ".npmrc"
- `npm install`
- follow "Docker" for Screenshot Testing

### .npmrc

Add npm credentials from azure feed to your **local** _.npmrc_ file. The credentials can be obtained by going to the [TcXLibrary Feed](https://dev.azure.com/trumpf-laser/Bedienung-2020/_packaging?_a=feed&feed=TcXFrontendLib): Connect To Feed > NPM > Generate NPM Credentials.

- Rename _.npmrc.azure_ to _.npmrc_
- Add your password credentials from Azure Dev Ops to _.npmrc_

### Docker

- [MacOS Setup](https://www.robinwieruch.de/docker-macos) / Windows Setup (TODO someone else needs to provide a working link here)
- [Docker Cheatsheet](https://www.robinwieruch.de/docker-cheatsheet)

### Scripts

Run Storybook:

- `npm run storybook`

Build Storybook:

- `npm install -g http-server`
- `npm run storybook-build`
- `http-server dist/`

Build Library:

- `npm run build`

Run Tests:

- Run Once: `npm test`
- Watch: `npm run test:watch`
- Run Screenshot Tests with Docker: `make loki-test`
- Update Screenshot Tests with Docker: `make loki-update`
