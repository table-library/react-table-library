# React Table Library

[![Version][version-badge]][package]
[![Size][size-badge]][size]
[![License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]
[![Changelog][changelog-badge]][changelog]

[![Tweet][twitter-badge]][twitter]
[![Star][github-star-badge]][github-star]

React Table Library -- yet another table library for React -- which prioritzes:

- composition over configuration
- customization
- extensibility
- server-side
- developer experience

**[Documentation](https://react-table-library.com/)**

## Requirements

React Table Library requires the following libraries to be installed:

- React 16.13.1+
- styled-components 4.0.0+ || 5.0.0+

## Installation

```
npm install @table-library/react-table-library styled-components
```

```
yarn add @table-library/react-table-library styled-components
```

## The Problem

You find yourself looking for a fitting table component which solves your problem, but you cannot find the one solution which comes with all the desired features yet stays customisable for a pleasant developer experience. Personally I ran into this problem myself after working with lots of different React table components -- from UI libraries but also as standalone libraries -- and none of them felt right to me. After working on React tables for three different clients of mine over the past year, I decided to roll my own solution for them. I came to the conclusion that the React ecosystem needs another table library -- which does things right.

## The Solution

In 2020, [Robin Wieruch](https://www.robinwieruch.de) created React Table Library in collaboration with [Big Ladder Software](https://bigladdersoftware.com/). After working with different table libraries to fit their needs, they decided to roll their own solution with the following subjects in mind ...

- composition over configuration
- customization & extensibility
- server-side operations (e.g. search, pagination) as first-class citizen
- developer experience

[version-badge]: https://img.shields.io/npm/v/@table-library/react-table-library
[package]: https://www.npmjs.com/package/@table-library/react-table-library
[license-badge]: https://img.shields.io/npm/l/@table-library/react-table-library.svg?style=flat-square
[license]: https://github.com/table-library/react-table-library/blob/master/LICENSE
[github-star-badge]: https://img.shields.io/github/stars/table-library/react-table-library?style=social
[github-star]: https://github.com/table-library/react-table-library/
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/table-library/react-table-library/blob/master/CODE_OF_CONDUCT.md
[changelog-badge]: https://img.shields.io/badge/Change-Log-blue
[changelog]: https://github.com/table-library/react-table-library/blob/master/CHANGELOG.md
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20react-table-library%20by%20%40rwieruch%20https%3A%2F%2Fgithub.com%2Ftable-library%2Freact-table-library%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/table-library/react-table-library.svg?style=social
[size-badge]: https://badgen.net/bundlephobia/minzip/@table-library/react-table-library@latest
[size]: https://bundlephobia.com/package/@table-library/react-table-library

## How is this different from other React Table Libraries?

There are two kinds of table libraries for React: heavyweight and lightweight.

On the one side of the spectrum, there are **heavyweight table libraries** which are often shipped by UI libraries such as Material UI. These tables have all batteries included, however, they often lack in modern concepts such as composition over configuration, customization, extensibility and first-class server-side operations. When you have to create one giant configuration object for one giant table component, you know that you are working with a heavyweight table library.

On the other side of the spectrum, there are **lightweight table libraries**. The most popular one is React Table which is a great library and at the time the status quo in the React community. I very much like this library and used it myself, however, when creating complex tables (read: server-side operations, customizations, feature compositions) from scratch, I always felt like re-inventing the wheel all the time, because I didn't receive enough handholding from the library.

With **React Table Library** I wanted to have something in between heavyweight and lightweight. I wanted to give developers enough handholding for various built-in features, enable them to perform more complex server-side operations, while still keeping them all the flexibility to create their custom table with a composable approach by using components and hooks. I hope you like this library as well and give it a chance for your next project!
