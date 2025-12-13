import { BrowserRouter, Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import LoginPage from "./pages/LoginPage"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<Room/>}/>
            </Routes>
        </BrowserRouter>
    )
}