import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if(!token){
    return res.status(401).json({message: 'Unauthorized - no token provided'});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      return res.status(401).json({message: 'Unauthorizd - invalid token'});
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("error in protect middleware", error);
    return res.status(500).json({message: "internal server error"});
  }
}

export default protect;

// import jwt from "jsonwebtoken";

// const protect = async (req, res, next) => {
//   // 1. Get the header
//   const authHeader = req.headers.authorization;

//   // 2. Check if header exists and starts with "Bearer"
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: 'Unauthorized - no token provided' });
//   }

//   // 3. Extract the actual token (remove "Bearer " prefix)
//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    
//     // Note: jwt.verify throws an error if invalid, 
//     // so this check is a good safety measure
//     if (!decoded) {
//       return res.status(401).json({ message: 'Unauthorized - invalid token' });
//     }

//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     console.log("error in protect middleware", error);
    
//     // If the token is expired or fake, give a 401 instead of a 500
//     if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
//         return res.status(401).json({ message: "Unauthorized - token invalid or expired" });
//     }

//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

// export default protect;


// import jwt from "jsonwebtoken";

// const protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: 'Unauthorized - no token provided' });
//   }

//   // If the header has "Bearer ", strip it. If not, use the header as the token.
//   const token = authHeader.startsWith("Bearer ") 
//     ? authHeader.split(" ")[1] 
//     : authHeader;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     console.log("JWT Error:", error.message);
//     return res.status(401).json({ message: "Unauthorized - invalid token" });
//   }
// }

// export default protect;
