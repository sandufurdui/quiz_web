import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login_page";
import Dashboard from "./pages/dash_page";
import Main from "./pages/main_page"
import About from "./pages/about_page"
import Register from "./pages/signup_page"
import Reset from "./pages/reset_page"

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/reset" element={<Reset />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
        </Router>
    </>
  );
}
export default App;