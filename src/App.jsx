import { BrowserRouter, Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import LoginPage from "./pages/LoginPage"
import PrivateRoutes from "./components/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/" element={<Room />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}