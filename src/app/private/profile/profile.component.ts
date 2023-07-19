import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  accountForm: FormGroup;
  showButtonSpinner = false;
  showSpinnerResetPassword = false;

  constructor(
    private queryService: QueryService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private title: Title
  ) {
    this.title.setTitle('Scriptor | Profil');
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.queryService.query(
      'GET',
      '/secure/user'
    ).subscribe(
      resp => {
        this.user = resp;
        this.buildForm();
      }
    );
  }

  buildForm(): void {
    this.accountForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    this.showButtonSpinner = true;

    this.queryService.query(
      'PUT',
      '/secure/user',
      this.accountForm.value
    ).subscribe(
      resp => {
        this.showButtonSpinner = false;
        this.toastrService.show("Ton compte a bien été mit à jour !", "Succès", { status: 'success' });
        this.authService.setToken(resp.object.token);
        this.authService.setEmail(resp.object.token);
      },
      error => {
        this.showButtonSpinner = false;
        this.toastrService.show(error.error.error, "Une erreur est survenue", { status: 'danger' });
      }
    );
  }

  sendResetPasswordLink(): void {
    this.showSpinnerResetPassword = true;

    this.httpClient.post(
      environment.apiUrl + '/forgot-password',
      { email: this.user.email }
    ).subscribe(
      ()  => {
        this.showSpinnerResetPassword = false;
        this.toastrService.show("Un mail de réinitialisation a été envoyé", "Succès", { status: 'success' });
      }
    );
  }
}
