"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxDotsHorizontal } from "react-icons/rx";
import ButtonDeleteComment from "./ButtonDeleteComment";
import { useUserStore } from "@/zustand/userStore";
import { PostTypes } from "@/types/type";

type ButtonDropDownCommentProps = {
  commentId: string;
  postId: string;
  commentOwner: string;
  post: PostTypes;
};

export default function ButtonDropDownComment({
  commentId,
  postId,
  commentOwner,
  post,
}: ButtonDropDownCommentProps) {
  const { user } = useUserStore();

  const userItSelf = commentOwner == user?._id;
  const postOwner = post.user._id == user?._id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${userItSelf || postOwner ? "flex" : "hidden"}`}
      >
        <RxDotsHorizontal className="text-muted-foreground p-1 cursor-pointer duration-300 hover:text-blue-500 h-6 w-6 rounded-full hover:bg-[#0000b56c]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black p-0 m-0 absolute w-32 py-3 -left-28 shadow-sm text-white border-2 border-[#252525] font-semibold">
        <DropdownMenuItem
          className={`focus:bg-[#252525] duration-300 focus:text-white cursor-pointer rounded-none p-0 m-0 `}
        >
          <ButtonDeleteComment postId={postId} commentId={commentId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
