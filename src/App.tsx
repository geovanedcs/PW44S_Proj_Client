import './App.css'
import {Route, Routes} from "react-router-dom";
import {UserSignUpPage} from "./pages/UserSignUpPage";
import {LoginPage} from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<UserSignUpPage />} />
      </Routes>
    </>
  )
}

export default App