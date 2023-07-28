import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const Authenticate = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
      }
      
      console.log("ENV : ",process.env.SECRET_KEY);
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
  
      const rootUser = await User.findOne({
        _id: verifyToken._id,
        'tokens.token': token,
      });
  
      if (!rootUser) {
        throw new Error('User not found');
      }
  
      req.token = token;
      req.rootUser = rootUser;
      req.userID = rootUser._id;
  
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  };
  