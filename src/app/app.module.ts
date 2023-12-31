import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbToastrModule, NbCardModule, NbButtonModule, NbInputModule, NbIconModule, NbSidebarModule, NbSpinnerModule, NbMenuModule, NbTooltipModule, NbTreeGridModule, NbDialogModule, NbTabsetModule, NbSelectModule, NbAccordionModule, NbBadgeModule, NbFormFieldModule, NbAlertModule, NbToggleModule, NbCheckboxModule, NbActionsModule, NbContextMenuModule, NbPopoverModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './public/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MainPublicComponent } from './public/main/main.component';
import { MainPrivateComponent } from './private/main-private/main-private.component';
import { IndexComponent } from './private/index/index.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModalDeleteComponent } from './shared/components/modal/modal-delete/modal-delete.component';
import { EmptyComponent } from './shared/components/empty/empty.component';
import { LogoutComponent } from './public/logout/logout.component';
import { ProfileComponent } from './private/profile/profile.component';
import { SignupComponent } from './public/signup/signup.component';
import { UserConfirmComponent } from './public/user-confirm/user-confirm.component';
import { NgxEditorModule } from 'ngx-editor';
import { RequestNewComponent } from './public/forgot-password/request-new/request-new.component';
import { ResetComponent } from './public/forgot-password/reset/reset.component';
import { CategoryListComponent } from './private/category/category-list/category-list.component';
import { TreeGridComponent } from './shared/components/tree-grid/tree-grid.component';
import { CategoryNewComponent } from './private/category/category-new/category-new.component';
import { CategoryUpdateComponent } from './private/category/category-update/category-update.component';
import { ArticleListComponent } from './private/article/article-list/article-list.component';
import { ArticleNewComponent } from './private/article/article-new/article-new.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ArticleUpdateComponent } from './private/article/article-update/article-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPublicComponent,
    MainPrivateComponent,
    IndexComponent,
    ModalDeleteComponent,
    EmptyComponent,
    LogoutComponent,
    ProfileComponent,
    SignupComponent,
    UserConfirmComponent,
    RequestNewComponent,
    ResetComponent,
    CategoryListComponent,
    TreeGridComponent,
    CategoryNewComponent,
    CategoryUpdateComponent,
    ArticleListComponent,
    ArticleNewComponent,
    ArticleUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbSpinnerModule,
    NbMenuModule.forRoot(),
    NbTooltipModule,
    NbTreeGridModule,
    AgGridModule,
    NbDialogModule.forRoot({ autoFocus: false }),
    NbTabsetModule,
    NbSelectModule,
    NbAccordionModule,
    NbBadgeModule,
    NbFormFieldModule,
    NbAlertModule,
    NbToggleModule,
    NbCheckboxModule,
    NbActionsModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbPopoverModule,
    NgxEditorModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
