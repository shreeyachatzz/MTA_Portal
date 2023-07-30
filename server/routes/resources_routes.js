import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { addResource, deleteResource, viewResourcesBySubject } from '../controllers/resource_controllers.js';

const resourceRouter = express.Router();

resourceRouter.post('/addresource/:subject',Authenticate,addResource);
resourceRouter.delete('/delResource/:id',Authenticate,deleteResource);
resourceRouter.get('/viewResource/:subject',Authenticate,viewResourcesBySubject);

export default resourceRouter;