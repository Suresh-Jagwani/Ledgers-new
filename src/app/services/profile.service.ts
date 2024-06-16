import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, forkJoin, map, merge, switchMap, take } from 'rxjs';
import { FunderModel, MerchantModel, OwnerModel } from '../models/database.model';
import { DatabaseService } from './database.service';
import { FinancialsModel } from '../models/financials.model';
import { FinancialsService } from './financials.service';
import { HttpClient } from '@angular/common/http';
import { FunderService } from './funder.service';

const DELETE_URL = 'http://localhost:5000/delete';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private clientSubject = new BehaviorSubject<MerchantModel | OwnerModel | FunderModel>(null);
  private financialsSubject = new BehaviorSubject<FinancialsModel>(null);
  public client$ = this.clientSubject.asObservable();
  public financials$ = this.financialsSubject.asObservable();

  constructor(
    private databaseService: DatabaseService,
    private financialsService: FinancialsService,
    private funderService: FunderService,
    private http: HttpClient,
  ) { }

  public readClient(id: string): void {
    combineLatest([
      this.databaseService.merchants$,
      this.databaseService.owners$,
      this.databaseService.funders$
    ]).subscribe(([merchants, owners, funders]) => this.clientSubject.next([...merchants, ...owners, ...funders].find(client => client.id === id) || null));
    //this.financialsService.readFinancials(this.clientSubject.getValue().id);
  }

  public async read(id: string): Promise<void> {
    this.clientSubject.next(await firstValueFrom(
      combineLatest([
        this.databaseService.funders$,
        this.databaseService.merchants$,
        this.databaseService.owners$
      ]).pipe(
        filter(([funders, merchants, owners]) => ![funders, merchants, owners].includes(null)),
        map(([funders, merchants, owners]) => [...funders, ...merchants, ...owners].find(element => element.id === id))
      )
    ));
    if (this.clientSubject.getValue()) {
      if (this.clientSubject.getValue().class === 'owner')
        this.financialsService.readFinancials(id);
      else if (this.clientSubject.getValue().class === 'merchant') {
        this.financialsService.readFinancials(id);
      }
      else if (this.clientSubject.getValue().class === 'funder') {
        this.funderService.readfunder(id);
      }
    }
  }

  public async delete(element: string, ids: string[]): Promise<void> {
    const deletePromises = ids.map(id => 
      firstValueFrom(this.http.delete<any>(`${DELETE_URL}/${element}/${id}`))
    );
    await Promise.all(deletePromises)
      .then(() => this.financialsService.readFinancials(this.clientSubject.getValue().id));
  }

  public async parseStatements(statements: FileList): Promise<void> {
    this.financialsService.parseStatements(this.clientSubject.getValue().id, statements);
  }

}
