// Alerta.jsx
import React from 'react';
import './Alerta.css'; // Asumiendo que tienes un archivo CSS para Alerta

const Alerta = ({ isOpen, texto, proceso, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-container">
      <p>{texto}</p>
      <button onClick={onConfirm}>Confirmar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default Alerta;
