import { styled } from '@stitches/react';

export default ({ margin }: { margin: string }) =>
  styled('button', {
    display: 'flex',
    'align-items': 'center',

    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: '0',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',

    width: '100%',
    height: '100%',

    '&.narrow': {
      width: 'auto',
    },

    '&.active': {
      fontWeight: 'bold',
    },

    span: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    '&.prefix span': {
      marginRight: `${margin}`,
    },

    '&.suffix span': {
      marginLeft: `${margin}`,
    },

    div: {
      textAlign: 'left',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },

    'div:after': {
      display: 'block',
      content: 'attr(title)',
      fontWeight: 'bold',
      height: 0,
      overflow: 'hidden',
      visibility: 'hidden',
    },
  });
