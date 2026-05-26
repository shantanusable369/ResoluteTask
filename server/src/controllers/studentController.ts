 import type { Request, Response } from 'express';
// import { Student } from '../model/Student.js';
import { Student } from '../models/Student.js';
import { encryptLevel2, decryptLevel2 } from '../utils/crypto.js';

// POST /api/register
export const registerStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Destructure the separate fields sent by your updated React form
    const { name, email, emailHash, phone, dob, gender, address, course, password } = req.body;

    // 2. Strict validation check
    if (!name || !email || !emailHash) {
      res.status(400).json({ message: 'No data provided. Missing required separate fields.' });
      return;
    }

    // 3. Enforce the unique email requirement using the non-reversible hash lookup
    const existingStudent = await Student.findOne({ emailHash });
    if (existingStudent) {
      res.status(400).json({ message: 'Student email must be unique. This email is already registered.' });
      return;
    }

    // 4. Wrap each separate field in Level 2 Encryption
    const newStudent = new Student({
      name: encryptLevel2(name),
      email: encryptLevel2(email),
      emailHash, // Stored raw for duplicate matching checks
      phone: encryptLevel2(phone),
      dob: encryptLevel2(dob),
      gender: encryptLevel2(gender),
      address: encryptLevel2(address),
      course: encryptLevel2(course),
      password: encryptLevel2(password),
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Student email must be unique. This email is already registered.' });
    } else {
      res.status(500).json({ message: 'Server error', error });
    }
  }
};
// export const registerStudent = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { encryptedData } = req.body; // Incoming Level 1 encrypted string from frontend
    
//     if (!encryptedData) {
//       res.status(400).json({ message: 'No data provided' });
//       return;
//     }

//     const level2Encrypted = encryptLevel2(encryptedData);

//     const newStudent = new Student({ encryptedData: level2Encrypted });
//     await newStudent.save();

//     res.status(201).json({ message: 'Student registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// export const getStudents = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const students = await Student.find();
//     const processedStudents = students.map(student => {
//       return {
//         _id: student._id,
//         encryptedData: decryptLevel2(student.encryptedData)
//       };
//     });

//     res.status(200).json(processedStudents);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find();
    
    // Peel back Level 2 decryption field by field, passing Level 1 strings to the client browser
    const processedStudents = students.map(student => ({
      _id: student._id,
      name: decryptLevel2(student.name),
      email: decryptLevel2(student.email),
      phone: decryptLevel2(student.phone),
      dob: decryptLevel2(student.dob),
      gender: decryptLevel2(student.gender),
      address: decryptLevel2(student.address),
      course: decryptLevel2(student.course),
    }));

    res.status(200).json(processedStudents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { encryptedData } = req.body;

    const level2Encrypted = encryptLevel2(encryptedData);

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { encryptedData: level2Encrypted },
      { new: true }
    );

    if (!updatedStudent) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
//  import type { Request, Response } from 'express';
// // import { Student } from '../model/Student.js';
// import { Student } from '../models/Student.js';
// import { encryptLevel2, decryptLevel2 } from '../utils/crypto.js';


// export const registerStudent = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { encryptedData } = req.body; // Incoming Level 1 encrypted string from frontend
    
//     if (!encryptedData) {
//       res.status(400).json({ message: 'No data provided' });
//       return;
//     }

//     const level2Encrypted = encryptLevel2(encryptedData);

//     const newStudent = new Student({ encryptedData: level2Encrypted });
//     await newStudent.save();

//     res.status(201).json({ message: 'Student registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// export const getStudents = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const students = await Student.find();
//     const processedStudents = students.map(student => {
//       return {
//         _id: student._id,
//         encryptedData: decryptLevel2(student.encryptedData)
//       };
//     });

//     res.status(200).json(processedStudents);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// export const updateStudent = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { encryptedData } = req.body;

//     const level2Encrypted = encryptLevel2(encryptedData);

//     const updatedStudent = await Student.findByIdAndUpdate(
//       id,
//       { encryptedData: level2Encrypted },
//       { new: true }
//     );

//     if (!updatedStudent) {
//       res.status(404).json({ message: 'Student not found' });
//       return;
//     }

//     res.status(200).json({ message: 'Student updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const deletedStudent = await Student.findByIdAndDelete(id);

//     if (!deletedStudent) {
//       res.status(404).json({ message: 'Student not found' });
//       return;
//     }

//     res.status(200).json({ message: 'Student deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };