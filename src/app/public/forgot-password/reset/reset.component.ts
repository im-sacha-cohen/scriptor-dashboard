import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Validators } from 'ngx-editor';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  formNewPassword: FormGroup;
  showSpinner = false;
  showAlert = false;
  alertMessage: string;
  alertType: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private title: Title,
    private activatedRoute: ActivatedRoute
  ) {
    this.title.setTitle('Scriptor | Mot de passe oublié');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('token')) {
        const token = params.get('token');
        this.buildForm(token);
      }
    });
  }

  buildForm(token: string|null): void {
    this.formNewPassword = this.formBuilder.group({
      token: [token],
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required]
    });
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.showAlert = false;

    this.httpClient.post(
      environment.apiUrl + '/forgot-password/reset',
      this.formNewPassword.value
    ).subscribe(
      ()  => {
        this.showSpinner = false;
        this.showAlert = true;
        this.alertMessage = 'Your password has been successfully changed. You can now login.';
        this.alertType = 'success';
        this.formNewPassword.reset();
      },
      err => {
        this.showSpinner = false;
        this.showAlert = true;
        this.alertMessage = err.error.error;
        this.alertType = 'danger';
      }
    );
  }
}
