import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  applications = new Subject<[]>();
  applicationObjects = new Subject<[]>();
  properties = new Subject<[]>();

  constructor() { }

  public set(applications: []): void {
    this.applications.next(applications);
  }

  public setApplicationObjects(applicationObjects: []): void {
    this.applicationObjects.next(applicationObjects);
  }

  public setProperties(properties: []): void {
    this.properties.next(properties);
  }
}
