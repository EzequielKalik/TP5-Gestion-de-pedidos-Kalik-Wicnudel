import React, { useState } from 'react';
import { validateOrder, applyOrderDefaults } from '../utils/orderValidations.js';
import { ORDER_STATUSES, STATUS_LABELS } from '../data/mockData.js';

const NewOrderForm = ({ onOrderAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: '',
    status: ORDER_STATUSES.PENDING,
    date: new Date().toISOString().split('T')[0],
    products: [{ name: '', quantity: 1, price: 0 }]
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: field === 'quantity' || field === 'price' ? Number(value) : value
    };
    
    setFormData(prev => ({
      ...prev,
      products: updatedProducts
    }));

    // Clear product-specific errors
    const errorKey = `product_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: undefined
      }));
    }
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { name: '', quantity: 1, price: 0 }]
    }));
  };

  const removeProduct = (index) => {
    if (formData.products.length > 1) {
      const updatedProducts = formData.products.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        products: updatedProducts
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Apply defaults and validate
    const orderWithDefaults = applyOrderDefaults(formData);
    const validation = validateOrder(orderWithDefaults);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Submit the order
    onOrderAdd(orderWithDefaults);
    
    // Reset form
    setFormData({
      customer: '',
      status: ORDER_STATUSES.PENDING,
      date: new Date().toISOString().split('T')[0],
      products: [{ name: '', quantity: 1, price: 0 }]
    });
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <div className="new-order-form">
      <h3>Agregar Nuevo Pedido</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Customer Information */}
        <div className="form-section">
          <h4>Información del Cliente</h4>
          
          <div className="form-group">
            <label htmlFor="customer">Nombre del Cliente *</label>
            <input
              type="text"
              id="customer"
              value={formData.customer}
              onChange={(e) => handleInputChange('customer', e.target.value)}
              className={errors.customer ? 'error' : ''}
              placeholder="Ingrese el nombre del cliente (mínimo 3 caracteres)"
            />
            {errors.customer && <span className="error-message">{errors.customer}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Fecha del Pedido</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              {Object.values(ORDER_STATUSES).map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Information */}
        <div className="form-section">
          <h4>Productos</h4>
          
          {formData.products.map((product, index) => (
            <div key={index} className="product-form-group">
              <div className="product-header">
                <h5>Producto {index + 1}</h5>
                {formData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="remove-product-btn"
                  >
                    Eliminar
                  </button>
                )}
              </div>
              
              <div className="product-fields">
                <div className="form-group">
                  <label>Nombre del Producto *</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    className={errors[`product_${index}_name`] ? 'error' : ''}
                    placeholder="Nombre del producto"
                  />
                  {errors[`product_${index}_name`] && (
                    <span className="error-message">{errors[`product_${index}_name`]}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Cantidad *</label>
                  <input
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                    className={errors[`product_${index}_quantity`] ? 'error' : ''}
                  />
                  {errors[`product_${index}_quantity`] && (
                    <span className="error-message">{errors[`product_${index}_quantity`]}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Precio *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                    className={errors[`product_${index}_price`] ? 'error' : ''}
                    placeholder="0.00"
                  />
                  {errors[`product_${index}_price`] && (
                    <span className="error-message">{errors[`product_${index}_price`]}</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addProduct}
            className="add-product-btn"
          >
            + Agregar Producto
          </button>
          
          {errors.products && <span className="error-message">{errors.products}</span>}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="cancel-btn"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Crear Pedido'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewOrderForm;
