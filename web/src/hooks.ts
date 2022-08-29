import useSWR, { SWRResponse } from "swr";
import {
  CallOptions,
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { PartialMessage } from "@bufbuild/protobuf";
import { EmotterService } from "../gen/emotter/v1/emotter_connectweb";
import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostsRequest,
  ListPostsResponse,
} from "../gen/emotter/v1/emotter_pb";
import { useCallback, useState } from "react";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});
const client = createPromiseClient(EmotterService, transport);

type SWRRequest<T extends any> = {
  method: string;
  request: T;
};

function listPostsFetcher(
  req: SWRRequest<PartialMessage<ListPostsRequest>>
): Promise<ListPostsResponse> {
  return client.listPosts(req);
}

export function useListPosts(
  request: PartialMessage<ListPostsRequest>
): SWRResponse<ListPostsResponse> {
  return useSWR(
    { method: EmotterService.methods.listPosts.name, request },
    listPostsFetcher
  );
}

type MutationResult<Data = any, Error = any> = {
  data?: Data;
  error?: Error;
  loading: boolean;
};

type MutationTuple<Request = any, Response = any, Error = any> = [
  executor: (request: Request, options?: CallOptions | undefined) => void,
  result: MutationResult<Response, Error>
];

type MutationOptions = {
  onCompleted?: () => void;
};

export function useCreatePostMutation(
  opts?: MutationOptions
): MutationTuple<PartialMessage<CreatePostRequest>, CreatePostResponse> {
  const [state, setState] = useState<MutationResult<CreatePostResponse>>({
    loading: false,
  });
  const executor = useCallback(
    (
      req: PartialMessage<CreatePostRequest>,
      options?: CallOptions | undefined
    ) => {
      setState((curr) => ({ ...curr, loading: true }));
      client
        .createPost(req, options)
        .then((data) => setState((curr) => ({ ...curr, data })))
        .catch((error) => setState((curr) => ({ ...curr, error })))
        .finally(() => {
          setState((curr) => ({ ...curr, loading: false }));
          opts?.onCompleted?.();
        });
    },
    [setState, opts?.onCompleted]
  );
  return [executor, state];
}
