import mongoose from "mongoose";

const budgetId1 = new mongoose.Types.ObjectId();
const budgetId2 = new mongoose.Types.ObjectId();
const budgetId3 = new mongoose.Types.ObjectId();

const tranId1 = new mongoose.Types.ObjectId();
const tranId2 = new mongoose.Types.ObjectId();
const tranId3 = new mongoose.Types.ObjectId();


const userId = new mongoose.Types.ObjectId();

export const budgets = [
    {
        _id: budgetId1,
        type: "expense",
        amount: 1000,
        category: "Housing"
    },
    {
        _id: budgetId2,
        type: "expense",
        amount: 500,
        category: "Food"
    },
    {
        _id: budgetId3,
        type: "income",
        amount: 2000,
        category: "Paycheck"
    }
]

export const transactions = [
    {
        _id: tranId1,
        type: "expense",
        amount: 100,
        category: "Food",
        date: "2023/02/16",
        description: "Popeyes"
    },
    {
        _id: tranId2,
        type: "expense",
        amount: 200,
        category: "Food",
        date: "2023/02/17",
        description: "Uber Eats"
    },
    {
        _id: tranId3,
        type: "expense",
        amount: 1100,
        category: "Housing",
        date: "2023/02/01",
        description: "Rent"
    }
]

export const user = {
    _id: userId,
    firstName: "John",
    lastName: "Doe",
    email: "John.Doe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    budgets: [budgetId1, budgetId2, budgetId3],
    transactions: [tranId3, tranId1, tranId2]
}