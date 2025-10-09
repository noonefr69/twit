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
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { TbLoaderQuarter, TbPhotoCheck } from "react-icons/tb";

type ProfileEditProps = {
  userData: UserType;
};

export default function ProfileEdit({ userData }: ProfileEditProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSecFile, setSelectedSecFile] = useState<File | null>(null);
  const [userNameInput, setUserNameInput] = useState(userData.name);
  const [userBioInput, setUserBioInput] = useState(userData.bio);

  function handleChange(formData: FormData) {
    startTransition(async () => {
      try {
        await handleProfile(formData);
        toast.success("Profile edited successfully!");
        setOpen(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
          toast.error(err.message);
        } else {
          console.error("Something went wrong");
          toast.error("Somthing went wrong!");
        }
      }
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File too large! Max 10MB.");
      e.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  }

  function handleFileSecChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File too large! Max 10MB.");
      e.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedSecFile(file);
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
                  className="cursor-pointer duration-300 bg-[#252525] w-full h-32 text-center flex flex-col gap-2 items-center justify-center rounded-md"
                >
                  {selectedFile ? (
                    <TbPhotoCheck className="text-green-600" size={30} />
                  ) : (
                    <>
                      <MdOutlineAddAPhoto />
                      Cover
                    </>
                  )}
                </label>
                <input
                  id="userCover"
                  type="file"
                  name="userCover"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <div className="absolute bottom-0 left-2 group flex items-start justify-start duration-300 rounded-full hover:opacity-80">
                <label
                  htmlFor="userProfileImage"
                  aria-label="Upload image"
                  className="cursor-pointer bg-[#252525] border-2 border-[#3e3e3e] h-28 w-28 text-center flex flex-col gap-2 items-center justify-center rounded-full"
                >
                  {selectedSecFile ? (
                    <TbPhotoCheck className="text-green-600" size={30} />
                  ) : (
                    <>
                      <MdOutlineAddAPhoto />
                      Cover
                    </>
                  )}
                </label>
                <input
                  id="userProfileImage"
                  type="file"
                  name="userProfileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSecChange}
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
                  {userNameInput.length} / 50
                </span>
              </div>
              <input
                value={userNameInput}
                onChange={(e) => setUserNameInput(e.target.value)}
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
              <div className="flex items-center bg-black border-[#252525] duration-100 group-focus-within:border-blue-500 border-t-2 border-x-2 rounded-t-md justify-between px-3 py-2 text-sm absolute top-0 w-full">
                <label
                  htmlFor="userBio"
                  className="group-focus-within:text-blue-500 font-semibold text-muted-foreground top-1"
                >
                  Bio (optional)
                </label>
                <span className="group-focus-within:block hidden text-muted-foreground font-semibold">
                  {userBioInput.length} / 160
                </span>
              </div>
              <textarea
                value={userBioInput}
                onChange={(e) => setUserBioInput(e.target.value)}
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
                "Save"
              )}
            </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
