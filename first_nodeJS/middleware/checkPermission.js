const jwt = require('jwt-simple');

const checkPermission = (permission) => async (req, res, next) => {
  try {
   const token = req.session.token;
   console.log('Token từ session: ', token);
    if (!token) {
      return res.status(401).json({ message: 'Access Denied, No token provided' });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const userPermissions = decoded.permissions; 

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ message: 'Access Denied, You do not have permission' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkPermission;
