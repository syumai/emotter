import {
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
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useCallback } from "react";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});
const client = createPromiseClient(EmotterService, transport);

export function useListPosts(
  request: PartialMessage<ListPostsRequest>
): UseQueryResult<ListPostsResponse> {
  return useQuery([EmotterService.methods.listPosts.name, request], () =>
    client.listPosts(request)
  );
}

export function useInvalidateListPostsQuery(): () => void {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.invalidateQueries([EmotterService.methods.listPosts.name]);
  }, [queryClient]);
}

export function useCreatePostMutation(
  options?: UseMutationOptions<
    PartialMessage<CreatePostResponse>,
    unknown,
    PartialMessage<CreatePostRequest>
  >
): UseMutationResult<
  PartialMessage<CreatePostResponse>,
  unknown,
  PartialMessage<CreatePostRequest>
> {
  return useMutation<
    PartialMessage<CreatePostResponse>,
    unknown,
    PartialMessage<CreatePostRequest>
  >((request) => client.createPost(request), options);
}
