"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostTypes } from "@/types/type";
import { useUserStore } from "@/zustand/userStore";
import { BsPin } from "react-icons/bs";
import { MdReport } from "react-icons/md";
import { RxDotsHorizontal } from "react-icons/rx";
import { TiUserAddOutline } from "react-icons/ti";
import ButtonDelete from "./ButtonDelete";

type PostTypesProps = {
  post: PostTypes;
};

export default function PostDropDown({ post }: PostTypesProps) {
  const { user } = useUserStore();

  const userItSelf = post.user._id === user?._id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <RxDotsHorizontal className="text-muted-foreground p-1 cursor-pointer duration-300 hover:text-blue-500 h-6 w-6 rounded-full hover:bg-[#0000b56c]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black p-0 m-0 border-none absolute w-44 py-3 -left-40 shadow-sm text-white shadow-[#ffffff7d] font-semibold">
        <DropdownMenuItem className="focus:bg-[#252525] duration-300 focus:text-white cursor-pointer rounded-none">
          <TiUserAddOutline size={20} /> Follow
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-[#252525] duration-300 focus:text-white cursor-pointer rounded-none">
          <BsPin size={20} /> Save
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-[#252525] duration-300 focus:text-white cursor-pointer rounded-none">
          <MdReport size={20} /> Report
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`focus:bg-[#252525] duration-300 focus:text-white cursor-pointer rounded-none p-0 m-0 ${
            userItSelf ? "block" : "hidden"
          }`}
        >
          <ButtonDelete postId={post._id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
