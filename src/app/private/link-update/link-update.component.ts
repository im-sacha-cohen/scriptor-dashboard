import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-link-update',
  templateUrl: './link-update.component.html',
  styleUrls: ['./link-update.component.scss']
})
export class LinkUpdateComponent implements OnInit {
  showGetLinkSpinner = true;
  updateForm: FormGroup;
  showSpinner = false;
  showShearableLink = false;
  shearableLink: string;

  slug: string|null;
  link: any;

  constructor(
    private formBuilder: FormBuilder,
    private queryService: QueryService,
    private toastrService: NbToastrService,
    private title: Title,
    private activatedRoute: ActivatedRoute
  ) {
    this.title.setTitle('Scriptor | Modification de lien');

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('slug')) {
        this.slug = params.get('slug');
        this.getLink();
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  getLink(): void {
    this.queryService.query(
      'GET',
      '/secure/link/' + this.slug
    ).subscribe(
      resp => {
        this.link = resp.object[0];
        this.buildForm();
        this.showGetLinkSpinner = false;
      }
    );
  }


  buildForm(): void {
    this.updateForm = this.formBuilder.group({
      name: [this.link?.name, Validators.required],
      description: [this.link?.description, Validators.required],
      redirectTo: [this.link?.redirectTo, Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    this.showSpinner = true;

    this.queryService.query(
      'PUT',
      '/secure/link/' + this.slug,
      this.updateForm.value
    ).subscribe(
      resp => {
        this.link = resp.object;
        this.showSpinner = false;
        this.toastrService.show("Le lien a bien été mis à jour", "Succès", { status: 'success' });
        this.buildForm();
        this.showShearableLink = true;
        this.shearableLink = resp.object.shearableLink;
      },
      error => {
        this.showSpinner = false;
        this.toastrService.show(error.error.error, "Une erreur est survenue", { status: 'danger' });
      }
    );
  }

  copy(text: string): void {
    navigator.clipboard.writeText(text);
    this.toastrService.show("Le lien a bien été copié", "Copié", { status: 'success' });
  }
}
