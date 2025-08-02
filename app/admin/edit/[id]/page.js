'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function EditEmployeePage() {
  const params = useParams();
  const { id } = params;
  const [form, setForm] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/employees/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  if (!form) return <div>Loading...</div>;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin');
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Edit Employee</h2>
        <input name="name" value={form.name} onChange={handleChange} required />
        <input name="email" value={form.email} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          <option value="developer">Developer</option>
          <option value="hr">HR</option>
          <option value="designer">Designer</option>
        </select>
        <input name="department" value={form.department} onChange={handleChange} />
        <input name="contact" value={form.contact} onChange={handleChange} />
        <input name="address" value={form.address} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
