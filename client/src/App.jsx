import Nav from './components/nav'
import TopContent from "./components/top-content"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { MainWrapper } from './styles/main-wrapper'
import Home from './pages/home'
import News from "./pages/news"

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <MainWrapper>
        <TopContent />

        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/news/:id" element={<News/>} />
          <Route path="/search/:query" element={<></>} />
        </Routes>
      </MainWrapper>

    </BrowserRouter>
  )
}

export default App
