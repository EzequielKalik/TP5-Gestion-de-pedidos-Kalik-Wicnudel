import { ORDER_STATUSES } from '../data/mockData.js';

// Validation functions for orders
export const validateOrder = (order) => {
  const errors = {};

  // Customer validation - minimum 3 characters
  if (!order.customer || order.customer.trim().length < 3) {
    errors.customer = 'El nombre del cliente debe tener al menos 3 caracteres';
  }

  // Products validation
  if (!order.products || order.products.length === 0) {
    errors.products = 'El pedido debe tener al menos un producto';
  } else {
    // Validate each product
    order.products.forEach((product, index) => {
      if (!product.quantity || product.quantity <= 0) {
        errors[`product_${index}_quantity`] = `La cantidad del producto ${index + 1} debe ser mayor a 0`;
      }
      if (!product.name || product.name.trim().length === 0) {
        errors[`product_${index}_name`] = `El nombre del producto ${index + 1} es requerido`;
      }
      if (!product.price || product.price <= 0) {
        errors[`product_${index}_price`] = `El precio del producto ${index + 1} debe ser mayor a 0`;
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Apply default values to order
export const applyOrderDefaults = (order) => {
  return {
    ...order,
    status: order.status || ORDER_STATUSES.PENDING,
    date: order.date || new Date().toISOString().split('T')[0],
    id: order.id || Date.now()
  };
};

// Calculate order total
export const calculateOrderTotal = (products) => {
  return products.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
};
