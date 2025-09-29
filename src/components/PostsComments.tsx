import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostTypes } from "@/types/type";
import { FaComment } from "react-icons/fa";
import ButtonAddComment from "./ButtonAddComment";
import Image from "next/image";
import { timeAgo } from "@/utils/timeChanger";
import Link from "next/link";
import { RxDotsHorizontal } from "react-icons/rx";
import ButtonDropDownComment from "./ButtonDropDownComment";

type PostsCommentsProps = {
  post: PostTypes;
};

export default function PostsComments({ post }: PostsCommentsProps) {
  return (
    <Dialog>
      {/* Trigger button */}
      <DialogTrigger
        className="flex items-center gap-1 text-sm text-muted-foreground 
                  duration-300 group cursor-pointer absolute left-1/2 -translate-x-1/2"
      >
        <FaComment className="transition-all duration-300 group-hover:text-gray-200 group-hover:bg-[#8383836b] p-[5px] rounded-full h-6 w-6" />
        <span className="transition-all duration-300 group-hover:text-gray-200">
          {post.comments.length}
        </span>
      </DialogTrigger>

      {/* Comments Modal */}
      <DialogContent className="bg-black text-white border border-[#252525] rounded-2xl max-w-lg w-full flex flex-col p-0">
        <DialogHeader className="border-b border-[#252525] p-4">
          <DialogTitle className="text-lg font-semibold">Comments</DialogTitle>
        </DialogHeader>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto max-h-[400px] p-4 space-y-4">
          {post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-3 border-b border-[#252525] pb-3"
              >
                <Link
                  href={`${comment.userCom._id}`}
                  className="flex  gap-2 items-start hover:underline"
                >
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={comment.userCom.image}
                      alt={comment.userCom.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {comment.userCom.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {timeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-200 mt-1">{comment.text}</p>
                  </div>
                </Link>
                <div>
                  <ButtonDropDownComment post={post} commentOwner={comment.userCom._id} postId={post._id} commentId={comment._id}/>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center font-semibold text-muted-foreground text-sm">
              No comments yet.
            </p>
          )}
        </div>

        <div className="border-t border-[#252525] p-4">
          <ButtonAddComment post={post} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
