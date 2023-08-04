import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { addResource, deleteResource, viewAllResources } from '../controllers/resource_controllers.js';

const resourceRouter = express.Router();

resourceRouter.post('/addResource',Authenticate,addResource);
resourceRouter.delete('/delResource/:id',Authenticate,deleteResource);
resourceRouter.get('/viewResource',Authenticate,viewAllResources);

export default resourceRouter;