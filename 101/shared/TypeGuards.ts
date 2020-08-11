import { PostPostEvent, PostCommentEvent, Event } from "./Types";
export function isPostCommentEvent(Event: Event): Event is PostCommentEvent {
  return (Event as PostCommentEvent).type === "CommentCreated";
}
export function isPostPostEvent(Event: Event): Event is PostPostEvent {
  return (Event as PostPostEvent).type === "PostCreated";
}

export const isOfType = <T>(check: any, prop: keyof T): check is T =>
  (check as T)[prop] !== undefined;
