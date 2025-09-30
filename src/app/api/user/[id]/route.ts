import dbConnect from "@/lib/db";
import User from "@/models/user";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await dbConnect();
    const user = await User.findById(context.params.id).select(
      "name image cover bio followers following createdAt"
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" + err }), {
      status: 500,
    });
  }
}
