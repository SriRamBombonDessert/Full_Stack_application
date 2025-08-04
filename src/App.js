import { BrowserRouter as Router, Routes, Route } from "next/link"
import { MenuProvider } from "./contexts/MenuContext"
import HomePage from "./pages/HomePage"
import CustomerView from "./pages/CustomerView"
import AdminView from "./pages/AdminView"
import "./App.css"

function App() {
  return (
    <MenuProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customer" element={<CustomerView />} />
            <Route path="/admin" element={<AdminView />} />
          </Routes>
        </div>
      </Router>
    </MenuProvider>
  )
}

export default App
