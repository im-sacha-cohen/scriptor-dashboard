import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Validators } from 'ngx-editor';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {
  showCardSpinner = true;
  updateForm: FormGroup;
  showSpinner = false;

  slug: string|null;
  category: any;

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
        this.getCategory();
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  getCategory(): void {
    this.showCardSpinner = true;

    this.queryService.query(
      'GET',
      '/category/' + this.slug
    ).subscribe(
      resp => {
        this.category = resp;
        this.buildForm();
        this.showCardSpinner = false;
      }
    );
  }


  buildForm(): void {
    this.updateForm = this.formBuilder.group({
      name: [this.category?.name, Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    this.showSpinner = true;

    this.queryService.query(
      'PUT',
      '/secure/category/' + this.slug,
      this.updateForm.value
    ).subscribe(
      resp => {
        this.category = resp.object;
        this.showSpinner = false;
        this.toastrService.show("La catégorie a bien été mise à jour", "Succès", { status: 'success' });
        this.buildForm();
        this.router.navigate(['/category']);
      },
      error => {
        this.showSpinner = false;
        this.toastrService.show(error.error.error, "Une erreur est survenue", { status: 'danger' });
      }
    );
  }
}
