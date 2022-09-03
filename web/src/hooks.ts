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
import { useEmotterServiceClient } from "./client";

export function useListPosts(
  request: PartialMessage<ListPostsRequest>
): UseQueryResult<ListPostsResponse> {
  const client = useEmotterServiceClient();
  return useQuery([EmotterService.methods.listPosts.name, request], () =>
    client.listPosts(request)
  );
}

export function useInvalidateListPostsQuery(): () => void {
  const queryClient = useQueryClient();
  return useCallback(
    (request?: PartialMessage<ListPostsRequest>) => {
      const keys: (string | PartialMessage<ListPostsRequest>)[] = [
        EmotterService.methods.listPosts.name,
      ];
      if (request) {
        keys.push(request);
      }
      queryClient.invalidateQueries(keys);
    },
    [queryClient]
  );
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
  const client = useEmotterServiceClient();
  return useMutation<
    PartialMessage<CreatePostResponse>,
    unknown,
    PartialMessage<CreatePostRequest>
  >((request) => client.createPost(request), options);
}
