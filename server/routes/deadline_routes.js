import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { deleteGroupDeadlines, deleteSubGroupDeadlines, postGroupDeadline, postSubGroupDeadline, viewGroupDeadlines } from '../controllers/deadline_controllers.js';
import { viewSubgroupAnnouncements } from '../controllers/announcement_controllers.js';

const deadlineRouter = express.Router();

//add user role auth later
deadlineRouter.post('/addGrpDeadline',Authenticate,postGroupDeadline);
deadlineRouter.post('/addSubGrpDeadline',Authenticate,postSubGroupDeadline);
deadlineRouter.get('/getGrpDeadline', Authenticate, viewGroupDeadlines);
deadlineRouter.get('/getSubGrpDeadline', Authenticate, viewSubgroupAnnouncements);
deadlineRouter.delete('/delGrpDeadlines/:id',Authenticate,deleteGroupDeadlines);
deadlineRouter.delete('/delSubGrpDeadlines/:id',Authenticate,deleteSubGroupDeadlines);

export default deadlineRouter;