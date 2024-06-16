import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleSidebarService {
  private sidebarToggleSubject = new BehaviorSubject<boolean>(false);

  public sidebarToggleAction$ = this.sidebarToggleSubject.asObservable();

  toggle() {
    this.sidebarToggleSubject.next(!this.sidebarToggleSubject.value);
  }
  constructor() { }
}
