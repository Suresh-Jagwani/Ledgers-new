import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly parseStatementUrl = 'http:///insert/merchant/statements';

  constructor(private http: HttpClient) { }

  public async parseStatement(ein: string, statements: File[]): Promise<void> {
    try {
      const params = new HttpParams().set('ein', ein);
      const body = { statements: await this.convertPdfFilesToBase64(statements) };
      const response = await firstValueFrom(this.http.post<any>(this.parseStatementUrl, body, { params: params }));
    } catch (error) {
      console.error(error);
    }
  }

  private async convertPdfFilesToBase64(files: File[]): Promise<string[]> {
    const promises = files.map(file => {
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
