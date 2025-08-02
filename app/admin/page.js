import EmployeeTable from '@/components/EmployeeTable';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Admin Dashboard</h1>
        <EmployeeTable />
      </main>
    </>
  );
}