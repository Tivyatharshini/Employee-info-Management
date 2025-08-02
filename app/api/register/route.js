import dbConnect from '@/lib/db';
import Employee from '@/models/employee';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  // Check if user exists
  const exists = await Employee.findOne({ email: data.email });
  if (exists) return Response.json({ error: 'User exists' }, { status: 400 });
  // Hash password
  const hashed = bcrypt.hashSync(data.password, 10);
  const user = await Employee.create({ ...data, password: hashed });
  return Response.json({ success: true });
}
