import "./App.css";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Posts } from "./Posts";
import { createConnectTransport } from "@bufbuild/connect-web";
import { EmotterServiceClientProvider } from "./client";

const queryClient = new QueryClient();
const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

const App: FC = () => (
  <div className="app">
    <QueryClientProvider client={queryClient}>
      <EmotterServiceClientProvider transport={transport}>
        <section className="hero is-info">
          <div className="hero-body">
            <p className="title">Emotter</p>
            <p className="subtitle">post and share your emoji!</p>
          </div>
        </section>
        <section className="section">
          <Posts />
        </section>
      </EmotterServiceClientProvider>
    </QueryClientProvider>
  </div>
);

export default App;
