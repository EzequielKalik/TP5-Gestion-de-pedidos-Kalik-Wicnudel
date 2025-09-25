import React, { useState, useMemo } from 'react';
import OrderList from './OrderList.jsx';
import OrderFilter from './OrderFilter.jsx';
import OrderStats from './OrderStats.jsx';

const Dashboard = ({ orders }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);

  // Filter orders based on selected status
  const filteredOrders = useMemo(() => {
    if (!selectedStatus) {
      return orders;
    }
    return orders.filter(order => order.status === selectedStatus);
  }, [orders, selectedStatus]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Sistema de Gestión de Pedidos - MailAméricas</h1>
        <p>Gestiona y visualiza todos los pedidos de tiendas online</p>
      </header>

      <div className="dashboard-content">
        {/* Statistics Section */}
        <section className="stats-section">
          <OrderStats orders={orders} />
        </section>

        {/* Filter Section */}
        <section className="filter-section">
          <OrderFilter 
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
          />
        </section>

        {/* Orders List Section */}
        <section className="orders-section">
          <OrderList orders={filteredOrders} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
