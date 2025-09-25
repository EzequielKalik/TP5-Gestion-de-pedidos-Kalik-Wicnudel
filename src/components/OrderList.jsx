import React from 'react';
import OrderItem from './OrderItem.jsx';

const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="order-list-empty">
        <p>No hay pedidos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      <h3>Lista de Pedidos ({orders.length})</h3>
      <div className="orders-container">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
