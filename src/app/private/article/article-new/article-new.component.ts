import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularEditorConfig, UploadResponse } from '@kolkov/angular-editor';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {
  createForm: FormGroup;
  showSpinner = false;
  categories: any[];

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
      ['customClasses', 'insertVideo', 'fontSize', 'removeFormat']
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private queryService: QueryService,
    private toastrService: NbToastrService,
    private title: Title,
    private router: Router
  ) {
    this.title.setTitle('Scriptor | Nouvel article');
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCategories();
  }

  buildForm(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    this.showSpinner = true;

    this.queryService.query(
      'POST',
      '/secure/article',
      this.createForm.value
    ).subscribe(
      resp => {
        this.showSpinner = false;
        this.toastrService.show("L'article' a bien été créé", "Succès", { status: 'success' });
        this.router.navigate(['/article']);
      },
      error => {
        this.showSpinner = false;
        this.toastrService.show(error.error.error, "Une erreur est survenue", { status: 'danger' });
      }
    );
  }

  getCategories(): void {
    this.queryService.query(
      'GET',
      `/category`
    ).subscribe( resp => this.categories = resp);
  }
}
