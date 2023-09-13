exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token is not valid");
      return res
        .status(403)
        .json({ message: "Error verifying the token", error: true });
    }

    const { exp } = decoded;
    if (Date.now() >= exp * 1000) {
      console.log("token is expired");
      return res.status(403).json({ message: "token is expired" });
    } else {
      // Add the decoded information to the request object
      req.user = decoded;
      next();
    }
  });
};
