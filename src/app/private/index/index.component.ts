import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../shared/services/auth/auth.service';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  firstName: any;

  showLinkCreatedTodaySpinner = true;
  countLinkCreatedToday: number;

  showLinkCreatedYesterdaySpinner = true;
  countLinkCreatedYesterday: number;

  showClickCumulatedTodaySpinner = true;
  countClickCumulatedToday: number;

  showClickCumulatedYesterdaySpinner = true;
  countClickCumulatedYesterday: number;

  constructor(
    private authService: AuthService,
    private title: Title,
    private queryService: QueryService
  ) {
    this.title.setTitle('Scriptor | Accueil');
  }

  ngOnInit(): void {
    this.firstName = this.authService.getFirstName();

    this.getLinkCreatedToday();
    this.getLinkCreatedYesterday();

    this.getClickCumulatedToday();
    this.getClickCumulatedYesterday();
  }

  private getLinkCreatedToday(): void {
    this.showLinkCreatedTodaySpinner = true;

    this.queryService.query(
      'GET',
      '/secure/link-statistic/link-created-today'
    ).subscribe(
      resp => {
        this.countLinkCreatedToday = resp.count;
        this.showLinkCreatedTodaySpinner = false;
      }
    );
  }

  private getLinkCreatedYesterday(): void {
    this.showLinkCreatedYesterdaySpinner = true;

    this.queryService.query(
      'GET',
      '/secure/link-statistic/link-created-yesterday'
    ).subscribe(
      resp => {
        this.countLinkCreatedYesterday = resp.count;
        this.showLinkCreatedYesterdaySpinner = false;
      }
    );
  }

  private getClickCumulatedToday(): void {
    this.showClickCumulatedTodaySpinner = true;

    this.queryService.query(
      'GET',
      '/secure/link-statistic/click-cumulated-today'
    ).subscribe(
      resp => {
        this.countClickCumulatedToday = resp.count;
        this.showClickCumulatedTodaySpinner = false;
      }
    );
  }

  private getClickCumulatedYesterday(): void {
    this.showClickCumulatedYesterdaySpinner = true;

    this.queryService.query(
      'GET',
      '/secure/link-statistic/click-cumulated-yesterday'
    ).subscribe(
      resp => {
        this.countClickCumulatedYesterday = resp.count;
        this.showClickCumulatedYesterdaySpinner = false;
      }
    );
  }
}
