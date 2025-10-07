export default function ProfileLoading() {
  return (
    <div className="animate-pulse">
      <nav className="flex items-center justify-between md:p-3 py-3 px-4 text-white">
        <div className="flex items-center">
          <div>
          </div>
          <div className="h-4 w-24 bg-[#252525] rounded" />
        </div>
        <div className="h-4 w-16 bg-[#252525] rounded" />
      </nav>

      <div className="relative bg-[#252525] w-full h-48 " />

      <div className="flex items-start flex-col justify-between md:p-5 px-4 py-5">
        <div className="flex items-center justify-between w-full relative">
          <div className="relative h-28 w-28 -top-20">
            <div className="bg-[#252525] rounded-full w-full h-full" />
          </div>
          <div className="relative -top-10 h-10 w-32 bg-[#252525] rounded-full" />
        </div>
        <div className="text-white relative -top-16 w-full">
          <div className="mt-5 space-y-2">
            <div className="h-4 w-32 bg-[#252525] rounded" />
            <div className="h-4 w-48 bg-[#252525] rounded" />
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="h-4 w-16 bg-[#252525] rounded" />
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <div className="h-4 w-20 bg-[#252525] rounded" />
              <div className="h-4 w-20 bg-[#252525] rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-8">
        {[...Array(1)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse md:p-5 px-4 py-5 border-b-2 border-b-[#252525] text-white"
          >
            <div className="flex items-start justify-between min-w-0">
              <div className="flex items-center gap-2">
                <div className="bg-[#252525] rounded-full h-10 w-10" />
                <div className="h-4 w-24 bg-[#252525] rounded" />
                <div className="h-4 w-12 bg-[#252525] rounded ml-2" />
              </div>
              <div className="h-6 w-6 bg-[#252525] rounded-full" />
            </div>
            <div className="my-7 h-6 w-full bg-[#252525] rounded" />
            <div className="relative h-60 w-full rounded-md mt-4 bg-[#252525]" />
            <div className="mt-4 h-8 w-1/2 bg-[#252525] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
