import { zipThemes } from '@table-library/react-table-library/theme/index';

import { Theme } from '@table-library/react-table-library/types/theme';

type Configuration = {
  isVirtualized?: boolean;
};

type ConfigurationSound = {
  isVirtualized: boolean;
};

type Options = {
  horizontalSpacing?: number;
  verticalSpacing?: number;
  striped?: boolean;
  highlightOnHover?: boolean;
};

type OptionsSound = {
  horizontalSpacing: number;
  verticalSpacing: number;
  striped: boolean;
  highlightOnHover: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCommonTheme = (options: OptionsSound, _: ConfigurationSound) => ({
  Table: `
    .caption-container {
      padding: 10px 22px;
      display: flex;
      justify-content: flex-start;
      width: 100%;

      border-top: 1px solid #e0e0e0;
    }

    caption {
      font-size: 14px;
      color: #868e96;
    }
  `,
  BaseRow: `
    font-size: 14px;
  `,
  HeaderRow: `
    font-weight: bold;

    border-bottom: 1px solid #e0e0e0;

    &.tr-footer {
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
    }
  `,
  Row: `
    border-bottom: 1px solid #e0e0e0;

    &.tr.tr-body.row-select.row-select-single-selected, &.tr.tr-body.row-select.row-select-selected {
      background-color: #bddffd;
      border-bottom: 1px solid #bddffd;
    }
  `,
  BaseCell: `
    padding: ${options.verticalSpacing}px ${options.horizontalSpacing}px;

    & > div {
      padding-top: 2px;
      padding-bottom: 2.5px;
    }

    &:focus {
      outline: dotted;
      outline-width: 1px;
      outline-offset: -1px;
    }
  `,
});

const getVirtualizedHighlight = (highlightOnHover: boolean) =>
  highlightOnHover
    ? `
      & > div:hover > .tr {
        background-color: #f1f3f5;
      }
    `
    : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getVirtualizedTheme = (options: OptionsSound, configuration: ConfigurationSound) => ({
  Body: `
    & > div:not(:last-of-type) > .tr {
      border-bottom: 1px solid #e2e8f0;
    }

    & > div:nth-of-type(odd) > .tr {
      background-color: ${options.striped ? '#f5f5f5' : '#ffffff'};
    }

    & > div:nth-of-type(even) > .tr {
      background-color: #ffffff;
    }

    ${getVirtualizedHighlight(options.highlightOnHover)}
  `,
});

const getNoneVirtualizedHighlight = (highlightOnHover: boolean) =>
  highlightOnHover
    ? `
      &:hover {
        background-color: #f1f3f5;
      }
    `
    : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNoneVirtualizedTheme = (options: OptionsSound, configuration: ConfigurationSound) => ({
  Row: `
    &.tr:not(:last-of-type) {
      border-bottom: 1px solid #e2e8f0;
    }

    &:nth-of-type(odd) {
      background-color: ${options.striped ? '#f5f5f5' : '#ffffff'};
    }

    &:nth-of-type(even) {
      background-color: #ffffff;
    }

    ${getNoneVirtualizedHighlight(options.highlightOnHover)}
  `,
});

const getZipTheme = (options: OptionsSound, configuration: ConfigurationSound) => {
  const commonTheme = getCommonTheme(options, configuration);

  const specificTheme = configuration.isVirtualized
    ? getVirtualizedTheme(options, configuration)
    : getNoneVirtualizedTheme(options, configuration);

  return zipThemes([commonTheme, specificTheme]);
};

export const DEFAULT_OPTIONS = {
  horizontalSpacing: 16,
  verticalSpacing: 16,
  striped: false,
  highlightOnHover: false,
};

export const DEFAULT_CONFIGURATION = {
  isVirtualized: false,
};

export const getTheme = (options?: Options, configuration?: Configuration): Theme => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...(options ? options : {}),
  };

  const mergedConfiguration = {
    ...DEFAULT_CONFIGURATION,
    ...(configuration ? configuration : {}),
  };

  return getZipTheme(mergedOptions, mergedConfiguration);
};
