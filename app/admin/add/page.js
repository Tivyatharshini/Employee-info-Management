'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AddEmployeePage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee', department: '', contact: '', address: '' });
  const router = useRouter();
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin');
  };
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Add New Employee</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          <option value="developer">Developer</option>
          <option value="hr">HR</option>
          <option value="designer">Designer</option>
        </select>
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </>
  );
}