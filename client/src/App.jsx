import Nav from './components/nav'
import TopContent from "./components/top-content/top-content"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { MainWrapper } from './styles/main-wrapper'
import Home from './pages/home'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <MainWrapper>
        <TopContent />

        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/news/:id" element={<></>} />
          <Route path="/search/:query" element={<></>} />
        </Routes>
      </MainWrapper>

    </BrowserRouter>
  )
}

export default App
