import MyLayout from "./components/MyLayout"
import TalentList from "./components/TalentList"
import DetailPage from "./components/DetailPage"
import { DataProvider } from './components/DataContext';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import SubjectList from "./components/SubjectList";
import Login from "./components/Login"
import RecommendPage from "./components/RecommendPage";

function App() {

  return (
    <DataProvider>
      <MyLayout>
        <Routes >
          {/* <Route path="/" element={<TalentList />} /> */}
          <Route path="/" element={<RecommendPage />} />
          {/* <Route path="/detail-page" element={<DetailPage />} /> */}
          <Route path="/subjects" element={<SubjectList />} />
        </Routes>
      </MyLayout>
    </DataProvider >
  )

}

export default App
