<h1 align="center">Build better Tables with React&nbsp;🍱</h1>

<br>

[![Version][version-badge]][package]
[![Size][size-badge]][size]
[![Types][type-badge]][package]
[![Semantic Release][semantic-release-badge]][semantic-release]
[![License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]
[![Changelog][changelog-badge]][changelog]

[![Tweet][twitter-badge]][twitter]
[![Follow][twitter-follow-badge]][twitter-follow]
[![Star][github-star-badge]][github-star]
[![Sponsor][github-sponsor-badge]][github-sponsor]

## React Table Library

React Table Library -- an almost headless table library -- which prioritizes:

- opt-in feature richness
- built-in themes and custom theming
- server-side operations as first-class citizens
- small library size
- pleasant developer experience
- TypeScript support
- SSR support

**[Showreel](https://react-tables.com/)**

## Requirements

React Table Library requires the following libraries to be installed:

- "react": ">=16.8.0"
- "react-dom": ">=16.8.0"
- "@emotion/react": ">= 11"

## Installation

```sh
npm install @table-library/react-table-library @emotion/react
```

```sh
yarn add @table-library/react-table-library @emotion/react
```

## Usage

- **[Documentation](https://react-table-library.com/)**

```javascript
import { CompactTable } from '@table-library/react-table-library/compact';

const nodes = [
  {
    id: '0',
    name: 'Shopping List',
    deadline: new Date(2020, 1, 15),
    type: 'TASK',
    isComplete: true,
    nodes: 3,
  },
];

const COLUMNS = [
  { label: 'Task', renderCell: (item) => item.name },
  {
    label: 'Deadline',
    renderCell: (item) =>
      item.deadline.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
  },
  { label: 'Type', renderCell: (item) => item.type },
  {
    label: 'Complete',
    renderCell: (item) => item.isComplete.toString(),
  },
  { label: 'Tasks', renderCell: (item) => item.nodes },
];

const Component = () => {
  const data = { nodes };

  return <CompactTable columns={COLUMNS} data={data} />;
};
```

## The Problem

You are looking for a suitable table component to solve your problem, but you cannot find any one solution which comes with all your desired features and is still customizable for a pleasant developer experience. I myself ran into this problem after working with many different React table components -- from UI libraries but also from standalone libraries -- and none of them felt right to me. After working on React tables for three different clients over the past year, I decided to create my own solution for my clients. I came to the conclusion that the React ecosystem needs yet another table library -- which does it better.

## The Solution

In 2020, [Robin Wieruch](https://www.robinwieruch.de) created React Table Library in collaboration with [Big Ladder Software](https://bigladdersoftware.com/). After working with different table libraries to fit their needs, they decided to create their own solution with the following objectives in mind ...

- composition over configuration
- customization and extensibility
- server-side operations (e.g. search, pagination) as first-class citizens
- pleasant developer experience

[version-badge]: https://img.shields.io/npm/v/@table-library/react-table-library
[package]: https://www.npmjs.com/package/@table-library/react-table-library
[type-badge]: https://img.shields.io/npm/types/@table-library/react-table-library
[license-badge]: https://img.shields.io/npm/l/@table-library/react-table-library.svg
[license]: https://github.com/table-library/react-table-library/blob/master/LICENSE
[semantic-release-badge]: https://img.shields.io/badge/%F0%9F%9A%80-semantic--release-blueviolet
[semantic-release]: https://github.com/table-library/react-table-library/releases
[github-star-badge]: https://img.shields.io/github/stars/table-library/react-table-library?style=social
[github-star]: https://github.com/table-library/react-table-library/stargazers
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg
[coc]: https://github.com/table-library/react-table-library/blob/master/CODE_OF_CONDUCT.md
[changelog-badge]: https://img.shields.io/badge/Change-Log-blue
[changelog]: https://github.com/table-library/react-table-library/blob/master/CHANGELOG.md
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20react-table-library%20by%20%40rwieruch%20https%3A%2F%2Fgithub.com%2Ftable-library%2Freact-table-library%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/table-library/react-table-library.svg?style=social
[twitter-follow]: https://twitter.com/rwieruch
[twitter-follow-badge]: https://img.shields.io/twitter/follow/rwieruch?style=social
[size-badge]: https://badgen.net/bundlephobia/minzip/@table-library/react-table-library@latest
[size]: https://bundlephobia.com/package/@table-library/react-table-library
[github-sponsor-badge]: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&color=red&logo=GitHub&link=https://github.com/sponsors/rwieruch
[github-sponsor]: https://github.com/sponsors/rwieruch

## How is this different from other React Table Libraries?

There are two kinds of table libraries for React: heavyweight and lightweight.

At one end of the spectrum, there are **heavyweight table libraries** which are often shipped by UI libraries such as MUI X. These tables have all the bells and whistles included, however, they often fail to use modern concepts such as composition over configuration, customization, extensibility, and server-side operations as first-class citizens. When you have to create one giant configuration object for one giant table component, then you know that you are working with a heavyweight table library.

At the other end of the spectrum, there are **lightweight table libraries**. The most popular one is React Table which is a great library and at the time was the go-to library in the React community. I very much like this library and used it myself, however, when creating complex tables (read: server-side operations, customizations, feature compositions) from scratch, I felt that I was re-inventing the wheel every time, because I did not receive enough support from the library.

With **React Table Library** I wanted to create something between heavyweight and lightweight. I wanted to give developers enough support for various built-in features to enable them to perform more complex server-side operations, while still giving them all the flexibility to create their own custom table with a composable approach by using components and hooks. I hope you like this library as well and try it out for your next project! It takes less than ten minutes to test the power of React Table Library.
