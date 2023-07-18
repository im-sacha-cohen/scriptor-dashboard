import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ModalDeleteComponent } from 'src/app/shared/components/modal/modal-delete/modal-delete.component';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss']
})
export class LinkListComponent implements OnInit {
  showActionsButtons = false;
  selectedUpdateLink: string;
  linkSelected: any;
  showSpinner = true;
  showMoreBtnSpinner = false;

  links: any[] = [];
  dataEmpty = false;
  hasMore = false;
  page = 1;

  constructor(
    private queryService: QueryService,
    private dialogService: NbDialogService,
    private title: Title,
    private toastrService: NbToastrService
  ) {
    this.title.setTitle('Scriptor | Liens');
  }

  async ngOnInit(): Promise<void> {
    this.showSpinner = true;
    await this.getLinks();
    this.showSpinner = false;
  }

  async getLinks(): Promise<void> {
    const request = this.queryService.query(
      'GET',
      `/secure/link?page=${this.page}`
    );
    const resp = await lastValueFrom(request);

    this.links.push(...resp.links);
    this.hasMore = resp.hasMore;
    this.links.length === 0 ? this.dataEmpty = true : this.dataEmpty = false;
    
    return resp;
  }

  async loadMore(): Promise<void> {
    this.showMoreBtnSpinner = true;
    this.page++;
    await this.getLinks();
    this.showMoreBtnSpinner = false;
  }

  copy(text: string): void {
    navigator.clipboard.writeText(text);
    this.toastrService.show("Le lien a bien été copié", "Copié", { status: 'success' });
  }

  openDeleteModalFor(link: any): void {
    console.log(link)
    this.dialogService.open(ModalDeleteComponent, { context: {
      message: 'Les utilisateurs n\'auront plus la possibilité d\'accéder à la page de redirection.',
      deleteRoute: '/secure/link/' + link.slug
    }}).onClose.subscribe(isDeleted => {
      if (isDeleted) {
        this.getLinks();
        this.showActionsButtons = false;
      }
    });
  }
}
