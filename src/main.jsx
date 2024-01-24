import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import App from './App.jsx'
import RecommendPage from './components/RecommendPage.jsx'

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
  <Router>
    <ConfigProvider locale={enUS}>
      <Routes>
        {/* <Route path="*"   element={<RecommendPage />}/>  */}
        <Route path="*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<App />} />
      </Routes>
    </ConfigProvider>
  </Router>

)
