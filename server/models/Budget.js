import mongoose from "mongoose";

// schema for a Budget object
const BudgetSchema = new mongoose.Schema(
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
        }
    },
    { timestamps: true }
);

// create a mongoose model from schema
const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;