import "./App.css";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Posts } from "./Posts";
import { createConnectTransport } from "@bufbuild/connect-web";
import { EmotterServiceClientProvider } from "./client";

const queryClient = new QueryClient();
console.log(import.meta.env);
const transport = createConnectTransport({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

const App: FC = () => (
  <div className="app">
    <QueryClientProvider client={queryClient}>
      <EmotterServiceClientProvider transport={transport}>
        <section className="hero is-info is-small">
          <div className="hero-body columns">
            <div className="column">
              <p className="title">Emotter</p>
              <p className="subtitle">post and share your emoji!</p>
            </div>
            <div
              className="column is-one-quarter"
              style={{ textAlign: "right" }}
            >
              <a
                className="button is-info is-inverted"
                href="https://github.com/syumai/emotter"
              >
                <span className="icon is-large">
                  <i className="fab fa-github fa-2x"></i>
                </span>
              </a>
            </div>
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
