// app/page.js
'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <main>
        <section className="intro">
          <h1>Welcome to Employee Info Management</h1>
          <p>Manage employee data securely and efficiently. Admins can manage all employees, employees can manage their own profile.</p>
          {!session && <Link href="/register"><button>Get Started</button></Link>}
        </section>
      </main>
    </>
  );
}