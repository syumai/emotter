// @generated by protoc-gen-es v1.2.0 with parameter "target=ts"
// @generated from file emotter/v1/emotter.proto (package emotter.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message emotter.v1.Post
 */
export class Post extends Message<Post> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string user_name = 2;
   */
  userName = "";

  /**
   * @generated from field: string emoji = 3;
   */
  emoji = "";

  /**
   * @generated from field: google.protobuf.Timestamp create_time = 4;
   */
  createTime?: Timestamp;

  constructor(data?: PartialMessage<Post>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "emotter.v1.Post";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "user_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "emoji", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "create_time", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Post {
    return new Post().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Post {
    return new Post().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Post {
    return new Post().fromJsonString(jsonString, options);
  }

  static equals(a: Post | PlainMessage<Post> | undefined, b: Post | PlainMessage<Post> | undefined): boolean {
    return proto3.util.equals(Post, a, b);
  }
}

/**
 * @generated from message emotter.v1.CreatePostRequest
 */
export class CreatePostRequest extends Message<CreatePostRequest> {
  /**
   * @generated from field: string user_name = 1;
   */
  userName = "";

  /**
   * @generated from field: string emoji = 2;
   */
  emoji = "";

  constructor(data?: PartialMessage<CreatePostRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "emotter.v1.CreatePostRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "emoji", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreatePostRequest {
    return new CreatePostRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreatePostRequest {
    return new CreatePostRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreatePostRequest {
    return new CreatePostRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreatePostRequest | PlainMessage<CreatePostRequest> | undefined, b: CreatePostRequest | PlainMessage<CreatePostRequest> | undefined): boolean {
    return proto3.util.equals(CreatePostRequest, a, b);
  }
}

/**
 * @generated from message emotter.v1.CreatePostResponse
 */
export class CreatePostResponse extends Message<CreatePostResponse> {
  /**
   * @generated from field: emotter.v1.Post post = 1;
   */
  post?: Post;

  constructor(data?: PartialMessage<CreatePostResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "emotter.v1.CreatePostResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "post", kind: "message", T: Post },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreatePostResponse {
    return new CreatePostResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreatePostResponse {
    return new CreatePostResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreatePostResponse {
    return new CreatePostResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreatePostResponse | PlainMessage<CreatePostResponse> | undefined, b: CreatePostResponse | PlainMessage<CreatePostResponse> | undefined): boolean {
    return proto3.util.equals(CreatePostResponse, a, b);
  }
}

/**
 * @generated from message emotter.v1.ListPostsRequest
 */
export class ListPostsRequest extends Message<ListPostsRequest> {
  constructor(data?: PartialMessage<ListPostsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "emotter.v1.ListPostsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListPostsRequest {
    return new ListPostsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListPostsRequest {
    return new ListPostsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListPostsRequest {
    return new ListPostsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListPostsRequest | PlainMessage<ListPostsRequest> | undefined, b: ListPostsRequest | PlainMessage<ListPostsRequest> | undefined): boolean {
    return proto3.util.equals(ListPostsRequest, a, b);
  }
}

/**
 * @generated from message emotter.v1.ListPostsResponse
 */
export class ListPostsResponse extends Message<ListPostsResponse> {
  /**
   * @generated from field: repeated emotter.v1.Post posts = 1;
   */
  posts: Post[] = [];

  constructor(data?: PartialMessage<ListPostsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "emotter.v1.ListPostsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "posts", kind: "message", T: Post, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListPostsResponse {
    return new ListPostsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListPostsResponse {
    return new ListPostsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListPostsResponse {
    return new ListPostsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListPostsResponse | PlainMessage<ListPostsResponse> | undefined, b: ListPostsResponse | PlainMessage<ListPostsResponse> | undefined): boolean {
    return proto3.util.equals(ListPostsResponse, a, b);
  }
}

