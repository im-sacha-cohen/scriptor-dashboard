import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbDialogService, NbSortDirection, NbSortRequest, NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
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

  customColumn = 'name';
  defaultColumns = [ 'slug' ];

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
      /*resp.forEach((element: any) => {
        this.categories.push({
          data: { name: element.name, slug: element.slug },
        });
      });*/
      this.categories = [
        {
          data: { name: 'Projects', slug: '1.8 MB', items: 5, kind: 'dir' },
        },
        {
          data: { name: 'Projects', slug: '1.8 MB', items: 5, kind: 'dir' },
        }
      ];
      console.log('cat', this.categories);
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
