import { Request, Response, NextFunction } from "express";
import User from "../db/models/user";
import bcrypt from 'bcrypt'
import { Op } from "sequelize";

const createUser = async (req: Request, res: Response) :Promise<any> => {
    try {
      const { name, email, password } = req.body;
  
      // Input validation
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists.' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user with hashed password
      const newUser = await User.create({ name, email, password: hashedPassword });
  
      // Exclude password from the response
      const { password: _, ...userWithoutPassword } = newUser.get({ plain: true });
  
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  };

  const getUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
  
      // Find user by ID
      const user = await User.findByPk(id);
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Exclude password from the response
      const { password: _, ...userWithoutPassword } = user.get({ plain: true });
  
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve user' });
    }
  };

  const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      // Find user by ID
      const user = await User.findByPk(id);
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // If email is provided, check if it's already taken by another user
      if (email) {
        const existingUser = await User.findOne({ where: { email, id: { [Op.ne]: id } } });
        if (existingUser) {
          return res.status(409).json({ error: 'User with this email already exists.' });
        }
      }
  
      // Update user properties
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10); // Hash password if provided
  
      await user.save();
  
      // Exclude password from the response
      const { password: _, ...updatedUserWithoutPassword } = user.get({ plain: true });
  
      return res.status(200).json(updatedUserWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update user' });
    }
  };

export default {
    createUser,
    getUser,
    updateUser
}
