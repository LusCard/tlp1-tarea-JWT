// import {createUser, getAllUsers} from "../models/Users.js"

// export const ctrlCreateUser = async (req, res) => {
//     try {
//         const user = await createUser(req.body)
//             res.status(201).json(user);
//     } catch (error) {
//         console.log(error)
//         res.status(500).json("Unexpected error")
//     }
// };

// export const ctrlGetAllUsers = async (req, res) => {
//     try {
//         const users = await getAllUsers();
//         if (!users || users.length === 0) {
//             res.sendStatus(404);
//         }
//         return res.json(users);
//     } catch (error) {
//         console.log(error)
//         res.status(500).json("Unexpected error")
//     }
// };