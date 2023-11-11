import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Router>
//     <ConfigProvider locale={enUS}>
//       <Routes>
//         <Route path='/' element={<App />} />
//       </Routes>
//     </ConfigProvider>
//   </Router>
// )
ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={enUS}>
    <App />
  </ConfigProvider>
)
