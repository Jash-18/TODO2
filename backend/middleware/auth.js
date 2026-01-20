// Authentication middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res
    .status(401)
    .json({ message: "Please login to access this resource" });
};

// Guest only middleware (for login/register pages)
const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(400).json({ message: "Already logged in" });
  }
  return next();
};

module.exports = { ensureAuthenticated, ensureGuest };
