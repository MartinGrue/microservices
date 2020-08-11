export interface Comment {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}
export interface Post {
  id: string;
  title: string;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}

export interface PostCommentEvent {
  type: "CommentCreated";
  data: CommentEventData;
}
export interface PostPostEvent {
  type: "PostCreated";
  data: Post;
}
export interface CommentModerated {
  type: "CommentModerated";
  data: CommentEventData;
}
export interface CommentUpdated {
  type: "CommentUpdated";
  data: CommentEventData;
}
export type Event =
  | PostCommentEvent
  | PostPostEvent
  | CommentModerated
  | CommentUpdated;
export interface CommentEventData extends Comment {
  postId: string;
}
