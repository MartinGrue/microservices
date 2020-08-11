import {
  PostCommentEvent,
  PostPostEvent,
  CommentUpdated,
  CommentModerated,
  Event,
} from "./Types";

export function isPostCommentEvent(Event: Event): Event is PostCommentEvent {
  return (Event as PostCommentEvent).type === "CommentCreated";
}
export function isPostPostEvent(Event: Event): Event is PostPostEvent {
  return (Event as PostPostEvent).type === "PostCreated";
}
export function isCommentUpdated(Event: Event): Event is CommentUpdated {
  return (Event as CommentUpdated).type === "CommentUpdated";
}
export function isCommentModerated(Event: Event): Event is CommentModerated {
  return (Event as CommentModerated).type === "CommentModerated";
}
export function isOfType<T>(check: any, prop: keyof T): check is T {
  return (check as T)[prop] !== undefined;
}
