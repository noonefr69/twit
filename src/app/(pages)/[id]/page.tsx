import ProfileFooter from "@/components/ProfileFooter";
import ProfileHeader from "@/components/ProfileHeader";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="border-x-2 border-x-[#252525]">
      <ProfileHeader />
      <ProfileFooter />
    </div>
  );
}
