import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/Login";
import Secure from "./components/Secure";
import './App.css'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/snbcheck/" element={<Login />} />
                    <Route path="/snbcheck/secure" element={<Secure />} />
                </Routes>
            </Router>
        </>
    );
}

export default App