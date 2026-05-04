import { Routes, Route } from "react-router-dom";
import Events from "./components/Events";
import Blog from "./components/Blog";
import Admin from "./components/Admin";
import Login from "./components/Login";
import { QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import { query } from "./util/http";
export default function App() {
  return (
    <QueryClientProvider client={query}>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </QueryClientProvider>
  );
}
