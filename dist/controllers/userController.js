"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApi = exports.UserController = void 0;
const user_1 = require("../models/user");
const axios_1 = __importDefault(require("axios"));
class UserController {
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
class UserApi {
    static async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        try {
            const user = await user_1.UserModel.findByIdAndUpdate(id, { name, email, password }, { new: true });
            res.json({ success: true, result: user });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    }
}
exports.UserApi = UserApi;
