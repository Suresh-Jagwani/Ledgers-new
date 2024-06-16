import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, tap } from 'rxjs';
import { SummaryModel, TransactionModel } from '../models/statement.model';

@Injectable({
  providedIn: 'root'
})
export class StatementParserService {
  private readonly apiUrl = 'https:///insert/merchant/statement';
  
  constructor(private http: HttpClient) {}
  public summarySubject = new BehaviorSubject<TransactionModel[]>([]);
  public summary$ = this.summarySubject.asObservable();
  private summaryData$: string;
  private transactionsSubject = new BehaviorSubject<TransactionModel[]>([]);
  private balancesSubject = new BehaviorSubject<SummaryModel[]>([]);
  public transactions$ = this.transactionsSubject.asObservable();
  public balances$ = this.balancesSubject.asObservable();
  /*
  public summaryData$ = combineLatest([this.transactions$, this.balances$]).pipe(
    map(([transactions, balances]) => this.calculateSummary(transactions, balances))
  );

  uploadPdf(pdfBase64: string): Observable<any> {
    const body = { pdf_base64: pdfBase64 };
    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
        this.transactionsSubject.next(this.convertToTransactionsElements(response["transactions"]));
        this.balancesSubject.next(this.convertToBalancesElements(response["balances"]));
      })
    );
  }
  
  handleFileSelect(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent: any) => {
        const binaryString = readerEvent.target.result;
        this.pdfBase64 = binaryString.split(',')[1]; // Extract base64 content
        this.uploadPdf(this.pdfBase64).subscribe({
          next: (response) => {
            console.log('Upload successful', response);
          },
          error: (error) => {
            console.error('Upload failed', error);
          },
          complete: () => {
            console.log('Upload complete');
          }
        });
      };
      reader.readAsDataURL(file);
    }
  }

  convertToTransactionsElements(jsonString: string): TransactionModel[] {
    const jsonData = JSON.parse(jsonString);

    return jsonData.map((item: any) => ({
      date: this.convertUnixTimestampToDate(item.date), // Assuming the date is a Unix timestamp
      description: item.description,
      amount: item.amount,
      type: item.deposit == '1' ? 'Deposit' : 'Withdrawal', // Assuming 'deposit' field indicates the type
      revenue: item.revenue === 0 ? false : true, // Assuming revenue field is 0 for false, non-zero for true
    }));
  }

  convertToBalancesElements(jsonString: string): SummaryModel[] {
    const jsonData = JSON.parse(jsonString);

    return jsonData.map((item: any) => ({
      date: this.convertUnixTimestampToDate(item.date), // Assuming the date is a Unix timestamp
      balance: item.balance
    }));
  }

  private convertUnixTimestampToDate(timestamp: number): Date {
    // Create a date in UTC using the Unix timestamp
    const date = new Date(timestamp * 1000);
  
    // Adjust for the local timezone offset
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset);
  }

  private calculateSummary(transactions: TransactionModel[], balances: SummaryModel[]): SummaryModel[] {
    const summaryMap = new Map<string, SummaryModel>();
  
    transactions.forEach(transaction => {
      const dateStr = transaction.date.toISOString().split('T')[0];
      const summary = summaryMap.get(dateStr) || {
        date: transaction.date,
        count: 0,
        deposits: 0,
        withdrawals: 0,
        revenue: 0,
        payments: 0,
        balance: 0
      };
      
      summary.count += 1;
      if (transaction.deposit === true) {
        summary.deposits += transaction.amount;
        if (transaction.revenue) {
          summary.revenue += transaction.amount;
        }
      } else if (transaction.deposit === false) {
        summary.withdrawals += transaction.amount;
        if (transaction.revenue) {
          summary.payments += transaction.amount;
        }
      }
      
      const balanceEntry = balances.find(b => b.date.toISOString().split('T')[0] === dateStr);
      if (balanceEntry) {
        summary.balance = balanceEntry.balance;
      }

    });
    return Array.from(summaryMap.values());
  }*/
}
