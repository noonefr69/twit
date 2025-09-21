import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Post from "@/models/post";
import User from "@/models/user";
import { UserType } from "@/types/type";

export async function GET() {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const user = await User.findOne({
      email: session.user.email,
    }).lean<UserType>();
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user", "name image")
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
