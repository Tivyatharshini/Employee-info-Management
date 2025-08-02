import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Employee from "@/models/employee";

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Not Authenticated" }), {
      status: 401,
    });
  }

  const user = await Employee.findOne({ email: session.user.email }).lean();

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


export async function PUT(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: 'Not Authenticated' }), {
      status: 401,
    });
  }

  const body = await req.json();

  const updatedUser = await Employee.findOneAndUpdate(
    { email: session.user.email },
    { $set: { contact: body.contact, address: body.address } },
    { new: true }
  ).lean();

  if (!updatedUser) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(updatedUser), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
