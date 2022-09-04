import "./App.css";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Posts } from "./Posts";
import { createConnectTransport } from "@bufbuild/connect-web";
import { EmotterServiceClientProvider } from "./client";
import { Hero } from "./Hero";

const queryClient = new QueryClient();
console.log(import.meta.env);
const transport = createConnectTransport({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

const App: FC = () => (
  <div className="app">
    <QueryClientProvider client={queryClient}>
      <EmotterServiceClientProvider transport={transport}>
        <Hero />
        <Posts />
      </EmotterServiceClientProvider>
    </QueryClientProvider>
  </div>
);

export default App;
