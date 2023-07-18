import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
//import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  showSpinner = false;
  errorMessage: string;
  alertType: string;
  alertMessage: string|null;

  isAlreadyConnected = false;
  firstName: string;
  positions: NbGlobalPhysicalPosition;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService,
    private title: Title
  ) {
    this.title.setTitle('Scriptor | Connexion');
  }

  ngOnInit(): void {
    this.formLogin = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      email: [this.authService.getMail(), Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.alertMessage = null;

    this.httpClient.post(
      environment.apiUrl + '/login',
      this.formLogin.value
    ).subscribe(
      (response: any)  => {
        this.showSpinner = false;
        const token = this.authService.getDecodedToken(response.token);
        this.authService.setToken(response.token);
        this.authService.setEmail(response.token);

        this.router.navigate(['/home']);
      },
      error => {
        this.showSpinner = false;

        this.alertType = 'danger';
        this.alertMessage = error.error?.message;
      }
    );
  }
}