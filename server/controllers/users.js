import User from "../models/User.js";
import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";

/* CREATE */
export const createTransaction = async (req, res) => {
    try {
        const { id: userId, type, amount, category, date, description } = req.body;
        const user = await User.findById(userId);
        // create new transaction object
        const newTransaction = new Transaction({
            type: type,
            amount: amount,
            category: category,
            date: date,
            description: description,
        });
        await newTransaction.save();
        user.transactions.push(newTransaction._id.toString());
        await user.save();

        // grab user's all transactions
        const updatedTransactions = await Promise.all(
            user.transactions.map((id) => Transaction.findById(id))
        );
        // return all user's transactions to front end
        res.status(201).json(updatedTransactions);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const createBudget = async (req, res) => {
    try {
        // grab id from request's params
        const { id: userId } = req.params;
        // grab user info by id
        const user = await User.findById(userId);
        // create new budget object
        const newBudget = new Budget({
            amount: req.body.amount,
            category: req.body.category,
            type: req.body.type,
        });
        await newBudget.save();
        user.budgets.push(newBudget._id.toString());
        await user.save();

        // grab user's all transactions
        const updatedBudgets = await Promise.all(
            user.budgets.map((id) => Budget.findById(id))
        );
        // return all user's transactions to front end
        res.status(201).json(updatedBudgets);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

/* READ */
export const getUser = async (req, res) => {
    try {
        // grab id from request's params
        const { id } = req.params;
        // grab user info by id
        const user = await User.findById(id);
        // return user info to front end
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        // grab id from request's params
        const { id: userId } = req.params;
        // grab user info by id
        const user = await User.findById(userId);
        // grab user's all transactions
        const transactions = await Promise.all(
            user.transactions.map((id) => Transaction.findById(id))
        );
        // return all user's transactions to front end
        res.status(200).json(transactions);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getBudgets = async (req, res) => {
    try {
        // grab id from request's params
        const { id: userId } = req.params;
        // grab user info by id
        const user = await User.findById(userId);
        // grab all transactions
        const budgets = await Promise.all(
            user.budgets.map((id) => Budget.findById(id))
        );
        // return user info to front end
        res.status(200).json(budgets);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const deleteTransaction = async (req, res) => {
    try {
        // grab id from request's params
        const { id, transactionId } = req.params;
        // console.log(id, transactionId);
        // grab user info by id
        const user = await User.findById(id);

        // if user have target transaction, delete it
        await Transaction.deleteOne({ _id: transactionId });
        if (user.transactions.includes(transactionId)) {
            user.transactions = user.transactions.filter(
                (id) => id !== transactionId
            );
        }
        await user.save();

        // grab user's all transactions
        const updatedTransactions = await Promise.all(
            user.transactions.map((id) => Transaction.findById(id))
        );
        // return all user's transactions to front end
        res.status(201).json(updatedTransactions);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteBudget = async (req, res) => {
    try {
        // grab id from request's params
        const { id, budgetId } = req.params;
        // grab user info by id
        const user = await User.findById(id);

        // if user have target transaction, delete it
        await Budget.deleteOne({ _id: budgetId });
        if (user.budgets.includes(budgetId)) {
            user.budgets = user.budgets.filter(
                (id) => id!== budgetId
            );
        }
        await user.save();

        // grab user's all transactions
        const updatedBudgets = await Promise.all(
            user.budgets.map((id) => Budget.findById(id))
        );
        // return all user's transactions to front end
        res.status(201).json(updatedBudgets);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        // grab id from request's params
        const { id: userId, transactionId } = req.params;
        const { type, amount, category, date, description } = req.body;
        // grab user info by id
        const user = await User.findById(userId);

        // if user have target transaction, update it
        if (user.transactions.includes(transactionId)) {
            const updatedTransaction = await Transaction.findByIdAndUpdate(
                transactionId,
                {
                    type: type,
                    amount: amount,
                    category: category,
                    date: date,
                    description: description,
                }
            );
            res.status(200).json(updatedTransaction);
        }

        res.status(200).json(null);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateBudget = async (req, res) => {
    try {
        console.log(req.body);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};