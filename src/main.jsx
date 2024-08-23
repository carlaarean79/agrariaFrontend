import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProviderContext } from './Contexto/Contexto';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <ProviderContext>
    <App />
    </ProviderContext>
     </React.StrictMode>,
)
