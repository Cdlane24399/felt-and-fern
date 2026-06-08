import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@google/model-viewer'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './lib/cart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
