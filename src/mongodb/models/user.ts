import {model, Schema, SchemaDefinition} from "mongoose";
import {UserDocument} from "../documents/user-document";
import {compareSync, genSaltSync, hashSync} from "bcryptjs";

const {Types} = Schema;

export const UserIdentityInfoSchemaDefinition: SchemaDefinition = {
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

const UserSchema = new Schema(
    {
        ...UserIdentityInfoSchemaDefinition,
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
            type: Schema.Types.String
        },
        lastLogout: {
            type: Types.Date,

        }
    },
    {
        timestamps: true,
    }
);

UserSchema.pre<UserDocument>('findOneAndUpdate'as any, async function findOneAndUpdate(next) {
    try {

        const data  =  (this as any).getUpdate();
        if (data.password) {
            const salt = genSaltSync(10);
            data.password = hashSync(data.password, salt); 
        }
        next()

    } catch (error: any) {
        next(error)
    }
});

UserSchema.pre<UserDocument>('save', async function save(next) {
    try {

        if (!this.isModified('password')) {
            return next()
        }

        const salt = genSaltSync(10);
        this.password = hashSync(this.password, salt);

        next()

    } catch (error: any) {
        next(error)
    }
});

UserSchema.methods.comparePassword = function (candidatePassword: string): boolean {
    return compareSync(candidatePassword, (this as any).password)
};

export const User = model<UserDocument>('User', UserSchema);