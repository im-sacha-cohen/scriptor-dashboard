import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Validators } from 'ngx-editor';
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
      content: [''],
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
