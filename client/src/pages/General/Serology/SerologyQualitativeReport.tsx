import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../../components/NavBar';
import { Modal, Radio, RadioGroup, FormControlLabel, TextField, Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table';

interface AnalyteData {
  closedDate: string;
  value: number;
  mean: number;
  stdDevi: number;
  analyteName: string;
  minLevel: number;
  maxLevel: number;
  initials: string;
  comment: string;
}

interface TableData {
  runDate: string;
  runTime: string;
  result: string;
  tech: string;
  comments: string;
}

const SerologyQualitativeReport = () => {
  const { fileName, lotNumber, analyteName } = useParams<{ fileName: string; lotNumber: string; analyteName: string }>();
  const [analyteData, setAnalyteData] = useState<AnalyteData[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [qcStatus, setQcStatus] = useState<string | null>(null);
  const [qcComment, setQcComment] = useState<string>('');

  useEffect(() => {
    const fetchAnalyteData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/AnalyteReport/${analyteName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          console.error('Error fetching analyte data:', res.statusText);
          return;
        }

        const data = await res.json();
        console.log('data:', data);

        const analyteValues = data.map((record: any) => ({
          closedDate: record.closedDate,
          value: parseFloat(record.analyteValue),
          mean: record.mean,
          stdDevi: record.stdDevi,
          analyteName: record.analyteName,
          minLevel: record.minLevel,
          maxLevel: record.maxLevel,
          initials: record.initials,
          comment: record.comment,
        }));

        setAnalyteData(analyteValues);

        const tableRows = analyteValues.map((analyte: AnalyteData) => {
          const runDateTime = new Date(analyte.closedDate);
          const runDate = runDateTime.toLocaleDateString();
          const runTime = runDateTime.toLocaleTimeString();
          return {
            runDate,
            runTime,
            result: analyte.value.toFixed(2),
            tech: analyte.initials,
            comments: analyte.comment,
          };
        });

        setTableData(tableRows);

        console.log('tableRows:', tableRows);
        console.log('analyteValues:', analyteValues);
      } catch (error) {
        console.error("Error fetching analyte data:", error);
      }
    };

    fetchAnalyteData();
  }, [analyteName]);

  const generatePDF = async () => {
    const input = document.getElementById('pdfContent');
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 600, canvas.height * 0.75);
      pdf.save('QualitativeReport.pdf');
    }
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleQcStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQcStatus(event.target.value);
    if (event.target.value === 'approved') {
      setQcComment('');
    }
  };

  const saveComment = () => {
    if (qcStatus === 'concern') {
      // Save the comment logic here
    }
    handleModalClose();
  };

  const columns: ColumnDef<TableData>[] = [
    {
      accessorKey: 'runDate',
      header: 'Run Date',
      cell: (info) => info.getValue(),
      minSize: 50,
      maxSize: 50,
    },
    {
      accessorKey: 'runTime',
      header: 'Run Time',
      cell: (info) => info.getValue(),
      minSize: 50,
      maxSize: 50,
    },
    {
      accessorKey: 'result',
      header: 'Result',
      cell: (info) => info.getValue(),
      minSize: 20,
      maxSize: 20,
    },
    {
      accessorKey: 'tech',
      header: 'Tech',
      cell: (info) => info.getValue(),
      minSize: 20,
      maxSize: 20,
    },
    {
      accessorKey: 'comments',
      header: 'Comments',
      cell: (info) => info.getValue(),
      minSize: 300,
      maxSize: 500,
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <NavBar name={`Review Controls: ${fileName}`} />

      <h2 style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
        Qualitative Report: {analyteName}
      </h2>

      <div style={{ marginTop: '20px', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      padding: '10px',
                      borderBottom: '1px solid #ccc',
                      textAlign: 'left',
                      backgroundColor: '#3A6CC6',
                      color: 'white',
                      border: '1px solid #ccc',
                      width: header.column.columnDef.minSize || 100,
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? '#DAE3F3' : '#B0C4DE',
                  height: '40px',
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    style={{
                      padding: '10px',
                      borderBottom: '1px solid #ccc',
                      border: '1px solid #ccc',
                      width: cell.column.columnDef.minSize || 100,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
        <div style={{ flex: '0 0 180px', marginRight: '20px' }}>
          <div style={{ fontWeight: 'bold', marginTop: '30px' }}>
            <div>QC Panel: {fileName}</div>
            <div>Lot #: {lotNumber}</div>
            <div style={{ fontWeight: 'normal' }}>Closed Date: {analyteData.length > 0 ? analyteData[0].closedDate : ''}</div>
            <div>Analyte: {analyteName}</div>
            <div style={{ fontWeight: 'normal' }}>Minimum Range: {analyteData.length > 0 ? analyteData[0].minLevel : ''}</div>
            <div style={{ fontWeight: 'normal' }}>Maximum: {analyteData.length > 0 ? analyteData[0].maxLevel : ''}</div>
          </div>
        </div>

        <div style={{ flex: '0 0 180px', marginLeft: '20px', marginTop: '30px' }}>
          <div style={{ fontWeight: 'bold' }}>Review Date:</div>
          <div>Start Date: mm/dd/yyyy</div>
          <div>Close Date: mm/dd/yyyy</div>
          <Button variant="outlined" style={{ marginTop: '30px', width: '100%' }}>LEARN</Button>
          <Button variant="outlined" style={{ marginTop: '10px', width: '100%' }}>STUDENT NOTES</Button>
          <Button
            variant="outlined"
            style={{ marginTop: '80px', width: '100%' }}
            onClick={handleModalOpen}
          >
            Review Comments
          </Button>
          <Button variant="outlined" onClick={generatePDF} style={{ marginTop: '10px', width: '100%' }}>Qualitative Report</Button>
        </div>
      </div>

      {/* Modal for review comments */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div style={{ backgroundColor: 'white', padding: '20px', margin: 'auto', marginTop: '100px', width: '400px', borderRadius: '8px' }}>
          <h3>REVIEW COMMENT OPTIONS:</h3>
          <RadioGroup value={qcStatus} onChange={handleQcStatusChange}>
            <FormControlLabel value="approved" control={<Radio />} label="QC Approved" />
            <FormControlLabel value="concern" control={<Radio />} label="QC Concern/Corrective Action" />
          </RadioGroup>
          {qcStatus === 'concern' && (
            <TextField
              label="Concern/Corrective Action"
              multiline
              rows={4}
              value={qcComment}
              onChange={(e) => setQcComment(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginTop: '20px' }}
            />
          )}
          <Button variant="contained" onClick={saveComment} style={{ marginTop: '20px' }}>
            Save Comment to Report
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SerologyQualitativeReport;