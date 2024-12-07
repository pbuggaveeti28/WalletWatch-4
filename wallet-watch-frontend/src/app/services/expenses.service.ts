import { Injectable } from '@angular/core';
import { IExpenseModel } from '../interfaces/IExpense';  
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ICategoryModel } from '../interfaces/ICategory';
import { IUserModel } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private baseUrl = 'http://localhost:8080/walletwatch/expenses'; 

  constructor(private http: HttpClient) { }
  
  getAllExpenses(): Observable<IExpenseModel[]> {
    return this.http.get<IExpenseModel[]>(this.baseUrl);
  }
  getExpensesByUserId(userId: string): Observable<IExpenseModel[]> {
    return this.http.get<IExpenseModel[]>(`${this.baseUrl}/expenses/${userId}`);
  }
  addExpense(expense: IExpenseModel): Observable<IExpenseModel> {
    return this.http.post<IExpenseModel>(`${this.baseUrl}/expenses`, expense);
  }
  updateExpense(expenseId: string, expense: IExpenseModel): Observable<IExpenseModel> {
    return this.http.put<IExpenseModel>(`${this.baseUrl}/${expenseId}`, expense);
  }
    deleteExpense(expenseId: string): Observable<any> {
      console.log(`http://localhost:8080/walletwatch/expenses/{expenseId}`);
      return this.http.delete(`${this.baseUrl}/${expenseId}`);
    }
}
