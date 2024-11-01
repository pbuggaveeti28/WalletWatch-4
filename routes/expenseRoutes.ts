import { Router, Request, Response } from 'express';
import {ExpenseModel, IExpenseModel} from '../model/Expense';
import * as crypto from 'crypto';


export function  expenseRoutes(Expense: ExpenseModel) : Router {
  const router = Router();

  /**
   * GET /expenses/:expenseId
   * Retrieve a single expense by its unique expenseId.
   */

  router.get('/expenses/:expenseId', async (req, res) => {
    var id = req.params.expenseId;
    console.log('Query Expenses based on user Id'+ id);
    try {
      await Expense.retrieveExpensesByExpenseId(res,id); 
    } catch (error) {
      console.error('Error retrieving expenses by Id:', error);
      res.status(500).send({ message: 'Failed to retrieve expenses by Id.' });
    }
   });

  /**
   * GET /expenses
   * Retrieve all expenses in the collection.
   */
  
  router.get('/expenses', async (req, res) => {
    console.log('Query All Expenses');
    try {
      await Expense.retrieveAllExpenses(res);
    } catch (error) {
      console.error('Error retrieving expenses:', error);
      res.status(500).send({ message: 'Failed to retrieve expenses.' });
    }
   });
  
   /**
   * POST /expenses
   * Add a new expense to the collection.
   * Generates a unique expenseId for each new entry.
   */
  router.post('/expenses', async (req: Request, res: Response) => {
      const id = crypto.randomBytes(16).toString("hex");
      const jsonObj = { ...req.body, expenseId: id };
      console.log(jsonObj);
      console.log("ExpenseModel:", Expense);
      try {
        await Expense.model.create([jsonObj]);
        res.send('{"id":"' + id + '"}');
      }
      catch (e) {
        console.error(e);
        console.log('object creation failed');
      }

  });
  return router;
};


