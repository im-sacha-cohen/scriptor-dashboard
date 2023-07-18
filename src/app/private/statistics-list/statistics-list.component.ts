import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ModalDeleteComponent } from 'src/app/shared/components/modal/modal-delete/modal-delete.component';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.scss']
})
export class StatisticsListComponent implements OnInit {
  showActionsButtons = false;
  selectedUpdateLink: string;
  linkSelected: any;
  showSpinner = true;

  data: any;
  dataEmpty = false;

  constructor(
    private queryService: QueryService,
    private dialogService: NbDialogService,
    private title: Title,
    private toastrService: NbToastrService
  ) {
    this.title.setTitle('Scriptor | Statistiques');
  }

  ngOnInit(): void {
    this.getLinkStatistic();
  }

  getLinkStatistic(): void {
    this.showSpinner = true;

    this.queryService.query(
      'GET',
      '/secure/link-statistic'
    ).subscribe(
      resp => {
        this.data = resp.object;
        this.data.length === 0 ? this.dataEmpty = true : this.dataEmpty = false;
        this.showSpinner = false;
      }
    );
  }

  copy(text: string): void {
    navigator.clipboard.writeText(text);
    this.toastrService.show("Le lien a bien été copié", "Copié", { status: 'success' });
  }
}
