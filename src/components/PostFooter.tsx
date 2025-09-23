import { PostTypes } from "@/types/type";
import { FaComment } from "react-icons/fa";
import ButtonLike from "./ButtonLike";
import ButtonSave from "./ButtonSave";

interface PostFooterProps {
  post: PostTypes;
}

export default function PostFooter({ post }: PostFooterProps) {
  return (
    <div className="mt-2 flex duration-300 items-center justify-between relative">
      <ButtonLike postId={post._id} postLiked={post.likes} />
      <button
        className="flex items-center  text-sm text-muted-foreground 
                duration-300 group cursor-pointer absolute left-1/2 -translate-x-1/2"
      >
        <FaComment className="transition-all duration-300 group-hover:text-gray-200 group-hover:bg-[#8383836b] p-[5px] rounded-full h-6 w-6" />
        <span className="transition-all duration-300 group-hover:text-gray-200">
          {post.comments.length}
        </span>
      </button>
      <ButtonSave postId={post._id} p={5} />
    </div>
  );
}
