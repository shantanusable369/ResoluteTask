import { Router } from 'express';
import { 
  registerStudent, 
  getStudents, 
  updateStudent, 
  deleteStudent 
} from '../controllers/studentController.js';

const router = Router();

router.post('/register', registerStudent);
router.get('/students', getStudents);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

export default router;