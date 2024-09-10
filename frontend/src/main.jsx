import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.jsx'
import './index.css'
import 'react-quill/dist/quill.snow.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <NextUIProvider>
    <App />
  </NextUIProvider>
  </StrictMode>,
)
