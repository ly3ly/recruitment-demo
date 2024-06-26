import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import AuthPage from './components/Auth.jsx'
import Register from './components/Register.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ConfigProvider locale={enUS}>
      <Routes>
        <Route path="*" element={<AuthPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<App />} />
      </Routes>
    </ConfigProvider>
  </Router>

)
