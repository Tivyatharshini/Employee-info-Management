import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  const data = await req.formData();
  const file = data.get('file');
  const type = data.get('type'); // 'image' or 'resume'

  if (!file) return Response.json({ error: 'No file received' }, { status: 400 });

  const ext = file.name.split('.').pop();
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = type === 'image' ? 'images' : 'resumes';
  const filename = `${Date.now()}-${file.name}`;
  const pathName = path.join(process.cwd(), 'public', 'uploads', uploadDir, filename);

  await writeFile(pathName, buffer);

  return Response.json({ success: true, url: `/uploads/${uploadDir}/${filename}` });
}
