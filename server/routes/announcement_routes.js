import express from 'express';
import { Authenticate } from '../middlewares/auth';
const announcementRouter = express.Router();

announcementRouter.get('/getMySubGrpAnnouncements',Authenticate,)

export default announcementRouter;