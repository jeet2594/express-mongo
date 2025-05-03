import jwt from 'jsonwebtoken';

export const authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: false,
      message: 'Authorization token missing or malformed',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Replace 'your_jwt_secret' with your actual secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

    // Attach user info to request object
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: 'Invalid or expired token',
    });
  }
};
