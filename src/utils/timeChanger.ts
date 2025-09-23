import { formatDistanceToNow } from "date-fns";

export function timeAgo(dateString?: string) {
  if (!dateString) return "";
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}
