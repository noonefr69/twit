import { getCloudinaryUsageMB } from "@/lib/cloudinaryUsage";

export async function GET() {
  try {
    const usage = await getCloudinaryUsageMB();
    return new Response(JSON.stringify(usage), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to get Cloudinary usage" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
