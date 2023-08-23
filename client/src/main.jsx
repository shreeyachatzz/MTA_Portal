import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { EditContextProvider } from './EditContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EditContextProvider>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
    </EditContextProvider>
  </React.StrictMode>,
)
