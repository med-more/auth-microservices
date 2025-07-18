const jwt = require('jsonwebtoken');

const authMiddleware = (requiredRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(decoded.role)
      ) {
        return res.status(403).json({ msg: 'Access denied: insufficient role' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ msg: 'Invalid or expired token' });
    }
  };
};

module.exports = authMiddleware;
