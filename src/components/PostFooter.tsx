import { PostTypes } from "@/types/type";
import ButtonLike from "./ButtonLike";
import ButtonSave from "./ButtonSave";
import PostsComments from "./PostsComments";

interface PostFooterProps {
  post: PostTypes;
}

export default function PostFooter({ post }: PostFooterProps) {
  return (
    <div className="mt-2 flex duration-300 items-center justify-between relative">
      <ButtonLike postId={post._id} postLiked={post.likes} />
      <PostsComments post={post} />
      <ButtonSave postId={post._id} p={5} />
    </div>
  );
}
