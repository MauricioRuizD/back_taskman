"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("./UserService");
const axios_1 = __importDefault(require("axios"));
class UserController {
    /**
     * Creates an instance of UserController.
     */
    constructor() {
        this.userService = new UserService_1.UserService();
    }
    static async updateUser(req, res) {
        const { id, name, email, password } = req.body;
        try {
            const response = await axios_1.default.put(`http://localhost:3000/api/users/${id}`, {
                name,
                email,
                password
            });
            res.json({ success: true, result: response.data });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    }
    static async getUsers(req, res) {
        try {
            const response = await axios_1.default.get('https://jsonplaceholder.typicode.com/users');
            res.json({ success: true, users: response.data });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    }
}
exports.UserController = UserController;
