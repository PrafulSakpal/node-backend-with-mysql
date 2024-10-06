// src/models/user.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'; // assuming you have the db connection setup

// Define the attributes of the User model
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

// This will allow partial attributes for creating
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Extend Sequelize Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model with sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // passing the `sequelize` instance
    tableName: 'users', // name of the table in the database
  }
);

export default User;
