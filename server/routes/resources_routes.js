import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { addGrpResource, addSubGrpResource, deleteGrpResource, deleteSubGrpResource, viewAllResources } from '../controllers/resource_controllers.js';

const resourceRouter = express.Router();

resourceRouter.post('/addSubGrpResource',Authenticate,addSubGrpResource);
resourceRouter.post('/addGrpResource',Authenticate,addGrpResource);
resourceRouter.delete('/delSubGrpResource/:id',Authenticate,deleteSubGrpResource);
resourceRouter.delete('/delGrpResource/:id',Authenticate,deleteGrpResource);
resourceRouter.get('/viewResource',Authenticate,viewAllResources);

export default resourceRouter;