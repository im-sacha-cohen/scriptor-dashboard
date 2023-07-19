import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { TreeGridService } from 'src/app/shared/services/tree-grid-service/tree-grid-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  showSpinner = true;
  articles: any[] = [];
  isDataEmpty = false;
  customColumn = 'Titre';
  defaultColumns = [ 'Summary', 'Catégorie', 'Créé le', 'Écrit par', 'Actions' ];

  constructor(
    private queryService: QueryService,
    private title: Title,
    private treeGridService: TreeGridService
  ) {
    this.title.setTitle('Scriptor | Articles');
  }

  ngOnInit(): void {
    this.getArticles();
    this.treeGridService.showSpinner.subscribe((showSpinner: boolean) => {
      this.showSpinner = showSpinner;
    });
    this.treeGridService.data.subscribe((value: any[]) => {
      this.articles = value;
    });
  }

  getArticles(): void {
    this.treeGridService.showSpinner.next(true);
    this.treeGridService.data.next([]);
    
    this.queryService.query(
      'GET',
      `/article`
    ).subscribe( resp => {
      const articles: any[] = [];
      this.isDataEmpty = resp.length === 0;

      resp.forEach((element: any) => {
        articles.push({
          data: {
            'Titre': element.title,
            'Summary': element.summary,
            'Catégorie': element.category.name,
            'Créé le': element.slug,
            'Écrit par': element.createdBy.fullName,
            'Actions': {
              update: {
                route: `/article/update/${element.slug}`
              },
              delete: {
                route: `/secure/article/${element.slug}`,
                message: `Voulez-vous vraiment supprimer l'article <em>${element.title}</em> ?`,
              }
            }
          }
        });
        
        this.treeGridService.data.next(articles);
      });

      this.treeGridService.showSpinner.next(false);
    });
  }
}
