import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>  {/* Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>,
)
