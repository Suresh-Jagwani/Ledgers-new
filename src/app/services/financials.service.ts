import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { FinancialsModel } from '../models/financials.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinancialsService {
  private readonly URL = "http://localhost:5000"
  private readonly insertStatementUrl = `${this.URL}/insert/statements`;
  private readonly readFinancialsUrl = `${this.URL}/read/financials`;

  constructor(private http: HttpClient) { }

  private financialsSubject = new BehaviorSubject<FinancialsModel>(null);
  public financials$ = this.financialsSubject.asObservable();

  public async readFinancials(id: string): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(`${this.readFinancialsUrl}/${id}`));
      if (response && response.statements) {
        this.financialsSubject.next(new FinancialsModel(response));
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public async parseStatements(id: string, statements: FileList): Promise<void> {
    try {
      const base64Statements = await this.convertPdfFilesToBase64(statements);
      const response = await firstValueFrom(this.http.post<any>(`${this.insertStatementUrl}/${id}`, { statements: base64Statements }));
      this.readFinancials(id);
    } catch (error) {
      console.error(error);
    }
  }

  private async convertPdfFilesToBase64(files: FileList): Promise<string[]> {
    const promises = Array.from(files).map(file => {
      if (file.type !== 'application/pdf') {
        return Promise.reject("File is not a PDF");
      }
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]);
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  }
}
