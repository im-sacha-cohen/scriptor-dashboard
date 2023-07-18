import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Environment } from 'ag-grid-community';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formSignup: FormGroup;
  showSpinner = false;
  showSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private title: Title,
    private toastrService: NbToastrService
  ) {
    this.title.setTitle('Scriptor | Inscription');
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(): void {
    this.formSignup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      domainName: ['https://link.Scriptor.fr', Validators.required],
      facebookPage: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.showSuccess = false;
    
    this.httpClient.post(
      environment.apiUrl + '/user',
      this.formSignup.value
    ).subscribe(
      (response: any)  => {
        this.showSpinner = false;
        this.showSuccess = true;
        this.buildForm();
      },
      error => {
        this.showSpinner = false;
        this.toastrService.show(error.error.error, "Error", { status: 'danger' });
      }
    );
  }
}
