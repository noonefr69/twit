"use client";

import { handleProfile } from "@/actions/handleProfile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserType } from "@/types/type";
import { useState, useTransition } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { TbLoaderQuarter } from "react-icons/tb";

type ProfileEditProps = {
  userData: UserType;
};

export default function ProfileEdit({ userData }: ProfileEditProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function handleChange(formData: FormData) {
    startTransition(async () => {
      try {
        await handleProfile(formData);
        setOpen(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
          //   toast.error(err.message);
        } else {
          console.error("Something went wrong");
        }
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-white cursor-pointer rounded-full font-semibold border-2 px-3 duration-300 hover:bg-[#252525] py-1 border-[#ababab]">
        Edit Profile
      </DialogTrigger>
      <DialogContent className="bg-black text-white border-2 border-[#252525] w-[90rem]">
        <DialogHeader>
          <DialogTitle className="mb-4">Edit profile</DialogTitle>
          <form className="min-h-96" action={handleChange}>
            <div className="relative pb-16">
              <div className=" group w-full flex items-center justify-center duration-300 hover:opacity-80">
                <label
                  htmlFor="userCover"
                  aria-label="Upload image"
                  className="cursor-pointer bg-[#252525] w-full py-8 text-center flex flex-col gap-2 items-center justify-center rounded-md"
                >
                  <MdOutlineAddAPhoto />
                  Cover
                </label>
                <input
                  id="userCover"
                  type="file"
                  name="userCover"
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="absolute bottom-0 left-2 group flex items-start justify-start duration-300 rounded-full hover:opacity-80">
                <label
                  htmlFor="userProfileImage"
                  aria-label="Upload image"
                  className="cursor-pointer bg-[#252525] border-2 border-[#3e3e3e] p-8 text-center flex flex-col gap-2 items-center justify-center rounded-full"
                >
                  <MdOutlineAddAPhoto />
                  Profile
                </label>
                <input
                  id="userProfileImage"
                  type="file"
                  name="userProfileImage"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
            <div className="relative group mt-4">
              <div className="flex items-center justify-between px-3 py-2 text-sm absolute top-0 w-full">
                <label
                  htmlFor="userName"
                  className="group-focus-within:text-blue-500 font-semibold text-muted-foreground top-1"
                >
                  Name
                </label>
                <span className="group-focus-within:block hidden text-muted-foreground font-semibold">
                  0/50
                </span>
              </div>
              <input
                defaultValue={userData.name}
                type="text"
                required
                maxLength={50}
                name="userName"
                placeholder="Enter your new name"
                id="userName"
                className="border-2 duration-100 border-[#252525] outline-none py-2 px-3 w-full pt-8 font-semibold rounded-md group-focus-within:border-blue-500"
              />
            </div>
            <div className="relative group mt-4">
              <div className="flex items-center justify-between px-3 py-2 text-sm absolute top-0 w-full">
                <label
                  htmlFor="userBio"
                  className="group-focus-within:text-blue-500 font-semibold text-muted-foreground top-1"
                >
                  Bio (optional)
                </label>
                <span className="group-focus-within:block hidden text-muted-foreground font-semibold">
                  0/160
                </span>
              </div>
              <textarea
                defaultValue={userData.bio}
                name="userBio"
                maxLength={160}
                placeholder="Enter your new bio"
                id="userBio"
                rows={3}
                className="border-2 resize-none duration-100 border-[#252525] outline-none py-2 px-3 w-full pt-8 font-semibold rounded-md group-focus-within:border-blue-500"
              />
            </div>
            <button
              disabled={isPending}
              type="submit"
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 bg-white duration-300 hover:opacity-70 text-center flex items-center justify-center text-black w-14 h-8 rounded-full font-semibold mt-4"
            >
              {isPending ? (
                <TbLoaderQuarter className="animate-spin" size={24} />
              ) : (
                "Post"
              )}
            </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
