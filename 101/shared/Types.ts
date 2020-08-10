export interface Comment {
  id: string;
  content: string;
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
  data: PostCommentEventData;
}
export interface PostPostEvent {
  type: "PostCreated";
  data: Post;
}
export interface PostCommentEventData extends Comment {
  postId: string;
}
// {"adsdad": {id:"adsdad", title:"1", comments: []}}
