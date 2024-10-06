 import { Sequelize } from 'sequelize';
 import dotenv from "dotenv";
 import User from './models/user';

 dotenv.config();

const sequelize = new Sequelize(process.env.DBName ?? "", process.env.DBUser ?? "", process.env.DBPassword ?? "", {
  host: 'localhost',
  dialect: 'mysql',
});
sequelize.sync({ alter: false, force: false, logging: false })


export default sequelize;

