import * as React from 'react';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { useTree, CellTree, TreeExpandClickTypes } from '@table-library/react-table-library/tree';
import { useTheme } from '@table-library/react-table-library/theme';
import { findNodeById } from '@table-library/react-table-library/common';

import { nodes } from '../../data';

const LineIcon = ({ children }) => (
  <div
    className="line-icon-container"
    style={{
      zIndex: 2,
      width: 24,
      height: 24,
      color: '#5472d3',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      pointerEvents: 'none',
    }}
  >
    <div style={{ height: '20px', width: '20px', backgroundColor: '#ffffff' }} />
    {children}
  </div>
);

const Line = ({ isFirst, isLast, treeXLevel, children }) => {
  return (
    <>
      <div
        style={{
          zIndex: 1,
          display: 'inline-block',
          width: '9px',
          height: '40px',
          pointerEvents: 'none',
        }}
      >
        <div
          className="line"
          style={{
            position: 'absolute',
            top: isFirst ? '20px' : '0',
            left: `${19 + treeXLevel * 20}px`,
            width: '1px',
            height: isLast ? '20px' : '40px',
          }}
        />
        <div
          className="line"
          style={{
            position: 'absolute',
            top: '20px',
            left: `${19 + treeXLevel * 20}px`,
            width: '18px',
            height: '1px',
          }}
        />
      </div>

      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          minWidth: 0,
        }}
      >
        <span
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {children}
        </span>
      </span>
    </>
  );
};

const Component = () => {
  const data = { nodes };

  const isLastChild = (nodes, node) => {
    const parentNode = findNodeById(
      nodes,
      node.parentNode?.id ? node.parentNode.id.toString() : null,
    );

    if (!parentNode && nodes[nodes.length - 1].id === node.id) {
      return true;
    } else if (!parentNode && nodes[nodes.length - 1].id !== node.id) {
      return false;
    }

    if (!parentNode?.nodes) return true;
    return parentNode?.nodes[parentNode?.nodes.length - 1].id === node.id;
  };

  const isFirstChild = (nodes, node) => {
    return nodes[0].id === node.id;
  };

  const theme = useTheme({
    Cell: `
        height: 40px;

        position: relative;

        &:nth-of-type(1) {
          margin-left: 8px;
          padding-left: 8px;
        }

        & .line {
          background-color: #0097e0;
        }

        &:first-of-type div {
          max-width: 100%;

          height: 100%;
          display: flex;
          align-items: center;
        }

        & .line-icon-container > * {
          position: absolute;
          pointer-events: none;
        }
      `,
  });

  const tree = useTree(
    data,
    {
      onChange: onTreeChange,
    },
    {
      treeIcon: {
        margin: '4px',
        iconDefault: (
          <LineIcon>
            <InsertDriveFileOutlinedIcon fontSize="small" />
          </LineIcon>
        ),
        iconRight: (
          <LineIcon>
            <FolderIcon fontSize="small" />
          </LineIcon>
        ),
        iconDown: (
          <LineIcon>
            <FolderOpenIcon fontSize="small" />
          </LineIcon>
        ),
      },
    },
  );

  function onTreeChange(action, state) {
    console.log(action, state);
  }

  return (
    <Table data={data} theme={theme} tree={tree}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Task</HeaderCell>
              <HeaderCell>Deadline</HeaderCell>
              <HeaderCell>Type</HeaderCell>
              <HeaderCell>Complete</HeaderCell>
              <HeaderCell>Tasks</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item, index) => (
              <Row key={item.id} item={item}>
                <CellTree item={item}>
                  <Line
                    isFirst={isFirstChild(data.nodes, item)}
                    isLast={isLastChild(data.nodes, item)}
                    treeXLevel={item.treeXLevel}
                  >
                    {item.name}
                  </Line>
                </CellTree>
                <Cell>
                  {item.deadline.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </Cell>
                <Cell>{item.type}</Cell>
                <Cell>{item.isComplete.toString()}</Cell>
                <Cell>{item.nodes?.length}</Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default Component;
