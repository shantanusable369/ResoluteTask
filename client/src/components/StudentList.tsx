import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {decryptValueLevel1 } from '../utils/crypto';// decryptLevel1, 

interface StudentListProps {
  refreshTrigger: boolean;
  onEditClick: (student: any) => void;
  onDeleteSuccess: () => void;
}
export const StudentList: React.FC<StudentListProps> = ({ 
  refreshTrigger, 
  onEditClick, 
  onDeleteSuccess 
}) => {
  const [students, setStudents] = useState<any[]>([]);

  // const fetchStudents = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/students');
      
  //     const decryptedStudents = response.data.map((item: any) => {
  //       const plainFields = decryptLevel1(item.encryptedData);
  //       return {
  //         _id: item._id,
  //         ...plainFields
  //       };
  //     });

  //     setStudents(decryptedStudents);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      
      // Decrypt every individual column field string row by row
      const decryptedStudents = response.data.map((item: any) => {
        return {
          _id: item._id,
          name: decryptValueLevel1(item.name),
          email: decryptValueLevel1(item.email),
          phone: decryptValueLevel1(item.phone),
          dob: decryptValueLevel1(item.dob),
          gender: decryptValueLevel1(item.gender),
          address: decryptValueLevel1(item.address),
          course: decryptValueLevel1(item.course),
        };
      });

      setStudents(decryptedStudents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this record permanently?')) {
      try {
        await axios.delete(`http://localhost:5000/api/student/${id}`);
        onDeleteSuccess();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  return (
    <div style={{ padding: '20px', overflowX: 'auto' }}>
      <h3>Registered Student Directory</h3>
      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Course</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name || 'Error'}</td>
              <td>{student.email || 'Error'}</td>
              <td>{student.phone || 'Error'}</td>
              <td>{student.dob || 'Error'}</td>
              <td>{student.gender || 'Error'}</td>
              <td>{student.address || 'Error'}</td>
              <td>{student.course || 'Error'}</td>
              <td><code>******</code></td>
              <td>
                <button onClick={() => onEditClick(student)} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => handleDelete(student._id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center' }}>No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { decryptLevel1 } from '../utils/crypto';

// interface StudentListProps {
//   refreshTrigger: boolean;
//   onEditClick: (student: any) => void;
//   onDeleteSuccess: () => void;
// }

// export const StudentList: React.FC<StudentListProps> = ({ 
//   refreshTrigger, 
//   onEditClick, 
//   onDeleteSuccess 
// }) => {
//   const [students, setStudents] = useState<any[]>([]);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/students');
      
//       // Decrypt the level-1 payload string sent from the backend
//       const decryptedStudents = response.data.map((item: any) => {
//         const plainFields = decryptLevel1(item.encryptedData);
//         return {
//           _id: item._id,
//           ...plainFields
//         };
//       });

//       setStudents(decryptedStudents);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this student?')) {
//       try {
//         await axios.delete(`http://localhost:5000/api/student/${id}`);
//         onDeleteSuccess();
//       } catch (error) {
//         console.error('Error deleting student:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [refreshTrigger]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h3>Registered Students</h3>
//       <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>DOB</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student._id}>
//               <td>{student.name || 'Decryption Error'}</td>
//               <td>{student.email || 'Decryption Error'}</td>
//               <td>{student.dob || 'Decryption Error'}</td>
//               <td>
//                 <button onClick={() => onEditClick(student)}>Edit</button>
//                 <button onClick={() => handleDelete(student._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };