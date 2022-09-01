import "./App.css";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Posts } from "./Posts";

const queryClient = new QueryClient();

const App: FC = () => (
  <div className="app">
    <QueryClientProvider client={queryClient}>
      <section className="hero is-info">
        <div className="hero-body">
          <p className="title">Emotter</p>
          <p className="subtitle">post and share your emoji!</p>
        </div>
      </section>
      <section className="section">
        <Posts />
      </section>
    </QueryClientProvider>
  </div>
);

export default App;
