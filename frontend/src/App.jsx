import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Analyzer from "./pages/Analyzer"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/analyze"
          element={<Analyzer />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App