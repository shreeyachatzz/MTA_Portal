import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { deleteGroupAnnouncement, deleteSubgroupAnnouncement, postGroupAnnouncement, postSubgroupAnnouncement, viewGroupAnnouncements, viewSubgroupAnnouncements } from '../controllers/announcement_controllers.js';
const announcementRouter = express.Router();

//add user role auth later
announcementRouter.post('/postMySubGrpAnnouncements', Authenticate, postSubgroupAnnouncement);
announcementRouter.post('/postMyGrpAnnouncements', Authenticate, postGroupAnnouncement);
announcementRouter.get('/getMyGrpAnn',Authenticate,viewGroupAnnouncements);
announcementRouter.get('/getMySubGrpAnn',Authenticate,viewSubgroupAnnouncements);
announcementRouter.delete('/delGrpAnnouncement/:id',Authenticate, deleteGroupAnnouncement);
announcementRouter.delete('/delSubGrpAnnouncement/:id',Authenticate,deleteSubgroupAnnouncement);

export default announcementRouter;