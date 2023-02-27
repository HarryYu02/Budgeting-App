import mongoose from "mongoose";

// schema for a Transaction object
const TransactionSchema = new mongoose.Schema(
    {
        // income / expense
        type: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        date: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        description: {
            type: String,
            required: true,
            min: 2,
            max: 50
        }
    },
    { timestamps: true }
);

// create a mongoose model from schema
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;