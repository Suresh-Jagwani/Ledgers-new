import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, firstValueFrom, take, tap } from 'rxjs';
import { FunderModel, MerchantModel, OwnerModel } from '../models/database.model';
import { FinancialsModel } from '../models/financials.model';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly URL = "http://localhost:5000"
  private readonly readtUrl = `${this.URL}/read`;
  private readonly insertUrl = `${this.URL}/insert/database`;
  private readonly deleteUrl = `${this.URL}/delete`;
  private readonly insertMerchantUrl = `${this.URL}/insert/merchants`;
  private readonly readMerchantsUrl = `${this.URL}/read/merchants`;
  private readonly readFinancialsUrl = `${this.URL}/read/financials`;
  private readonly parseStatementUrl = `${this.URL}/insert/merchant/statements`;
  private readonly readFormatsUrl = `${this.URL}/read/parser/formats`;
  private readonly insertKeysUrl = `${this.URL}/insert/parser/keys`;


  private merchantsSubject = new BehaviorSubject<MerchantModel[]>([]);
  private ownersSubject = new BehaviorSubject<OwnerModel[]>([]);
  private fundersSubject = new BehaviorSubject<FunderModel[]>([]);
  private selectedSubject = new BehaviorSubject<FunderModel[] | MerchantModel[] | OwnerModel[]>([]);
  public merchants$ = this.merchantsSubject.asObservable();
  public owners$ = this.ownersSubject.asObservable();
  public funders$ = this.fundersSubject.asObservable();
  public formats$ = this.fundersSubject.asObservable();
  public selected$ = this.selectedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.read();
  }

  get funders(): Observable<FunderModel[]> {
    return this.funders$.pipe(
      filter(funder => funder !== null),
      distinctUntilChanged()
    )
  }

  async delete(): Promise<void> {
    const items = this.selectedSubject.getValue();
    let element: string;

    if (items.length > 0) {
      if (items[0] instanceof FunderModel) {
        element = 'funder';
      } else if (items[0] instanceof MerchantModel) {
        element = 'merchant';
      } else if (items[0] instanceof OwnerModel) {
        element = 'owner';
      } else {
        throw new Error("Unknown item type");
      }
    } else {
      return;
    }
    // Create an array of Promises for each delete request
    const deletePromises = items.map(item => 
      firstValueFrom(this.http.delete<any>(`${this.deleteUrl}/${element}/${item.id}`))
    );

    // Wait for all Promises to resolve
    await Promise.all(deletePromises);
  }

  
  public updateSelectedItems(items: any[]): void {
    this.selectedSubject.next(items);
  }

  public async read(element: string = 'database', id: string = null): Promise<void> {
    try {
      // const response = await firstValueFrom(this.http.get<any>(`${this.readtUrl}/${element}${id ? `/${id}` : ''}`));

      // this.merchantsSubject.next(response.merchants.map(merchant => new MerchantModel(merchant)));
      // this.ownersSubject.next(response.owners.map(owner => new OwnerModel(owner)));
      // this.fundersSubject.next(response.funders.map(funder => new FunderModel(funder)));

    } catch (error) {
      console.error(error);
    }
  }

  async insert(body: any): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.post<any>(this.insertUrl, body));
    } catch (error) {
      console.error(error);
    }
  }

  async insertMerchant(data: any): Promise<void> {
    try {
      const body = {
        'merchants': data.merchants.map((merchant) => ({
            ...merchant,
            start_date: merchant.start_date ? this.formatDate(merchant.start_date) : null
          })
        ),
        'owners': data.owners.map((owner) => ({
            ...owner,
            birth_date: owner.birth_date ? this.formatDate(owner.birth_date) : null
          })
        ),
        'ownerships': data.ownerships
      };
      const response = await firstValueFrom(this.http.post<any>(this.insertMerchantUrl, body));
    } catch (error) {
      console.error(error);
    }
  }
  
  async readMerchants(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(this.readMerchantsUrl));
      this.merchantsSubject.next(
        response.data.map(
          (item: any) => ({
            ...item,
            start_date: new Date(item.start_date.match(/\d{2} \w{3} \d{4}/)[0]),
          })
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async readMerchant(ein: string): Promise<MerchantModel | null> {
    try {
      const params = new HttpParams().set('ein', ein);
      const response = await firstValueFrom(this.http.get<any>(this.readMerchantsUrl, { params }));
      const merchant = response.data[0];
      if (merchant) {
        return {
          ...merchant,
          start_date: new Date(merchant.start_date.match(/\d{2} \w{3} \d{4}/)[0])
        };
      }
    } catch (error) {
      console.error(error);
      return error;
    }
    return null;
  }

  public async insertBankStatements(id: string, statements: string[]): Promise<void> {
    try {
      const params = new HttpParams().set('ein', id);
      const body = { statements: statements };
      const response = await firstValueFrom(this.http.post<any>(this.parseStatementUrl, body, { params: params }));
    } catch (error) {
      console.error(error);
    }
  }

  /*
  async readFormats(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(this.readFormatsUrl));
      this.formatsSubject.next(response.formats);
    } catch (error) {
      console.error(error);
    }
  }*/

  async insertKeys(data: any): Promise<void> {
    try {
      const body = {"parameters": data};
      await firstValueFrom(this.http.post<any>(this.insertKeysUrl, body));
    } catch (error) {
      console.error(error);
    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  private convertUnixTimestampToDate(timestamp: number): Date {
    // Create a date in UTC using the Unix timestamp
    const date = new Date(timestamp * 1000);
    // Adjust for the local timezone offset
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset);
  }
}
