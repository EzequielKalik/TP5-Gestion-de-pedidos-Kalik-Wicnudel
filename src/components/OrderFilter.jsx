import React from 'react';
import { ORDER_STATUSES, STATUS_LABELS } from '../data/mockData.js';

const OrderFilter = ({ selectedStatus, onStatusChange }) => {
  const handleStatusChange = (event) => {
    const status = event.target.value;
    onStatusChange(status === 'all' ? null : status);
  };

  return (
    <div className="order-filter">
      <h4>Filtrar por Estado</h4>
      <div className="filter-controls">
        <select 
          value={selectedStatus || 'all'} 
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="all">Todos los estados</option>
          {Object.values(ORDER_STATUSES).map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-buttons">
        <button 
          onClick={() => onStatusChange(null)}
          className={`filter-btn ${!selectedStatus ? 'active' : ''}`}
        >
          Todos
        </button>
        {Object.values(ORDER_STATUSES).map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`filter-btn ${selectedStatus === status ? 'active' : ''}`}
          >
            {STATUS_LABELS[status]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderFilter;
