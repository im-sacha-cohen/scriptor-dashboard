import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-new',
  templateUrl: './request-new.component.html',
  styleUrls: ['./request-new.component.scss']
})
export class RequestNewComponent implements OnInit {
  formReset: FormGroup;
  showSpinner = false;
  showAlert = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private title: Title
  ) {
    this.title.setTitle('Scriptor | Mot de passe oublié');
  }

  ngOnInit(): void {
    this.formReset = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      email: [this.authService.getMail(), Validators.required]
    });
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.showAlert = false;

    this.httpClient.post(
      environment.apiUrl + '/forgot-password',
      this.formReset.value
    ).subscribe(
      ()  => {
        this.showSpinner = false;
        this.showAlert = true;
        this.formReset.reset();
      }
    );
  }
}
