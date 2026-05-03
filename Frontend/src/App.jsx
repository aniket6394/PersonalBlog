import { Routes, Route } from "react-router-dom";
import Events from "./components/Events";
import Header from "./components/Header";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export default function App() {
  const query = new QueryClient();
  return (
    <QueryClientProvider client={query}>
      <Routes>
        <Route path="/" element={<Events />} />
      </Routes>
    </QueryClientProvider>
  );
}
