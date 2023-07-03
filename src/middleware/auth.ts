import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

    if (decodedToken.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden. Only admins are allowed to perform this action.' });
    }

    req.body.id = decodedToken.id;
    req.body.role = decodedToken.role;

    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};


