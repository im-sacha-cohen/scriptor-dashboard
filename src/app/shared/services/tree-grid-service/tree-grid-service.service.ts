import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeGridService {
  showSpinner = new Subject<boolean>();
  data = new Subject<any[]>();

  constructor() { }
}
