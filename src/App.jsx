import MyLayout from "./components/MyLayout"
import TalentList from "./components/TalentList"
import DetailPage from "./components/DetailPage"
import { DataProvider } from './components/DataContext';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <DataProvider>
      <MyLayout>
        <Router>
          <Routes>
            <Route path="/" element={<TalentList />} />
            <Route path="detail-page" element={<DetailPage />} />
          </Routes>
        </Router>
      </MyLayout>
    </DataProvider>
  )

}

export default App
