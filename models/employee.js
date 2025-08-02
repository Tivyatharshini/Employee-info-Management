import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee', 'developer', 'hr', 'designer'], default: 'employee' },
  department: { type: String },
  contact: { type: String },
  address: { type: String },
  joiningDate: { type: Date, default: Date.now },
  photo: { type: String },
  resume: { type: String },
}, { timestamps: true });

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
