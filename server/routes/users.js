import express from 'express';
import { 
    getUser,
    getBudgets,
    deleteBudget,
    updateBudget,
    createBudget,
    createTransaction,
    getTransactions,
    deleteTransaction,
    updateTransaction
 } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* CREATE */
router.post('/:id/new-transaction', verifyToken, createTransaction);
router.post('/:id/new-budget', verifyToken, createBudget);

/* READ */
// grab user by id
router.get('/:id', verifyToken, getUser);
// grab user's budgets by id
router.get('/:id/budgets', verifyToken, getBudgets);
// grab user's transactions by id
router.get('/:id/transactions', verifyToken, getTransactions);

/* UPDATE */
router.patch('/:id/transactions/:transactionId/delete', verifyToken, deleteTransaction);
router.patch('/:id/transactions/:transactionId/update', verifyToken, updateTransaction);
router.patch('/:id/budgets/:budgetId/delete', verifyToken, deleteBudget);
router.patch('/:id/budgets/:budgetId/update', verifyToken, updateBudget);

export default router;