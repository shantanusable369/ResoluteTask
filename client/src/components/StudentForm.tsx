import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  encryptPayloadLevel1 } from '../utils/crypto';//encryptLevel1,

interface StudentFormProps {
  editingStudent: any | null;
  onSaveSuccess: () => void;
  onCancelEdit: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({ 
  editingStudent, 
  onSaveSuccess, 
  onCancelEdit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    course: '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        email: editingStudent.email || '',
        phone: editingStudent.phone || '',
        dob: editingStudent.dob || '',
        gender: editingStudent.gender || '',
        address: editingStudent.address || '',
        course: editingStudent.course || '',
        password: editingStudent.password || ''
      });
    } else {
      setFormData({ name: '', email: '', phone: '', dob: '', gender: '', address: '', course: '', password: '' });
    }
  }, [editingStudent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');

  //   // Check all fields are filled
  //   if (Object.values(formData).some(value => !value.trim())) {
  //     setError('All fields are strictly required.');
  //     return;
  //   }

  //   try {
  //     const encryptedData = encryptLevel1(formData);

  //     if (editingStudent) {
  //       await axios.put(`http://localhost:5000/api/student/${editingStudent._id}`, { encryptedData });
  //     } else {
  //       await axios.post('http://localhost:5000/api/register', { encryptedData });
  //     }

  //     setFormData({ name: '', email: '', phone: '', dob: '', gender: '', address: '', course: '', password: '' });
  //     onSaveSuccess();
  //   } catch (err) {
  //     setError('Failed to save student data.');
  //   }
  // };


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');

  //   if (Object.values(formData).some(value => !value.trim())) {
  //     setError('All fields are strictly required.');
  //     return;
  //   }

  //   try {
  //     // Separate encryption for each field applied right here
  //     const encryptedPayload = encryptPayloadLevel1(formData);

  //     if (editingStudent) {
  //       await axios.put(`http://localhost:5000/api/student/${editingStudent._id}`, encryptedPayload);
  //     } else {
  //       await axios.post('http://localhost:5000/api/register', encryptedPayload);
  //     }

  //     setFormData({ name: '', email: '', phone: '', dob: '', gender: '', address: '', course: '', password: '' });
  //     onSaveSuccess();
  //   } catch (err: any) {
  //     if (err.response && err.response.status === 400) {
  //       setError(err.response.data.message); // Displays "Email already registered"
  //     } else {
  //       setError('Failed to save student data.');
  //     }
  //   }
  // };
  //   const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');

  //   if (Object.values(formData).some(value => !value.trim())) {
  //     setError('All fields are strictly required.');
  //     return;
  //   }

  //   try {
  //     // 1. Encrypt each individual field separately 
  //     const encryptedPayload = encryptPayloadLevel1(formData);

  //     // 2. SEND THE OBJECT DIRECTLY (Do not wrap it in curly braces)
  //     if (editingStudent) {
  //       await axios.put(`http://localhost:5000/api/student/${editingStudent._id}`, encryptedPayload);
  //     } else {
  //       await axios.post('http://localhost:5000/api/register', encryptedPayload);
  //     }

  //     setFormData({ name: '', email: '', phone: '', dob: '', gender: '', address: '', course: '', password: '' });
  //     onSaveSuccess();
  //   } catch (err: any) {
  //     if (err.response && err.response.status === 400) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError('Failed to save student data.');
  //     }
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Ensure no empty fields are sent
    if (Object.values(formData).some(value => !value.trim())) {
      setError('All fields are strictly required.');
      return;
    }

    try {
      // 1. Encrypt every field separately
      const encryptedPayload = encryptPayloadLevel1(formData);

      // 2. PASS DIRECTLY WITHOUT CURLY BRACES
      if (editingStudent) {
        // CORRECT: Passing encryptedPayload directly as the request body
        await axios.put(`http://localhost:5000/api/student/${editingStudent._id}`, encryptedPayload);
      } else {
        // CORRECT: Passing encryptedPayload directly as the request body
        await axios.post('http://localhost:5000/api/register', encryptedPayload);
      }

      // Reset Form fields
      setFormData({ name: '', email: '', phone: '', dob: '', gender: '', address: '', course: '', password: '' });
      onSaveSuccess();
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message); 
      } else {
        setError('Failed to save student data.');
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
      <h3>{editingStudent ? 'Edit Student' : 'Student Registration'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div style={{ marginBottom: '10px' }}>
        <label>Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Phone Number:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '5px' }}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Address:</label>
        <textarea name="address" value={formData.address} onChange={handleChange} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Course Enrolled:</label>
        <input type="text" name="course" value={formData.course} onChange={handleChange} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ width: '100%' }} />
      </div>

      <button type="submit" style={{ marginRight: '10px' }}>{editingStudent ? 'Update Details' : 'Register'}</button>
      {editingStudent && <button type="button" onClick={onCancelEdit}>Cancel</button>}
    </form>
  );
};




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { encryptLevel1 } from '../utils/crypto';

// interface StudentFormProps {
//   editingStudent: { _id: string; name: string; email: string; dob: string } | null;
//   onSaveSuccess: () => void;
//   onCancelEdit: () => void;
// }

// export const StudentForm: React.FC<StudentFormProps> = ({ 
//   editingStudent, 
//   onSaveSuccess, 
//   onCancelEdit 
// }) => {
//   const [formData, setFormData] = useState({ name: '', email: '', dob: '' });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (editingStudent) {
//       setFormData({
//         name: editingStudent.name,
//         email: editingStudent.email,
//         dob: editingStudent.dob,
//       });
//     } else {
//       setFormData({ name: '', email: '', dob: '' });
//     }
//   }, [editingStudent]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     // Basic Validation
//     if (!formData.name || !formData.email || !formData.dob) {
//       setError('All fields are required');
//       return;
//     }

//     try {
//       // Step 1: Encrypt payload data using Level 1 encryption
//       const encryptedData = encryptLevel1(formData);

//       if (editingStudent) {
//         // Update existing record
//         await axios.put(`http://localhost:5000/api/student/${editingStudent._id}`, { encryptedData });
//       } else {
//         // Register new student
//         await axios.post('http://localhost:5000/api/register', { encryptedData });
//       }

//       setFormData({ name: '', email: '', dob: '' });
//       onSaveSuccess();
//     } catch (err) {
//       setError('Failed to save student data.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px' }}>
//       <h3>{editingStudent ? 'Edit Student' : 'Register Student'}</h3>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
      
//       <div>
//         <label>Name:</label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} />
//       </div>
//       <div>
//         <label>DOB:</label>
//         <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
//       </div>

//       <button type="submit">{editingStudent ? 'Update' : 'Submit'}</button>
//       {editingStudent && <button type="button" onClick={onCancelEdit}>Cancel</button>}
//     </form>
//   );
// };