"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostTypes } from "@/types/type";
import { useUserStore } from "@/zustand/userStore";
import { MdReport } from "react-icons/md";
import { RxDotsHorizontal } from "react-icons/rx";
import ButtonDelete from "./ButtonDelete";
import ButtonSave from "./ButtonSave";
import ButtonFollow from "./ButtonFollow";

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
      <DropdownMenuContent className="bg-black p-0 m-0 absolute w-44 py-3 -left-40 shadow-sm text-white border-2 border-[#252525] font-semibold">
        <DropdownMenuItem
          className={`focus:bg-[#252525] duration-300 focus:text-white cursor-pointer rounded-none p-0 m-0 ${
            userItSelf ? "hidden" : "flex"
          }`}
        >
          <ButtonFollow userId={post.user._id} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`focus:bg-[#252525] duration-300 focus:text-white cursor-pointer rounded-none p-0 m-0`}
        >
          <ButtonSave postId={post._id} label={`Save`} w={100} />
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
