import mongoose from "mongoose";

// schema for a User object
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5
        }, 
        budgets: {
            type: Array,
            default: []
        }, 
        transactions: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

// create a mongoose model from schema
const User = mongoose.model("User", UserSchema);
export default User;