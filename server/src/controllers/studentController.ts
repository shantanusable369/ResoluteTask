 import type { Request, Response } from 'express';
// import { Student } from '../model/Student.js';
import { Student } from '../models/Student.js';
import { encryptLevel2, decryptLevel2 } from '../utils/crypto.js';


export const registerStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { encryptedData } = req.body; // Incoming Level 1 encrypted string from frontend
    
    if (!encryptedData) {
      res.status(400).json({ message: 'No data provided' });
      return;
    }

    const level2Encrypted = encryptLevel2(encryptedData);

    const newStudent = new Student({ encryptedData: level2Encrypted });
    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find();
    const processedStudents = students.map(student => {
      return {
        _id: student._id,
        encryptedData: decryptLevel2(student.encryptedData)
      };
    });

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