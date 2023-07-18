import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  setToken(token: string): void {
    this.localStorageService.setToken(token);
  }

  getToken(): string|null {
    return this.localStorageService.getToken();
  }

  getDecodedToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  setEmail(token: string): void {
    const decodedToken = this.getDecodedToken(token);
    this.localStorageService.setMail(decodedToken.email);
  }

  getMail(): string|null {
    return this.localStorageService.getMail();
  }

  getRef(): string|null {
    const token = this.localStorageService.getToken();

    if (token) {
      const decodedToken = this.getDecodedToken(token);
      return decodedToken['ref'];
    }

    return null;
  }

  getFirstName(): string|null {
    const token = this.localStorageService.getToken();

    if (token) {
      const decodedToken = this.getDecodedToken(token);
      return decodedToken['firstName'];
    }

    return null;
  }

  getLastName(): string|null {
    const token = this.localStorageService.getToken();

    if (token) {
      const decodedToken = this.getDecodedToken(token);
      return decodedToken['lastName'];
    }

    return null;
  }

  getFullName(): string|null {
    const token = this.localStorageService.getToken();

    if (token) {
      const decodedToken = this.getDecodedToken(token);
      return decodedToken['fullName'];
    }

    return null;
  }

  getInitial(): string|null {
    const token = this.localStorageService.getToken();

    if (token) {
      const decodedToken = this.getDecodedToken(token);
      return decodedToken['initial'];
    }

    return null;
  }

  isConnected(): boolean {
    const token = this.localStorageService.getToken();

    if (!this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    return false;
  }

  isAdmin(): boolean {
    const token = this.localStorageService.getToken();

    if (token) {
      const decodedToken = this.getDecodedToken(token);

      if (this.isConnected() && decodedToken['roles'].includes('ROLE_ADMIN') || decodedToken['roles'].includes('ROLE_SUPERADMIN')) {
        return true;
      }
    }
    
    return false;
  }

  logout(): void {
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
  }
}