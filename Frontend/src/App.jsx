import { Routes, Route } from "react-router-dom";
import Events from "./components/Events";
import Blog from "./components/Blog";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function App() {
  const query = new QueryClient();

  return (
    <QueryClientProvider client={query}>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </QueryClientProvider>
  );
}
