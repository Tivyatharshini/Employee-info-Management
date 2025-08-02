import connectDB from '@/lib/db';
import Employee from '@/models/employee';
import bcrypt from 'bcryptjs';

// export async function GET(req) {
//   await dbConnect();
//   try {
//     const { searchParams } = new URL(req.url);
//     const query = {};
//     const q = searchParams.get('q');
//     if (q) {
//       query[q.includes('@') ? 'email' : 'name'] = q.includes('@')
//         ? q
//         : { $regex: q, $options: 'i' };
//     }
//     if (searchParams.get('role')) {
//       query.role = searchParams.get('role');
//     }
//     if (searchParams.get('department')) {
//       query.department = searchParams.get('department');
//     }
//     const employees = await Employee.find(query);
//     return Response.json(employees);
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('q'); 

    let employees;
    if (email) {
      employees = await Employee.find({ email }); 
    } else {
      employees = await Employee.find({}); 
    }

    if (!employees || employees.length === 0) {
      return Response.json({ message: 'No employees found' }, { status: 404 });
    }

    return Response.json(employees, { status: 200 });
  } catch (err) {
    console.error('GET /api/employees error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// export async function GET(req) {
//   try {
//     await connectDB();
//     const employees = await Employee.find({});
//     console.log(employees);
//     if (!employees || employees.length === 0) { 
//       return Response.json({ message: 'No employees found' }, { status: 404 });
//     }
//     return Response.json(employees, { status: 200 });
//   } catch (err) {
//     console.error('GET /api/employees error:', err);
//     return Response.json({ error: err.message }, { status: 500 });
//   }
// }

export let POST = async (req) => {
    try{
        await connectDB();
        const data = await req.json();
        if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }
        const newBlog =  await Employee.create(data);
        return Response.json({
            status: "success",
            message: {
                newBlog,
            }
        }, {status: 200})

    } catch (err) {
        return Response.json({
            status: "failed",
            message: err.message
        }, {status: 500})
    }
}

// export async function POST(req) {
//   await dbConnect();
//   try {
//     const data = await req.json();
//     if (data.password) {
//       data.password = bcrypt.hashSync(data.password, 10);
//     }
//     const employee = await Employee.create(data);
//     return Response.json(employee);
//   } catch (error) {
//     console.error('Error in POST:', error);
//     return new Response(JSON.stringify({ error: 'Failed to add employee' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// export async function PUT(req) {
//   await dbConnect();
//   const data = await req.json();
//   const { _id, ...update } = data;
//   const employee = await Employee.findByIdAndUpdate(_id, update, { new: true });
//   return Response.json(employee);
// }

export async function PUT(req) {
  await connectDB();
  const data = await req.json();
  const { email, ...update } = data;
const employee = await Employee.findOneAndUpdate({ email }, update, { new: true });

  return Response.json(employee);
}

export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();
  await Employee.findByIdAndDelete(id);
  return Response.json({ success: true });
}
