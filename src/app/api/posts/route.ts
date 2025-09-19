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

    // const post = await Post.find({ email: session.user.email });
    // const posts = await Post.find(
    //   {},
    //   "name post image createdAt likes comments"
    // )
    //   .sort({ createdAt: -1 })
    //   .lean();

    const posts = await Post.find({})
      .populate("user", "name email image") // only get the fields you need
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
