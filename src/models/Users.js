import { sequelize } from "../config/database.js";
import {DataTypes} from "sequelize";
import {hashString} from "../helpers/hash.js";
import bcrypt from 'bcrypt'

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

export const UserModel = sequelize.define('User', {
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(ROLES.ADMIN, ROLES.USER),
    defaultValue: ROLES.ADMIN
  }
}, {
    sequelize,
    modelName:"User",
    tableName:"user_data",
    underscored:true,
    timestamps: true
})



// services
export async function getAllUsers () {
  return await UserModel.findAll() ?? null
};

export async function createUser (user) {
  const hashedPassword = await hashString(user.password)

  return await UserModel.create({ ...user, password: hashedPassword })
};

export async function getUserById (userId) {
  return await UserModel.findByPk(userId) ?? null
};

export async function getUserByEmailAndPassword ({ email, password }) {

  const user = await UserModel.findOne({ where: {email}  })

  if (!user) {
    console.log("User not found")
    return null
  }else{
    console.log("User found")
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return null
  }

  return user
};
