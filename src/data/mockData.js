// Mock data for orders
export const mockOrders = [
  {
    id: 1,
    customer: "Juan Pérez",
    date: "2024-01-15",
    status: "delivered",
    products: [
      { name: "Laptop Dell", quantity: 1, price: 899.99 },
      { name: "Mouse Inalámbrico", quantity: 2, price: 25.50 }
    ]
  },
  {
    id: 2,
    customer: "María González",
    date: "2024-01-18",
    status: "shipped",
    products: [
      { name: "Smartphone Samsung", quantity: 1, price: 699.99 },
      { name: "Funda Protectora", quantity: 1, price: 15.99 }
    ]
  },
  {
    id: 3,
    customer: "Carlos Rodríguez",
    date: "2024-01-20",
    status: "pending",
    products: [
      { name: "Tablet iPad", quantity: 1, price: 549.99 },
      { name: "Teclado Bluetooth", quantity: 1, price: 89.99 },
      { name: "Stylus", quantity: 1, price: 99.99 }
    ]
  },
  {
    id: 4,
    customer: "Ana Martínez",
    date: "2024-01-22",
    status: "pending",
    products: [
      { name: "Monitor 4K", quantity: 1, price: 399.99 },
      { name: "Cable HDMI", quantity: 1, price: 12.99 }
    ]
  },
  {
    id: 5,
    customer: "Luis Fernández",
    date: "2024-01-25",
    status: "delivered",
    products: [
      { name: "Auriculares Sony", quantity: 1, price: 199.99 }
    ]
  }
];

// Order status options
export const ORDER_STATUSES = {
  PENDING: 'pending',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered'
};

// Status labels in Spanish
export const STATUS_LABELS = {
  [ORDER_STATUSES.PENDING]: 'Pendiente',
  [ORDER_STATUSES.SHIPPED]: 'Enviado',
  [ORDER_STATUSES.DELIVERED]: 'Entregado'
};
