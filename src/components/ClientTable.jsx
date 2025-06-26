import React, { useState } from 'react';
import { FaSort } from 'react-icons/fa';

function ClientTable({ data, onEdit, onDelete, selected, setSelected, onSendMessage }) {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = [...data];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      const valA = a[sortConfig.key] ? a[sortConfig.key].toString().toLowerCase() : '';
      const valB = b[sortConfig.key] ? b[sortConfig.key].toString().toLowerCase() : '';
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-primary-100 text-primary-800">
            <th className="p-2"><input type="checkbox" onChange={(e) => setSelected(e.target.checked ? data.map(d => d._id) : [])} checked={selected.length === data.length && data.length > 0} /></th>
            {['nome','cognome','cellulare','inizioCopertura','assicurazione','premioLordo'].map(key => (
              <th key={key} className="p-2 cursor-pointer" onClick={() => requestSort(key)}>
                <span className="flex items-center gap-1 capitalize">{key} <FaSort className="inline-block" /></span>
              </th>
            ))}
            <th className="p-2">WhatsApp</th>
            <th className="p-2">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(c => (
            <tr key={c._id} className="border-t hover:bg-gray-50">
              <td className="p-2"><input type="checkbox" checked={selected.includes(c._id)} onChange={() => toggleSelect(c._id)} /></td>
              <td className="p-2">{c.nome}</td>
              <td className="p-2">{c.cognome}</td>
              <td className="p-2">{c.cellulare}</td>
              <td className="p-2">{new Date(c.inizioCopertura).toLocaleDateString()}</td>
              <td className="p-2">{c.assicurazione}</td>
              <td className="p-2">{c.premioLordo}</td>
              <td className="p-2">
                <button onClick={() => onSendMessage(c)}>
                  <img src="/whatsapp-icon.png" alt="WhatsApp" className="w-5 inline" />
                </button>
              </td>
              <td className="p-2 space-x-1">
                <button className="btn-primary" onClick={() => onEdit(c)}>Modifica</button>
                <button className="btn-danger" onClick={() => onDelete(c._id)}>Elimina</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientTable;
