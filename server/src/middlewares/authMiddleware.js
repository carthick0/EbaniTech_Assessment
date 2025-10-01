const jwt = require('jsonwebtoken');

function authMiddleware(roles = []) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

      const token = authHeader.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Unauthorized' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = decoded; 
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = authMiddleware;
