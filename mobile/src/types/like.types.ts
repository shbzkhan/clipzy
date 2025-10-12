import { Video } from "./video.types";

export type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

export type LikeResponseData = {
  liked: boolean;
};

export type LikeResponse = ApiResponse<LikeResponseData>;

export type LikedVideoReponse = Video[]