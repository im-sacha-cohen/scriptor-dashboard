import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { TreeGridService } from 'src/app/shared/services/tree-grid-service/tree-grid-service.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  showSpinner = true;
  categories: any[] = [];
  isDataEmpty = false;
  customColumn = 'Nom';
  defaultColumns = [ 'Slug', 'Actions' ];

  constructor(
    private queryService: QueryService,
    private title: Title,
    private treeGridService: TreeGridService
  ) {
    this.title.setTitle('Scriptor | Catégories');
  }

  ngOnInit(): void {
    this.getCategories();
    this.treeGridService.showSpinner.subscribe((showSpinner: boolean) => {
      this.showSpinner = showSpinner;
    });
    this.treeGridService.data.subscribe((value: any[]) => {
      this.categories = value;
    });
  }

  getCategories(): void {
    this.treeGridService.showSpinner.next(true);
    this.treeGridService.data.next([]);
    
    this.queryService.query(
      'GET',
      `/category`
    ).subscribe( resp => {
      const categories: any[] = [];
      this.isDataEmpty = resp.length === 0;

      resp.forEach((element: any) => {
        categories.push({
          data: { Nom: element.name, Slug: element.slug, Actions: {
              update: {
                route: `/category/update/${element.slug}`
              },
              delete: {
                route: `/secure/category/${element.slug}`,
                message: `Voulez-vous vraiment supprimer la catégorie <em>${element.name}</em> ?<br/>Tous les articles associés seront <strong>sans catégorie.</strong>`,
              }
            }
          }
        });
        
        this.treeGridService.data.next(categories);
      });

      this.treeGridService.showSpinner.next(false);
    });
  }
}
