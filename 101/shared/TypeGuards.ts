import { PostPostEvent, PostCommentEvent } from "./Types";
type lol = { name: string };
export function isPostCommentEvent(
  Event: PostCommentEvent | PostPostEvent
): Event is PostCommentEvent {
  return (Event as PostCommentEvent).type === "CommentCreated";
}
export function isPostPostEvent(
  Event: PostCommentEvent | PostPostEvent
): Event is PostPostEvent {
  return (Event as PostPostEvent).type === "PostCreated";
}
export const isOfType = <T>(check: any, prop: keyof T): check is T =>
  (check as T)[prop] !== undefined;
