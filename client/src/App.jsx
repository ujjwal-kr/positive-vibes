import Nav from './components/nav'
import TopContent from "./components/top-content"
import MobileTemp from './components/mobile-temp'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import { MainWrapper } from './styles/main-wrapper'
import { DesktopItems, MobileItems } from './styles/responsive'

import Home from './pages/home'
import News from "./pages/news"
import Search from './pages/search'

function App() {

    return (
    <BrowserRouter>
      <Nav />
      <MainWrapper>

        <DesktopItems>
          <TopContent />
        </DesktopItems>

        <MobileItems>
          <MobileTemp />
        </MobileItems>

        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/news/:id" element={<News/>} />
          <Route path="/search/:term" element={<Search />} />
        </Routes>
      </MainWrapper>

    </BrowserRouter>
  )
}

export default App
