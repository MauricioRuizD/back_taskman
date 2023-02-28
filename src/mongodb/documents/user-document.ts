import { Document } from "mongoose";
import { ITimestamp, IUserIdentityInfo } from "../interfaces";
import { UserRole } from "../../enums";

export interface UserDocument extends IUserIdentityInfo, Document, ITimestamp {
    password: string
    role: UserRole,
    lastLogin: Date,
    agentStatus: string
    lastLogout: Date
    comparePassword(candidatePassword: string): boolean
}