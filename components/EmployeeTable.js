'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
 const router = useRouter(); 
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('/api/employees');
        if (!res.ok) throw new Error('Failed to fetch employees');
        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    const res = await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setEmployees(prev => prev.filter(e => e._id !== id));
    }
  };

 const handleEdit = (id) => {
    router.push(`/admin/edit/${id}`); 
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp._id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.role}</td>
            <td>{emp.department}</td>
            <td>
              <button onClick={() => handleEdit(emp._id)}>Edit</button> 
              <span>  </span>
              <button onClick={() => handleDelete(emp._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
