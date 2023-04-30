import {
  createPromiseClient,
  PromiseClient,
  Transport,
} from "@bufbuild/connect";
import React, { FC, useContext, useMemo } from "react";
import { EmotterService } from "../gen/emotter/v1/emotter_connect";

const EmotterServiceClientContext = React.createContext<
  PromiseClient<typeof EmotterService> | undefined
>(undefined);

type ClientProviderProps = {
  transport: Transport;
  children?: React.ReactNode;
};

export const EmotterServiceClientProvider: FC<ClientProviderProps> = ({
  transport,
  children,
}) => {
  const client = useMemo(
    () => createPromiseClient(EmotterService, transport),
    [transport]
  );
  return (
    <EmotterServiceClientContext.Provider value={client}>
      {children}
    </EmotterServiceClientContext.Provider>
  );
};

export const useEmotterServiceClient = (): PromiseClient<
  typeof EmotterService
> => {
  const client = useContext(EmotterServiceClientContext);
  if (!client) {
    throw new Error(
      "EmotterServiceClient must be set, use EmotterServiceClientProvider to provide one"
    );
  }
  return client;
};
