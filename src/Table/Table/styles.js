import styled from 'styled-components';

export const TableContainer = styled.div`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  ${({ css }) => css};
`;
