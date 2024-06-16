import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, firstValueFrom, map } from 'rxjs';
import { MerchantModel } from '../models/database.model';
import { HttpClient } from '@angular/common/http';
import { FinancialsService } from './financials.service';
import { ParameterModel, SchemeModel } from '../models/parser.model';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  private readonly URL = "http://localhost:5000"
  private readonly readParserUrl = `${this.URL}/read/parser`;
  private readonly insertPaeameterUrl = `${this.URL}/insert/parameters`;

  private schemesSubject = new BehaviorSubject<SchemeModel[]>([]);
  public schemes$ = this.schemesSubject.asObservable();
  private keysSubject = new BehaviorSubject<ParameterModel[]>([]);
  public keys$ = this.keysSubject.asObservable();

  constructor(private http: HttpClient, private financialsService: FinancialsService) {
    this.read();
  }

  get schemes(): Observable<SchemeModel[]> {
    return this.schemes$.pipe(
      filter(scheme => scheme !== null),
      distinctUntilChanged()
    )
  }

  async read(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(this.readParserUrl));
      console.log(response)
      this.schemesSubject.next(response.schemes);
      this.keysSubject.next(response.keys);
    } catch (error) {
      console.error(error);
    }
  }

  async insert(data: any): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.post<any>(this.insertPaeameterUrl, {'parameters': data}));
    } catch (error) {
      console.error(error);
    }
  }

  async readFormats(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(this.readParserUrl));
      this.schemesSubject.next(response.formats);
    } catch (error) {
      console.error(error);
    }
  }

  async insertKeys(data: any): Promise<void> {
    try {
      const body = {"parameters": data};
      await firstValueFrom(this.http.post<any>(this.insertPaeameterUrl, body));
    } catch (error) {
      console.error(error);
    }
  }
}
