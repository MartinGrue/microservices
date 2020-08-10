export interface Comment {
  id: string;
  content: string;
}
export interface Post {
  id: string;
  title: string;
}

export interface PostCommentEvent {
  type: "CommentCreated";
  data: PostCommentEventData;
}
export interface PostPostEvent {
  type: "PostCreated";
  data: string;
}
export interface PostCommentEventData extends Comment {
  postId: string;
}
