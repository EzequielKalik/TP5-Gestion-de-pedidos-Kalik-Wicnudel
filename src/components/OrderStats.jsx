import React from 'react';
import { ORDER_STATUSES, STATUS_LABELS } from '../data/mockData.js';

const OrderStats = ({ orders }) => {
  // Calculate statistics
  const totalOrders = orders.length;
  
  const statsByStatus = Object.values(ORDER_STATUSES).reduce((stats, status) => {
    stats[status] = orders.filter(order => order.status === status).length;
    return stats;
  }, {});

  const getStatusIcon = (status) => {
    switch (status) {
      case ORDER_STATUSES.PENDING:
        return '⏳';
      case ORDER_STATUSES.SHIPPED:
        return '🚚';
      case ORDER_STATUSES.DELIVERED:
        return '✅';
      default:
        return '📦';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case ORDER_STATUSES.PENDING:
        return '#f59e0b';
      case ORDER_STATUSES.SHIPPED:
        return '#3b82f6';
      case ORDER_STATUSES.DELIVERED:
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="order-stats">
      <h3>Estadísticas de Pedidos</h3>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h4>Total de Pedidos</h4>
            <p className="stat-number">{totalOrders}</p>
          </div>
        </div>

        {Object.values(ORDER_STATUSES).map((status) => (
          <div key={status} className="stat-card">
            <div className="stat-icon">{getStatusIcon(status)}</div>
            <div className="stat-content">
              <h4>{STATUS_LABELS[status]}</h4>
              <p 
                className="stat-number"
                style={{ color: getStatusColor(status) }}
              >
                {statsByStatus[status]}
              </p>
              <p className="stat-percentage">
                {totalOrders > 0 ? Math.round((statsByStatus[status] / totalOrders) * 100) : 0}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStats;
