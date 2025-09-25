import React from 'react';
import { STATUS_LABELS } from '../data/mockData.js';
import { calculateOrderTotal } from '../utils/orderValidations.js';

const OrderItem = ({ order }) => {
  // Apply internal validations
  const validatedOrder = {
    ...order,
    customer: order.customer && order.customer.length >= 3 ? order.customer : 'Cliente inválido',
    status: order.status || 'pending',
    date: order.date || new Date().toISOString().split('T')[0],
    products: order.products?.filter(product => product.quantity > 0) || []
  };

  const total = calculateOrderTotal(validatedOrder.products);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f59e0b'; // amber
      case 'shipped':
        return '#3b82f6'; // blue
      case 'delivered':
        return '#10b981'; // green
      default:
        return '#6b7280'; // gray
    }
  };

  return (
    <div className="order-item">
      <div className="order-header">
        <div className="order-id">
          <strong>Pedido #{validatedOrder.id}</strong>
        </div>
        <div 
          className="order-status"
          style={{ 
            backgroundColor: getStatusColor(validatedOrder.status),
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        >
          {STATUS_LABELS[validatedOrder.status]}
        </div>
      </div>
      
      <div className="order-details">
        <div className="order-info">
          <p><strong>Cliente:</strong> {validatedOrder.customer}</p>
          <p><strong>Fecha:</strong> {new Date(validatedOrder.date).toLocaleDateString('es-ES')}</p>
        </div>
        
        <div className="order-products">
          <h4>Productos:</h4>
          {validatedOrder.products.length > 0 ? (
            <ul>
              {validatedOrder.products.map((product, index) => (
                <li key={index} className="product-item">
                  <span className="product-name">{product.name}</span>
                  <span className="product-details">
                    Cantidad: {product.quantity} | 
                    Precio: ${product.price?.toFixed(2)} | 
                    Subtotal: ${(product.quantity * product.price).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-products">No hay productos válidos en este pedido</p>
          )}
        </div>
        
        <div className="order-total">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
