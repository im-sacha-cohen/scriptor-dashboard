import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NbToastrService } from '@nebular/theme';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-link-new',
  templateUrl: './link-new.component.html',
  styleUrls: ['./link-new.component.scss']
})
export class LinkNewComponent implements OnInit {
  createForm: FormGroup;
  showSpinner = false;
  formData: FormData = new FormData();
  showShearableLink = false;
  shearableLink: string;

  constructor(
    private formBuilder: FormBuilder,
    private queryService: QueryService,
    private toastrService: NbToastrService,
    private title: Title
  ) {
    this.title.setTitle('Scriptor | Nouveau lien');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      redirectTo: ['', Validators.required],
      cover: ['', Validators.required]
    });
  }

  fileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file, )
      this.formData.append('cover', file);
    }
  }

  async onSubmit(): Promise<void> {
    this.showSpinner = true;

    this.formData.append('name', this.createForm.value.name);
    this.formData.append('description', this.createForm.value.description);
    this.formData.append('redirectTo', this.createForm.value.redirectTo);

    this.queryService.query(
      'POST',
      '/secure/link',
      this.formData,
      undefined
    ).subscribe(
      resp => {
        this.showSpinner = false;
        this.toastrService.show("Le lien a bien été créé", "Succès", { status: 'success' });
        this.buildForm();
        this.formData = new FormData();
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
