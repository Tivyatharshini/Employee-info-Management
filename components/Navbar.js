'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="navbar">
      <span className="logo">Employee Info Manager</span>
      <div>
        {!session && (
          <>
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Sign Up</Link>
          </>
        )}
        {session && session.role === 'admin' && (
          <>
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/add">Add Employee</Link>
            <Link href="/employee">My Profile</Link>
            <button onClick={() => signOut()}>Logout</button>
          </>
        )}
        {session && session.role === 'employee' && (
          <>
            <Link href="/employee">My Profile</Link>
            <button onClick={() => signOut()}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
