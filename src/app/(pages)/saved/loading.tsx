export default function SavedLoading() {
  return (
    <div className="mb-20">
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
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
