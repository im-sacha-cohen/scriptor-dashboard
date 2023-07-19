import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './private/index/index.component';
import { MainPrivateComponent } from './private/main-private/main-private.component';
import { ProfileComponent } from './private/profile/profile.component';
import { LoginComponent } from './public/login/login.component';
import { LogoutComponent } from './public/logout/logout.component';
import { MainPublicComponent } from './public/main/main.component';
import { RequestNewComponent } from './public/forgot-password/request-new/request-new.component';
import { SignupComponent } from './public/signup/signup.component';
import { UserConfirmComponent } from './public/user-confirm/user-confirm.component';
import { AuthenticatedGuard } from './shared/guard/is-authenticated/is-authenticated.guard';
import { ResetComponent } from './public/forgot-password/reset/reset.component';
import { LinkListComponent } from './private/link-list/link-list.component';
import { LinkNewComponent } from './private/link-new/link-new.component';
import { StatisticsListComponent } from './private/statistics-list/statistics-list.component';
import { LinkUpdateComponent } from './private/link-update/link-update.component';
import { CategoryListComponent } from './private/category/category-list/category-list.component';
import { CategoryNewComponent } from './private/category/category-new/category-new.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    component: MainPublicComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'confirm-account/:token',
        component: UserConfirmComponent
      },
      {
        path: 'forgot-password',
        children: [
          {
            path: 'request-new',
            component: RequestNewComponent
          },
          {
            path: 'reset/:token',
            component: ResetComponent
          }
        ]
      },
      /*{
        path: 'set-password/:token',
        component: SetPasswordComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      }*/
    ]
  },
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: MainPrivateComponent,
    children: [
      {
        path: 'home',
        component: IndexComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'category',
        children: [
          {
            path: '',
            component: CategoryListComponent
          },
          {
            path: 'new',
            component: CategoryNewComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
