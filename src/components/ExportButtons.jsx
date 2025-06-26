import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function ExportButtons({ data, selected }) {
  const exportData = selected.length ? data.filter(d => selected.includes(d._id)) : data;

  const handleCSV = () => {
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clienti');
    XLSX.writeFile(wb, 'clienti.csv');
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    const tableData = exportData.map(d => [d.nome, d.cognome, d.cellulare, d.assicurazione, d.premioLordo]);
    autoTable(doc, { head: [['Nome', 'Cognome', 'Cellulare', 'Assicurazione', 'Premio']], body: tableData });
    doc.save('clienti.pdf');
  };

  return (
    <div className="space-x-2">
      <button onClick={handleCSV} className="btn-gray">Esporta CSV</button>
      <button onClick={handlePDF} className="btn-gray">Esporta PDF</button>
    </div>
  );
}

export default ExportButtons;
