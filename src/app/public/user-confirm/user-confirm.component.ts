import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.scss']
})
export class UserConfirmComponent implements OnInit {
  showSpinner = true;
  alertType: string;
  alertMessage: string;
  token: string|null;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {
    this.title.setTitle('Scriptor | Confirmation de compte');

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('token')) {
        this.token = params.get('token');
        this.confirmAccount();
      }
    });
  }

  ngOnInit(): void {
  }

  confirmAccount(): void {
    this.showSpinner = true;
    
    this.httpClient.get(
      environment.apiUrl + '/user-confirm/' + this.token
    ).subscribe(
      (response: any)  => {
        this.showSpinner = false;
        this.alertType = 'success';
        this.alertMessage = 'Votre compte a bien été confirmé, vous pouvez maintenant vous connecter.';
      },
      error => {
        console.log('error', error)
        this.showSpinner = false;
        this.alertType = 'danger';
        this.alertMessage = error.error.message;
      }
    );
  }
}
