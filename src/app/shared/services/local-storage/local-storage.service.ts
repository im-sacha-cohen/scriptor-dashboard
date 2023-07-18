import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  tokenName = 'scriptor_token';
  mailName = 'scriptor_mail';

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
  }

  getToken(): string|null {
    return localStorage.getItem(this.tokenName);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenName);
  }

  setMail(mail: string): void {
    localStorage.setItem(this.mailName, mail);
  }

  getMail(): string|null {
    return localStorage.getItem(this.mailName);
  }
}