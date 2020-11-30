import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;

  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  width: 100%;
  height: 100%;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.prefix span {
    margin-right: ${({ margin }) => margin};
  }

  &.suffix span {
    margin-left: ${({ margin }) => margin};
  }

  div {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  div:after {
    display: block;
    content: attr(title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`;

export { Button };
