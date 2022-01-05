/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { nodes } from '../data';

storiesOf('Kitchen Sink/PDF Download', module)
  .addParameters({ component: Table })
  .add('base', () => {
    const data = { nodes };

    const printRef = React.useRef();

    const handleDownloadPdf = async () => {
      const element = printRef.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight =
        (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('print.pdf');
    };

    return (
      <>
        <button type="button" onClick={handleDownloadPdf}>
          Download as PDF
        </button>

        <div ref={printRef}>
          <Table data={data}>
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
                  {tableList.map((item) => (
                    <Row key={item.id} item={item}>
                      <Cell>{item.name}</Cell>
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
        </div>
      </>
    );
  })
  .add('documentation', () => (
    <ul>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.robinwieruch.de/react-component-to-pdf/"
        >
          Tutorial
        </a>
      </li>
      <li>
        <a href="https://github.com/table-library/react-table-library/tree/master/.storybook/stories">
          Story Code
        </a>
      </li>
    </ul>
  ));
