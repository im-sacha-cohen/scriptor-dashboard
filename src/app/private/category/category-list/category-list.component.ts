import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  showActionsButtons = false;
  selectedUpdateLink: string;
  linkSelected: any;
  showSpinner = true;
  showMoreBtnSpinner = false;

  links: any[] = [];
  dataEmpty = false;
  hasMore = false;
  page = 1;

  categories: any[] = [];

  customColumn = 'Nom';
  defaultColumns = [ 'Slug', 'Actions' ];

  constructor(
    private queryService: QueryService,
    private dialogService: NbDialogService,
    private title: Title,
    private toastrService: NbToastrService
  ) {
    this.title.setTitle('Scriptor | Catégories');
  }

  async ngOnInit(): Promise<void> {
    this.showSpinner = true;
    this.getCategories();
    this.showSpinner = false;
  }

  getCategories(): void {
    this.queryService.query(
      'GET',
      `/category`
    ).subscribe( resp => {
      resp.forEach((element: any) => {
        this.categories.push({
          data: { Nom: element.name, Slug: element.slug, Actions: {
            update: {
              route: `/category/update/${element.slug}`
            }
          } },
        });
      });
    });
  }

  openDeleteModalFor(link: any): void {
    console.log(link)
    /*this.dialogService.open(ModalDeleteComponent, { context: {
      message: 'Les utilisateurs n\'auront plus la possibilité d\'accéder à la page de redirection.',
      deleteRoute: '/secure/link/' + link.slug
    }}).onClose.subscribe(isDeleted => {
      if (isDeleted) {
        this.getLinks();
        this.showActionsButtons = false;
      }
    });*/
  }
}
