import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NbToastrService } from '@nebular/theme';
import { Validators } from 'ngx-editor';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.scss']
})
export class ArticleUpdateComponent implements OnInit {
  showCardSpinner = true;
  updateForm: FormGroup;
  showSpinner = false;
  article: any;
  slug: string|null;
  categories: any;

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '200px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['fontName', 'subscript', 'superscript'],
      ['customClasses', 'insertVideo', 'fontSize', 'toggleEditorMode', 'removeFormat']
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private queryService: QueryService,
    private toastrService: NbToastrService,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.title.setTitle('Scriptor | Modification de catégorie');

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('slug')) {
        this.slug = params.get('slug');
        this.getArticle();
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCategories();
  }

  getCategories(): void {
    this.queryService.query(
      'GET',
      '/category'
    ).subscribe(
      resp => {
        this.categories = resp;
      }
    );
  }

  getArticle(): void {
    this.showCardSpinner = true;

    this.queryService.query(
      'GET',
      '/article/' + this.slug
    ).subscribe(
      resp => {
        this.article = resp;
        this.buildForm();
        this.showCardSpinner = false;
      }
    );
  }


  buildForm(): void {
    this.updateForm = this.formBuilder.group({
      title: [this.article?.title, Validators.required],
      summary: [this.article?.summary, Validators.required],
      content: [this.article?.content, Validators.required],
      category: [this.article?.category.slug, Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    this.showSpinner = true;

    this.queryService.query(
      'PUT',
      '/secure/article/' + this.slug,
      this.updateForm.value
    ).subscribe(
      resp => {
        this.article = resp.object;
        this.showSpinner = false;
        this.toastrService.show("L'article a bien été mit à jour", "Succès", { status: 'success' });
        this.buildForm();
        this.router.navigate(['/article']);
      },
      error => {
        this.showSpinner = false;
        this.toastrService.show(error.error.error, "Une erreur est survenue", { status: 'danger' });
      }
    );
  }
}
