import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { UserProvider } from './context/UserContext'
import { PropertyProvider } from './context/PropertyContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <PropertyProvider>
    <App />
    <Toaster/>
    </PropertyProvider>
    </UserProvider>
  </StrictMode>,
)
