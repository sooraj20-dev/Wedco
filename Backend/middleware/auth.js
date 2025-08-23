// middleware/auth.js
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/error');
const User = require('../models/User');

// Middleware to protect routes and attach user to req
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // Optionally, check for token in cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token found, deny access
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded ID, exclude sensitive fields if needed
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }

    // Attach user to request object for downstream middleware/controllers
    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// Middleware to authorize specific roles (e.g., admin, photographer)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorResponse('User not authenticated', 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role '${req.user.role}' is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
