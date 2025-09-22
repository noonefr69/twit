import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

export default function SearchInput() {
  return (
    <div className="relative w-full max-w-sm group">
      <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="pl-10 w-full rounded-full outline-none border-2 focus:border-[#525252] duration-300 border-[#252525] p-2"
      />
      <div className="hidden duration-300 group-focus-within:block absolute top-full min-h-32 left-0 mt-2 w-full rounded-md shadow-md bg-black border-2 border-[#252525] p-2">
        Some User Data
      </div>
    </div>
  );
}
