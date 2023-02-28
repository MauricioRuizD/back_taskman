import { config } from "dotenv"; 
config();

import {connect, Connection, connection, ConnectOptions, disconnect, Mongoose} from "mongoose";
import { Agent } from "https";
import axios from 'axios';

export const serverPort = process.env.PORT || 3000;
export const mongodbConnectionString: string | undefined = process.env.MONGODB_CONNECTION_STRING;
 export const jwtSecretRegister = process.env.JWT_SECRET_REGISTER || "4C462DB5C33D0FC1F342542FADD84F97EDF3D1F32C0CC6D5DA14921BD6464209";
 export const jwtSecret = process.env.JWT_SECRET || '015e321bf7fbcc899587fd457f47ccf7c58e9dc7575a18ea62cd1098';
export const channelCode = process.env.CHANNEL_CODE || "105"
 export const defaultInBulkPaginationInsert =  Number(process.env.DEFAULT_IN_BULK_PAGINATION_INSERT) || 10
export const axiosInstance = axios.create({httpsAgent: new Agent({rejectUnauthorized: false})})

export const mongoDbConnection: Connection = connection;

let connectionTimeout: NodeJS.Timeout | null = null;

export const disconnectFromMongoDB = (): Promise<any> => {
    if(connectionTimeout) {
        clearTimeout(connectionTimeout)
    }
    return disconnect().then(() => console.log("[MONGODB CONFIGURATION][INFO] Successfully disconnected from MongoDB"));
};

export const connectToMongoDB = async (): Promise<Mongoose | void> => {
    if(mongodbConnectionString) {            
        return new Promise((resolve, reject) => {

            mongoDbConnection.removeAllListeners();

            if(mongoDbConnection.readyState === 1) {
                console.warn('[MONGODB CONFIGURATION][ALERT] MongoDB is already connected');
                resolve();
                return;
            }

            let connected = false;

            mongoDbConnection.on('connected', () => {
                connected = true;
                if(connectionTimeout) {
                    clearTimeout(connectionTimeout)
                }
                console.log('[MONGODB CONFIGURATION][INFO] Mongo Connection established');
                resolve()
            });

            const options = {
              useCreateIndex: true,
              useNewUrlParser: true,
              useFindAndModify: false,
              useUnifiedTopology: true
            } as ConnectOptions

            connect(mongodbConnectionString, { useNewUrlParser: true,
                                            useUnifiedTopology: true, } as ConnectOptions)
                .catch((error) => reject(error));

            connectionTimeout = setTimeout(() => {
                if(!connected) {
                    reject("[TIMEOUT] Cannot connect to MongoDB");
                    disconnectFromMongoDB();
                }
            }, 10000)

        })
    } else {
        return new Promise((resolve, reject) => reject("The MONGODB_CONNECTION_STRING environment variable is required"))
    }
};

connectToMongoDB();