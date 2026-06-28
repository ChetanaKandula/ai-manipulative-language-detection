import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Analyzer from "./pages/Analyzer"
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop"
import Register from "./pages/Register";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") ?? "dark")

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        <Route
          path="/"
          element={<Home theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/analyze"
          element={<Analyzer theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
          path="/login"
          element={<Login theme={theme} toggleTheme={toggleTheme} />}
        />

        <Route
  path="/register"
  element={<Register theme={theme} toggleTheme={toggleTheme} />}
/>

      </Routes>

    </BrowserRouter>
  )
}

export default App