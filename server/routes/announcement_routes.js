import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { deleteGroupAnnouncement, deleteSubgroupAnnouncement, postGroupAnnouncement, postSubgroupAnnouncement, viewAllAnnouncements, viewGroupAnnouncements, viewSubgroupAnnouncements } from '../controllers/announcement_controllers.js';
const announcementRouter = express.Router();

//add user role auth later
announcementRouter.post('/postMySubGrpAnnouncements', Authenticate, postSubgroupAnnouncement);
announcementRouter.post('/postMyGrpAnnouncements', Authenticate, postGroupAnnouncement);
announcementRouter.get('/getMyGrpAnn',Authenticate,viewGroupAnnouncements);
announcementRouter.get('/getMySubGrpAnn',Authenticate,viewSubgroupAnnouncements);
announcementRouter.delete('/delGrpAnnouncement/:id',Authenticate, deleteGroupAnnouncement);
announcementRouter.delete('/delSubGrpAnnouncement/:id',Authenticate,deleteSubgroupAnnouncement);
announcementRouter.get('/getAllAnnouncements', Authenticate, viewAllAnnouncements);


export default announcementRouter;