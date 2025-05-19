import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import { UserRole } from "../models/userrole.model";
import { dbConfig } from ".";
import { Center } from "../models/center.model";
import { Holiday } from "../models/holiday.model";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: dbConfig.HOST,
    username: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    models: [User, Role, UserRole, Center, Holiday],
    logging: false
});

export default sequelize;