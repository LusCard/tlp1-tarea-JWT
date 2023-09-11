import jwt from "jsonwebtoken";
import "dotenv/config";

export const createJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET, (err, token) => {
      if (err) {
        reject("Error signing the token");
      }
      resolve({ token })
    })
  })
};

//*Authorization: Bearer <token>
export const verifyToken = (req, res, next) => {
  const headerBearer = req.headers["authorization"];
  if (typeof headerBearer !== undefined ) {
    const token = headerBearer.split(" ")[1];
    next();
  }else {
    res.sendStatus(403);
  }
};