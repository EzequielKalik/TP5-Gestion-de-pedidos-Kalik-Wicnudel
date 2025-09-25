import { useState } from 'react'
import Dashboard from './components/Dashboard.jsx'
import NewOrderForm from './components/NewOrderForm.jsx'
import { mockOrders } from './data/mockData.js'
import './App.css'

function App() {
  const [orders, setOrders] = useState(mockOrders)
  const [showNewOrderForm, setShowNewOrderForm] = useState(false)

  const handleAddOrder = (newOrder) => {
    setOrders(prevOrders => [...prevOrders, newOrder])
    setShowNewOrderForm(false)
  }

  const handleCancelNewOrder = () => {
    setShowNewOrderForm(false)
  }

  return (
    <div className="app">
      {showNewOrderForm ? (
        <NewOrderForm 
          onOrderAdd={handleAddOrder}
          onCancel={handleCancelNewOrder}
        />
      ) : (
        <Dashboard orders={orders} />
      )}
      <div className="app-actions">
        <button 
          onClick={() => setShowNewOrderForm(true)}
          className="new-order-btn"
          disabled={showNewOrderForm}
          title={showNewOrderForm ? 'Complete o cancele el formulario para crear otro pedido' : 'Crear nuevo pedido'}
        >
          {showNewOrderForm ? 'Creando pedido...' : '+ Nuevo Pedido'}
        </button>
      </div>
    </div>
  )
}

export default App
