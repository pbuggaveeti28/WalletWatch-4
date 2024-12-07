"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const Mongoose = __importStar(require("mongoose"));
//User model
class UserModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    // Define the schema for User documents
    createSchema() {
        this.schema = new Mongoose.Schema({
            userId: { type: String, required: true },
            userName: { type: String },
            email: { type: String },
            hashed_pswd: { type: String, required: true },
            hints: { type: String, required: true }
        }, { collection: 'users' });
    }
    // Create the User model and connect to MongoDB
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("User", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    // Retrieve all users
    retrieveAllUsers(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({});
            try {
                const userArray = yield query.exec();
                response.json(userArray);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    // Retrieve a user by a specific user ID
    retrieveUserByUserId(response, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOne({ userId });
            try {
                const user = yield query.exec();
                response.json(user);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    // Retrieve a user by email
    retrieveUserByEmail(response, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOne({ email });
            try {
                const user = yield query.exec();
                response.json(user);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    // Count the total number of user entries
    retrieveUserCount(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.estimatedDocumentCount();
            try {
                const numberOfUsers = yield query.exec();
                console.log("Number of users: " + numberOfUsers);
                response.json(numberOfUsers);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.UserModel = UserModel;
