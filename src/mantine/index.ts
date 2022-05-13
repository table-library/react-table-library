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
      margin-top: 10px;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    caption {
      color: #868e96;
    }
  `,
  BaseRow: `
    font-size: 14px;
  `,
  HeaderRow: `
    border-bottom: 1px solid #dee2e6;

    &.tr-footer {
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
    }
  `,
  Row: `
    border-bottom: 1px solid #dee2e6;

    &.tr.tr-body.row-select.row-select-single-selected, &.tr.tr-body.row-select.row-select-selected {
      background-color: #b3dcff;
      border-bottom: 1px solid #b3dcff;
    }
  `,
  BaseCell: `
    padding: ${options.verticalSpacing}px ${options.horizontalSpacing}px;

    &:not(.stiff) > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
  HeaderCell: `
    font-weight: bold;
    color: #495057;

    & > div {
      padding: 6px 0;
    }
  `,
  Cell: `
    color: #000000;

    & > div {
      padding: 2px 0;
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
    & > div:nth-of-type(odd) > .tr {
      background-color: ${options.striped ? '#f8f9fa' : '#ffffff'};
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
    &:nth-of-type(odd) {
      background-color: ${options.striped ? '#f8f9fa' : '#ffffff'};
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

export const DEFAULT_OPTIONS: OptionsSound = {
  horizontalSpacing: 10,
  verticalSpacing: 10,
  striped: false,
  highlightOnHover: false,
};

export const DEFAULT_CONFIGURATION: ConfigurationSound = {
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
