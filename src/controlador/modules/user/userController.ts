import { Request, Response } from 'express';
import { User } from '../../../mongodb/models';
import { UserService } from "./UserService";
import axios from 'axios';

export class UserController {
  private userService: UserService;

  /**
   * Creates an instance of UserController.
   */
  constructor() {
      this.userService = new UserService()
  }

  static async updateUser(req: Request, res: Response) {
    const { id, name, email, password } = req.body;

    try {
      const response = await axios.put(`http://localhost:3000/api/users/${id}`, {
        name,
        email,
        password
      });

      res.json({ success: true, result: response.data });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');

      res.json({ success: true, users: response.data });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
}