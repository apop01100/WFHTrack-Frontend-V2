import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/404'
import LoginUser from './pages/LoginUser'
import LoginAdmin from './pages/LoginAdmin'
import Admin from './pages/Admin'
import ProtectedRoute from './components/Auth/ProctedRoute'

function App() {
  return (
    <>
      <div className="flex h-screen w-screen p-4 justify-center items-center">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
