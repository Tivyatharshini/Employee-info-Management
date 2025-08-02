'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '', contact: '', address: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    let role = 'employee';
    if (form.email === 'admin@gmail.com') role = 'admin';
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, role }),
    });
    const result = await res.json();
    if (res.ok && result.success) router.push('/login');
    else setError(result.error || 'Registration failed');
  };
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <button type="submit">Register</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
    </>
  );
}
