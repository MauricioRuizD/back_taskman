"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const models_1 = require("../../../mongodb/models");
/**
 * @description
 * @export
 * @class UserService
 */
class UserService {
    async createUser(name, username, password, role) {
        const userSaved = await new models_1.User({ name, username, password, role }).save();
        return userSaved;
    }
    async consultUser(id) {
        const userConsult = await models_1.User.findById(id);
        if (userConsult) {
            return userConsult;
        }
    }
}
exports.UserService = UserService;
