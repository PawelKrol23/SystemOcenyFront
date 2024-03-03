import React from 'react'
import ReactDOM from 'react-dom/client'
import { SOPContextProvider } from './Context/ContextProvider.tsx'
import App from './App.tsx'
import theme from './Theme/theme.ts'
import { ThemeProvider } from '@mui/material/styles'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SOPContextProvider>
          <App />
      </SOPContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

