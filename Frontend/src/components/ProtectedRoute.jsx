import { Link } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div>
        <p>Not authorized 🚫</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return children;
}
