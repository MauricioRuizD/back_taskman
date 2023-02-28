"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserIdentityInfoSchemaDefinition = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const { Types } = mongoose_1.Schema;
exports.UserIdentityInfoSchemaDefinition = {
    name: {
        type: {
            firstName: {
                type: Types.String,
                required: true,
            },
            lastName: {
                type: Types.String,
                default: "",
            },
        },
        required: true,
    },
    username: {
        type: Types.String,
        required: true,
    },
};
const UserSchema = new mongoose_1.Schema({
    ...exports.UserIdentityInfoSchemaDefinition,
    role: {
        type: Types.String,
        enum: ['BASE', 'AGENT', 'ADMIN'],
        default: 'BASE',
    },
    password: {
        type: Types.String,
        required: true,
    },
    deleted: {
        type: Types.Boolean,
        default: false,
        required: true,
    },
    lastLogin: {
        type: Types.Date,
    },
    agentStatus: {
        type: mongoose_1.Schema.Types.String
    },
    lastLogout: {
        type: Types.Date,
    }
}, {
    timestamps: true,
});
UserSchema.pre('findOneAndUpdate', async function findOneAndUpdate(next) {
    try {
        const data = this.getUpdate();
        if (data.password) {
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            data.password = (0, bcryptjs_1.hashSync)(data.password, salt);
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
UserSchema.pre('save', async function save(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        this.password = (0, bcryptjs_1.hashSync)(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
UserSchema.methods.comparePassword = function (candidatePassword) {
    return (0, bcryptjs_1.compareSync)(candidatePassword, this.password);
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
