import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Posts } from "./Posts";

const queryClient = new QueryClient();

const App: FC = () => (
  <div className="App">
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  </div>
);

export default App;
