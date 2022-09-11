import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Settings from "./pages/settings"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings /> } />

      </Routes>
    </BrowserRouter>
  )
}

export default App