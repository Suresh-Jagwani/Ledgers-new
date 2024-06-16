import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, firstValueFrom } from 'rxjs';
import { ParameterModel } from '../models/parser.model';

@Injectable({
  providedIn: 'root'
})
export class FunderService {

  private readonly URL = "http://localhost:5000"
  private readonly readFunder = `${this.URL}/read/funders`;

  constructor(private http: HttpClient) { }

  private keysSubject = new BehaviorSubject<ParameterModel[]>(null);
  public keys$ = this.keysSubject.asObservable();

  public async readfunder(id: string): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get<any>(`${this.readFunder}/${id}`));
      if (response && response.keys) {
        this.keysSubject.next(response.keys);
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  public get keys(): Observable<ParameterModel[]> {
    return this.keys$.pipe(
      filter(keys => keys !== null)
    );
  }
}
