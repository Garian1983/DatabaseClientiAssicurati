import React, { useEffect, useState } from 'react';
import ClientForm from './components/ClientForm';
import ClientTable from './components/ClientTable';
import ExportButtons from './components/ExportButtons';
import api from './api';

function App() {
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  // Load clients at mount
  const fetchClients = () =>
    api.get('/clients')
       .then(res => setClients(res.data))
       .catch(console.error);

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSave = (data) => {
    if (editingClient) {
      api.put(`/clients/${editingClient._id}`, data).then(fetchClients);
    } else {
      api.post('/clients', data).then(fetchClients);
    }
    setShowForm(false);
    setEditingClient(null);
  };

  const handleDelete = (id) => {
    if (confirm('Confermi eliminazione?')) {
      api.delete(`/clients/${id}`).then(fetchClients);
    }
  };

  const handleSendMessage = (client) => {
    const text = encodeURIComponent('La tua polizza è in scadenza, ti invitiamo in ufficio per visionare la nuova proposta!');
    window.open(`https://wa.me/${client.cellulare}?text=${text}`, '_blank');
    // log message
    api.post('/messages', { clientId: client._id, text: decodeURIComponent(text) });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary-800 mb-4">Gestione Clienti Assicurativi</h1>

      {showForm ? (
        <ClientForm
          onCancel={() => { setShowForm(false); setEditingClient(null); }}
          onSave={handleSave}
          defaultValues={editingClient}
        />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => setShowForm(true)}
            >
              Aggiungi Cliente
            </button>

            <ExportButtons data={clients} selected={selected} />
          </div>

          <ClientTable
            data={clients}
            onEdit={(c) => { setEditingClient(c); setShowForm(true); }}
            onDelete={handleDelete}
            selected={selected}
            setSelected={setSelected}
            onSendMessage={handleSendMessage}
          />
        </>
      )}
    </div>
  );
}

export default App;
