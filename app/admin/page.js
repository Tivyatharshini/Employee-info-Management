import EmployeeTable from '@/components/EmployeeTable';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Admin Dashboard</h1>
        <Link href="/admin/add">Add New Employee</Link>
        <EmployeeTable />
      </main>
    </>
  );
}