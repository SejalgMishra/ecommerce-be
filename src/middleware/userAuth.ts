import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  role: string;
}

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader, "authorizationHeader");

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authentication failed. Token missing.' });
  }

  const token = authorizationHeader?.split(' ')[1];
  console.log(token);

  try {
    const decodedToken:any = jwt.verify(token, '1234');
    console.log(decodedToken);

    if(!decodedToken){
        res.send("authaticate first")
    }

    req.body.id = decodedToken.id
    req.body.token= decodedToken
    

    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};


