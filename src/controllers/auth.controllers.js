import {createJWT, verifyToken} from "../middlewares/jsonwebtoken.js";
import {getUserByEmailAndPassword, createUser, getUserById,} from "../models/Users.js"
import jwt from "jsonwebtoken"
import "dotenv/config.js"

export const ctrlLogin = async (req, res) => {
    try {
        const user = await getUserByEmailAndPassword(req.body);
        const token = await createJWT({user: user.id});

        res.status(200).json({token: token});
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

};

export const ctrlRegister = async (req, res) => {
    try {
        const user = await createUser(req.body)
        const token = await createJWT({user: user.id});

        res.status(200).json(token);

    } catch (error) {
        res.sendStatus(500);
    }
};


export const ctrlGetUserInfoByToken = async (req, res) => {
    const headerBearer = req.headers["authorization"];
  
    if (typeof headerBearer !== undefined ) {
      const token = headerBearer.split(" ")[1];
    
      try {
        const { user: userId } = jwt.verify(token, process.env.SECRET);
        const user = await getUserById(userId);
  
        if (!user) {
          return res.sendStatus(404);
        }
  
        res.status(200).json(user);
      } catch (error) {
        
        console.error(error);
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };
  