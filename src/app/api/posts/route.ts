import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Post from "@/models/post";

export async function GET() {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const posts = await Post.find({})
      .populate("user", "name image") // only get the fields you need
      .populate("comments.userCom", "name image")
      .sort({ createdAt: -1 })
      .lean();

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
