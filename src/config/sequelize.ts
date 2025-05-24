import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import { UserRole } from "../models/userrole.model";
import { dbConfig } from ".";
import { Center } from "../models/center.model";
import { Holiday } from "../models/holiday.model";
import { ClassSchedule } from "../models/classSchedule.model";
import { ClassScheduleDay } from "../models/classScheduleDay.model";
import { Day } from "../models/day.model";
import { ClassType } from "../models/classType.model";
import { ClassInstance } from "../models/classInstance.model";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: dbConfig.HOST,
    username: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    models: [User, Role, UserRole, Center, Holiday, ClassSchedule, ClassScheduleDay, Day, ClassType, ClassInstance],
    logging: false
});

export default sequelize;