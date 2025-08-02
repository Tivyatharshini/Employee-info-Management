import Employee from '@/models/employee';
import connectDB from '@/lib/db';

export let DELETE = async (req, {params}) => {
    try {

        await connectDB();
        let id = params.id;
        let blog = await Employee.findByIdAndDelete(id);
        if(!blog) {
            return Response.json({
                status: "bad request",
                message: "check id",
            }, {status:400})
        }
        return Response.json({
            status: "deleted successfully",
            data: blog
        }, {
            status: 200
        })
    } catch (err) {
        return Response.json({
            status: "failed",
            message: err.message,
        }, {status:500})
    }
}

import { NextResponse } from 'next/server';
export async function GET(req, { params }) {
  await connectDB();

  const { id } = params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return Response.json({ error: 'Employee not found' }, { status: 404 });
    }

    return Response.json(employee, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}



// export async function GET(req, { params }) {
//   await connectDB();
//   const employee = await Employee.findById(params.id);
//   if (!employee) return Response.json({ message: 'Not found' }, { status: 404 });
//   return Response.json(employee);
// }

// export async function PUT(req, { params }) {
//   await connectDB();
//   const body = await req.json();
//   const updated = await Employee.findByIdAndUpdate(params.id, body, { new: true });
//   return Response.json(updated);
// }

// export async function DELETE(req, { params }) {
//   await connectDB();
//   const deleted = await Employee.findByIdAndDelete(params.id);
//   if (!deleted) return Response.json({ message: 'Not found' }, { status: 404 });
//   return Response.json({ message: 'Deleted successfully' });
// }


export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;
  const data = await req.json();
  const updated = await Employee.findByIdAndUpdate(id, data, { new: true });
  return Response.json(updated);
}
