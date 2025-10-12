export type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

export type CommentOwner = {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
};
export type Comment = {
  _id: string;
  content: string;
  owner: CommentOwner;
  createdAt: string;
  likes: number;
  isLike: boolean;
};

export type GetCommentsResponse = Comment[];

export type DeleteCommentData = {
  commentId: string;
};

export type DeleteCommentResponse = ApiResponse<DeleteCommentData>;


export type CommentUpdateAndAddData = {
_id: string;
  content: string;
  owner: string; 
  video: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UpdateCommentResponse = ApiResponse<CommentUpdateAndAddData>;
export type AddCommentResponse = ApiResponse<CommentUpdateAndAddData>;
