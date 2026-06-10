import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { logado } = useAuth()

  if (!logado) {
    return <Navigate to="/login" />
  }

  return children
}
