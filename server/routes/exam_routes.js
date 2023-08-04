import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { deleteGroupExam, deleteSubGroupExam, postGroupExam, postSubGroupExam, viewGroupExamDates, viewMyExamDates, viewSubGroupExamDates } from '../controllers/exam_controllers.js';

const examRouter = express.Router();

examRouter.post('/addGrpExam',Authenticate,postGroupExam);
examRouter.post('/addSubGrpExam',Authenticate,postSubGroupExam);
examRouter.get('/getgrpExams',Authenticate,viewGroupExamDates);
examRouter.get('/getsubgrpExams',Authenticate,viewSubGroupExamDates);
examRouter.delete('/delGrpExams/:id',Authenticate,deleteGroupExam);
examRouter.delete('/delSubGrpExams/:id',Authenticate,deleteSubGroupExam);
examRouter.get('/viewMyExamDates', Authenticate, viewMyExamDates); 
export default examRouter;

