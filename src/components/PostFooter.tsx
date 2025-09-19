import { PostTypes } from "@/types/type";
import React from "react";
import { AiFillEye } from "react-icons/ai";
import { BsPin } from "react-icons/bs";
import { FaComment, FaHeart } from "react-icons/fa";

interface PostFooterProps {
  post: PostTypes;
}

export default function PostFooter({ post }: PostFooterProps) {
  return (
    <div className="mt-2 flex items-center justify-between">
      <div
        className="flex items-center text-sm text-muted-foreground 
                duration-300 group cursor-pointer"
      >
        <FaHeart className="transition-all duration-300 group-hover:text-red-700 group-hover:bg-[#9400006e] p-[5px] rounded-full h-6 w-6" />
        <span className="transition-all duration-300 group-hover:text-red-700">
          {post.likes}
        </span>
      </div>
      <div
        className="flex items-center text-sm text-muted-foreground 
                duration-300 group cursor-pointer"
      >
        <FaComment className="transition-all duration-300 group-hover:text-gray-200 group-hover:bg-[#8383836b] p-[5px] rounded-full h-6 w-6" />
        <span className="transition-all duration-300 group-hover:text-gray-200">
          {post.comments.length}
        </span>
      </div>
      <div
        className="flex items-center text-sm text-muted-foreground 
                duration-300 group cursor-pointer"
      >
        <BsPin className="transition-all duration-300 group-hover:text-blue-600 group-hover:bg-[#1e00946e] p-[5px] rounded-full h-6 w-6" />
      </div>
    </div>
  );
}
