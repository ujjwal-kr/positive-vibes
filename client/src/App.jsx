import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Settings from "./pages/settings"
import News from "./pages/news"
import Nav from "./components/navbar"

import { ContentWrapper } from "./styled/main"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"


function App() {

  return (
    <BrowserRouter>

      <Nav />
      <ContentWrapper>

        <Routes>

          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/news/:id" element={<News />} />

        </Routes>
      </ContentWrapper>
    </BrowserRouter>
  )
}

export default App