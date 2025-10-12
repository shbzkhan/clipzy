export type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

export type TweetOwner = {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
};

export type Tweet = {
  _id: string;
  content: string;
  createdAt: string;
  isLiked?: boolean;
  likeCount?: number;
  owner: TweetOwner | string;
};

export type DeleteTweet ={
  tweetId:string  
}

export type GetTweetsResponse = Tweet[];
export type CreateTweetsResponse = ApiResponse<Tweet>;
export type UpdateTweetsResponse = ApiResponse<Tweet>;
export type DeleteTweetsResponse = ApiResponse<DeleteTweet>;
