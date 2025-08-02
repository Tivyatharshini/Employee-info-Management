import EmployeeProfile from '@/components/EmployeeProfile';
import Navbar from '@/components/Navbar';

export default function EmployeePage() {
  return (
    <>
      <Navbar />
      <main>
        <h1>My Profile</h1>
        <EmployeeProfile />
      </main>
    </>
  );
}