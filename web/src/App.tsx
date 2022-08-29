import { useEffect, useState } from 'react';
import './App.css';

import { EmotterService } from '../gen/emotter/v1/emotter_connectweb';
import { createConnectTransport, createPromiseClient } from '@bufbuild/connect-web';

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});
const client = createPromiseClient(EmotterService, transport)

function App() {
  return <div className="App"></div>;
}

export default App;
