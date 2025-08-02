'use client';
import { useState, useEffect } from 'react';

export default function EmployeeProfile() {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ contact: '', address: '' });

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/current-user');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setFormData({ contact: data.contact || '', address: data.address || '' });
      }
    };
    fetchUser();
  }, []);

  // Handle file uploads
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePhoto(URL.createObjectURL(file));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) setResumeFile(file);
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated contact & address
  const handleSave = async () => {
    const res = await fetch('/api/current-user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);
      setIsEditing(false);
    } else {
      alert('Failed to update user.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-photo">
          {profilePhoto ? (
            <img src={profilePhoto} alt="Profile" />
          ) : (
            <div className="photo-placeholder">Upload Image</div>
          )}
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>

        <div className="profile-details">
          <div className="detail-box">
            <label>Name</label>
            <p>{user?.name}</p>
          </div>

          <div className="detail-box">
            <label>Email</label>
            <p>{user?.email}</p>
          </div>

          <div className="detail-box">
            <label>Department</label>
            <p>{user?.department}</p>
          </div>

          <div className="detail-box">
            <label>Contact</label>
            {isEditing ? (
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            ) : (
              <p>{user?.contact}</p>
            )}
          </div>

          <div className="detail-box">
            <label>Address</label>
            {isEditing ? (
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            ) : (
              <p>{user?.address}</p>
            )}
          </div>
          
          <div className="edit-buttons">
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>
        </div>

        <div className="resume-section">
          <label>Upload Resume:</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
          {resumeFile && (
            <a
              href={URL.createObjectURL(resumeFile)}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link"
            >
              View Uploaded Resume
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
