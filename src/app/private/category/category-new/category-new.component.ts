import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss']
})
export class CategoryNewComponent implements OnInit {
  createForm: FormGroup;
  showSpinner = false;

  constructor(
    private formBuilder: FormBuilder,
    private queryService: QueryService,
    private toastrService: NbToastrService,
    private title: Title,
    private router: Router
  ) {
    this.title.setTitle('Scriptor | Nouvelle catégorie');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      subTitle: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    this.showSpinner = true;

    this.queryService.query(
      'POST',
      '/secure/category',
      this.createForm.value
    ).subscribe(
      resp => {
        this.showSpinner = false;
        this.toastrService.show("La catégorie a bien été créée", "Succès", { status: 'success' });
        this.router.navigate(['/category']);
      },
      error => {
        this.showSpinner = false;
        this.toastrService.show(error.error.error, "Une erreur est survenue", { status: 'danger' });
      }
    );
  }
}
