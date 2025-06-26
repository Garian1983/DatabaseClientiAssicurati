import React, { useState, useEffect } from 'react';

const initial = {
  nome: '', cognome: '', cellulare: '',
  tipologia: 'RC AUTO',
  targa: '', frazionamento: '12',
  dettaglio: '', tipologiaRamo: '', scadenzaRamo: '12', note: '', massimale: '', attivita: '',
  inizioCopertura: '', assicurazione: '', azienda: '', premioLordo: ''
};

function ClientForm({ onCancel, onSave, defaultValues }) {
  const [form, setForm] = useState(initial);

  useEffect(() => {
    if (defaultValues) setForm({ ...initial, ...defaultValues });
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const isRcAuto = form.tipologia === 'RC AUTO';

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Nome</label>
          <input name="nome" value={form.nome} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label className="block font-semibold">Cognome</label>
          <input name="cognome" value={form.cognome} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label className="block font-semibold">Cellulare</label>
          <input name="cellulare" value={form.cellulare} onChange={handleChange} className="input" required />
        </div>

        <div>
          <label className="block font-semibold">Tipologia</label>
          <select name="tipologia" value={form.tipologia} onChange={handleChange} className="input">
            <option>RC AUTO</option>
            <option>ALTRI RAMI</option>
          </select>
        </div>

        {isRcAuto ? (
          <>
            <div>
              <label className="block font-semibold">Targa</label>
              <input name="targa" value={form.targa} onChange={handleChange} className="input" required />
            </div>
            <div>
              <label className="block font-semibold">Frazionamento</label>
              <select name="frazionamento" value={form.frazionamento} onChange={handleChange} className="input">
                <option value="6">6 mesi</option>
                <option value="12">12 mesi</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block font-semibold">Dettaglio</label>
              <input name="dettaglio" value={form.dettaglio} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block font-semibold">Tipologia Ramo</label>
              <input name="tipologiaRamo" value={form.tipologiaRamo} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block font-semibold">Scadenza</label>
              <select name="scadenzaRamo" value={form.scadenzaRamo} onChange={handleChange} className="input">
                <option value="6">6 mesi</option>
                <option value="12">12 mesi</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Note</label>
              <input name="note" value={form.note} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block font-semibold">Massimale</label>
              <input name="massimale" value={form.massimale} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="block font-semibold">Tipologia Attività</label>
              <input name="attivita" value={form.attivita} onChange={handleChange} className="input" />
            </div>
          </>
        )}

        <div>
          <label className="block font-semibold">Inizio Copertura</label>
          <input type="date" name="inizioCopertura" value={form.inizioCopertura} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label className="block font-semibold">Società Assicurativa</label>
          <input name="assicurazione" value={form.assicurazione} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block font-semibold">Azienda</label>
          <input name="azienda" value={form.azienda} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block font-semibold">Premio Lordo</label>
          <input name="premioLordo" value={form.premioLordo} onChange={handleChange} className="input" />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" className="btn-gray" onClick={onCancel}>Annulla</button>
        <button type="submit" className="btn-primary">Salva</button>
      </div>
    </form>
  );
}

export default ClientForm;
